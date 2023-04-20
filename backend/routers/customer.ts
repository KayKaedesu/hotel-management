import { Router } from 'express'
import {
  GetRoomTypesResponse,
  CustomerGetRoomsResponse,
  PostReservesRequest,
} from 'types'
import databasePool from '../adapters/db_adapter.js'
import { processRequestBody, validateRequestBody } from 'zod-express-middleware'
import { TypedRequestBody } from 'zod-express-middleware'
import { RowDataPacket } from 'mysql2/promise'
import { dateFormat } from '../utils/format.js'
import { start } from 'repl'

const customerRouter = Router()

customerRouter.get('/room_types', async (_req, res) => {
  const [rows, results] = await databasePool.query(
    ['SELECT', '*', 'FROM room_types', 'ORDER BY room_num asc;'].join(' ')
  )
  const responseObject = CustomerGetRoomsResponse.parse({
    roomsTypes: rows,
  })
  res.json(responseObject)
})

customerRouter.get('/rooms', async (_req, res) => {
  const [rows, results] = await databasePool.query(
    [
      'SELECT',
      'room_id,',
      'room_num,',
      't.name AS room_type_name,',
      'daily_cost',
      'FROM rooms',
      'JOIN room_types AS t USING (room_type_id)',
      'ORDER BY room_num asc;',
    ].join(' ')
  )
  const responseObject = CustomerGetRoomsResponse.parse({
    rooms: rows,
  })
  res.json(responseObject)
})

customerRouter.post(
  '/reserves',
  // ใช้ validate ถ้าไม่ได้ใช้ z.transform
  processRequestBody(PostReservesRequest.transform((val) => val)),
  async function (req: TypedRequestBody<typeof PostReservesRequest>, res) {
    const { reserve_range, room_ids, user_id, payment_amount } = req.body
    const paymentSource = 'Bank'

    const connection = await databasePool.getConnection()
    await connection.beginTransaction()

    const [results] = await connection.query(
      ['INSERT INTO income (amount, source) VALUES (?, ?);'].join(' '),
      [payment_amount, paymentSource]
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const incomeId = results.insertId

    try {
      await Promise.all(
        room_ids.map(async (room_id) => {
          connection.query(
            [
              'INSERT INTO reserves (customer_id, start_date, end_date, income_id, room_id)',
              'VALUES (?, ?, ?, ?, ?);',
            ].join(' '),
            [
              user_id,
              dateFormat(reserve_range.end_date),
              dateFormat(reserve_range.end_date),
              incomeId,
              room_id,
            ]
          )
        })
      )

      connection.commit()
      res.status(201).json({ message: 'success' })
    } catch (e) {
      if (e instanceof Error) {
        res.status(404).json(e)
        console.error(e.message)
      }
    }
  }
)

export default customerRouter
