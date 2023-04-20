import { Router } from 'express'
import {
  GetRoomTypesResponse,
  CustomerGetRoomsResponse,
  PostReservesRequest,
} from 'types'
import databasePool from '../adapters/db_adapter.js'
import { validateRequestBody } from 'zod-express-middleware'
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
  validateRequestBody(PostReservesRequest),
  async function (req: TypedRequestBody<typeof PostReservesRequest>, res) {
    const { end_date, room_ids, start_date, user_id, payment_amount } =
      req.body
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

    await Promise.all(
      room_ids.map(async (room_id) => {
        connection.query(
          [
            'INSERT INTO reserves (customer_id, start_date, end_date, income_id, room_id)',
            'VALUES (?, ?, ?, ?, ?);',
          ].join(' '),
          [
            user_id,
            dateFormat(start_date),
            dateFormat(end_date),
            incomeId,
            room_id,
          ]
        )
      })
    )

    connection.commit()
  }
)

export default customerRouter
