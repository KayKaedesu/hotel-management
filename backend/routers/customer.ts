import { Router } from 'express'
import {
  CustomerGetRoomsResponse,
  PostReservesRequest,
  CustomerGetRequest,
  CustomerGetSelfReservesResponse,
  CustomerPostCustomersRequest,
  CustomerPostCustomersResponse,
} from 'types'
import databasePool from '../adapters/db_adapter.js'
import {
  TypedRequestQuery,
  processRequestBody,
  validateRequestBody,
  validateRequestQuery,
} from 'zod-express-middleware'
import { TypedRequestBody } from 'zod-express-middleware'
import { dateFormat } from '../utils/format.js'

const customerRouter = Router()

customerRouter.post(
  '/customers',
  validateRequestBody(CustomerPostCustomersRequest),
  async (req: TypedRequestBody<typeof CustomerPostCustomersRequest>, res) => {
    const { first_name, last_name, tel_num, email, password, username } =
      req.body

    const connection = await databasePool.getConnection()
    try {
      await connection.beginTransaction()

      const [accResults] = await connection.query(
        `
            INSERT INTO accounts(username, password, email, account_type)
            VALUES (?, ?, ?, ?)
          `
          .replaceAll(/\s+/g, ' ')
          .trim(),
        [username, password, email, 'Customer']
      )

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const accountId = accResults.insertId

      const [cusResults] = await connection.query(
        `
        INSERT INTO customers(first_name, last_name, tel_num, account_id)
        VALUES(?, ?, ?, ?)
        `
          .replaceAll(/\s+/g, ' ')
          .trim(),
        [first_name, last_name, tel_num, accountId]
      )

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const customerId: number = cusResults.insertId

      res.status(201).json(
        CustomerPostCustomersResponse.parse({
          first_name,
          last_name,
          tel_num,
          account_id: accountId,
          customer_id: customerId,
        })
      )

      await connection.commit()
    } catch (e) {
      await connection.rollback()
      res.status(400).send(e)
    }
  }
)

customerRouter.get('/room_types', async (_req, res) => {
  const [rows] = await databasePool.query(
    ['SELECT', '*', 'FROM room_types', 'ORDER BY room_type_id asc;'].join(' ')
  )
  const responseObject = CustomerGetRoomsResponse.parse({
    roomsTypes: rows,
  })
  res.json(responseObject)
})

// empty rooms
customerRouter.get('/rooms', async (_req, res) => {
  const [rows] = await databasePool.query(
    `
      SELECT
        r.room_id,
        room_num,
        rt.name as room_type_name,
        daily_cost
      FROM rooms r
      JOIN room_types rt USING (room_type_id)
      WHERE
        room_id NOT IN (
          SELECT room_id
          FROM check_in_outs
          WHERE start_at <= NOW() AND end_at >= NOW()
        )
        AND room_id NOT IN (
          SELECT room_id
          FROM reserves
          WHERE DATE(NOW()) BETWEEN start_date AND end_date
        )
      ORDER BY r.room_id;
    `
      .replaceAll(/\s+/g, ' ')
      .trim(),
    []
  )
  const responseObject = CustomerGetRoomsResponse.parse({
    rooms: rows,
  })
  res.json(responseObject)
})

customerRouter.get(
  '/own-reserves',
  validateRequestQuery(CustomerGetRequest),
  async (req: TypedRequestQuery<typeof CustomerGetRequest>, res) => {
    const { customerId } = req.query

    const [rows] = await databasePool.query(
      `
        SELECT
          reserve_id as reserveId,
          room_id as roomId,
          room_num as roomNum,
          name as roomType,
          amount as paidAmount,
          start_date as startDate,
          end_date as endDate, 
          CASE
            WHEN end_date < DATE(NOW()) THEN 'complete'
            WHEN start_date > DATE(NOW()) THEN 'upcoming'
            ELSE 'active'
          END    AS status
        FROM reserves
          JOIN rooms USING (room_id)
          JOIN room_types USING (room_type_id)
          JOIN income USING (income_id)
        WHERE customer_id = ?
        ORDER BY reserve_id asc;
      `
        .replaceAll(/\s+/g, ' ')
        .trim(),
      [customerId]
    )

    res.json(
      CustomerGetSelfReservesResponse.parse({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        myReserves: rows.map((row) => ({ ...row, floor: row.roomNum[0] })),
      })
    )
  }
)

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
              dateFormat(new Date(reserve_range.start_date)),
              dateFormat(new Date(reserve_range.end_date)),
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
