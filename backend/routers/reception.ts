import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
import {
  ReceptionGetRoomsResponse,
  ReceptionPostCustomersRequest,
  ReceptionPostCustomersResponse,
} from 'types'
import {
  TypedRequestBody,
  validateRequestBody,
  validateRequestQuery,
} from 'zod-express-middleware'
import { z } from 'zod'

const receptionRouter = Router()

receptionRouter.get(
  '/rooms',
  async (req: { query: { queryDate: string } }, res) => {
    const { queryDate } = req.query
    const date = z.coerce.date().optional().parse(queryDate) || {
      toSqlString: () => `CURDATE()`,
    }

    const [rows, _results] = await databasePool.query(
      'SELECT r.room_id, r.room_num, r.room_type_id, rt.daily_cost, rt.name, rt.description, res.reserve_id, che.check_in_out_id FROM rooms r' +
        ' join room_types rt' +
        ' using(room_type_id)' +
        ` left join (select reserve_id, room_id from reserves where date(start_date) = ? ) AS res USING (room_id) left join (select check_in_out_id, room_id from check_in_outs cio where date(start_at) = ?) AS che` +
        ' USING (room_id);',
      [date, date]
    )
    const responseObject = ReceptionGetRoomsResponse.parse({
      allRooms: rows,
    })
    res.json(responseObject)
  }
)

receptionRouter.post(
  '/customers',
  validateRequestBody(ReceptionPostCustomersRequest),
  async (req: TypedRequestBody<typeof ReceptionPostCustomersRequest>, res) => {
    const { first_name, last_name, tel_num, account } = req.body

    const connection = await databasePool.getConnection()
    try {
      await connection.beginTransaction()

      let accountId: number | undefined

      if (account) {
        const { username, password, email } = account

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
        accountId = accResults.insertId
      }

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
        ReceptionPostCustomersResponse.parse({
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

export default receptionRouter
