import { Router } from 'express'
import {
  GetRoomTypesResponse,
  GetRoomsResponse,
  PostReservesRequest,
} from 'types'
import databasePool from '../adapters/db_adapter.js'
import { validateRequestBody } from 'zod-express-middleware'
import { TypedRequestBody } from 'zod-express-middleware'
import { RowDataPacket } from 'mysql2'
const customerRouter = Router()

customerRouter.get('/room_types', (_req, res) => {
  databasePool.query(
    ['SELECT', '*', 'FROM room_types', 'ORDER BY room_num asc;'].join(' '),
    function (error, results) {
      if (error) {
        res.status(500).send(error)
      }
      const responseObject = GetRoomsResponse.parse({
        roomsTypes: GetRoomTypesResponse,
      })
      res.json(responseObject)
    }
  )
})

customerRouter.get('/rooms', (_req, res) => {
  databasePool.query(
    [
      'SELECT',
      'room_id,',
      'room_num,',
      't.name AS room_type_name,',
      'daily_cost',
      'FROM rooms',
      'JOIN room_types AS t USING (room_type_id)',
      'LEFT JOIN reserves AS r USING (room_id)',
      'LEFT JOIN check_in_outs AS c USING (room_id)',
      'WHERE r.start_date <= NOW() AND r.end_date >= NOW() AND c.check_out_date IS NULL',
      'ORDER BY room_num asc;',
    ].join(' '),
    function (error, results) {
      if (error) {
        res.status(500).send(error)
      }
      const responseObject = GetRoomsResponse.parse({
        rooms: results,
      })
      res.json(responseObject)
    }
  )
})

customerRouter.post(
  '/reserves',
  validateRequestBody(PostReservesRequest),
  function (req: TypedRequestBody<typeof PostReservesRequest>, res) {
    const { end_date, room_nums, start_date, user_id, payment_amount } =
      req.body
    const paymentSource = 'Bank'
    databasePool.getConnection(function (error, connection) {
      if (error) {
        throw error
      }
      connection.beginTransaction(function (error) {
        connection.query(
          ['INSERT INTO income (amount, source) VALUES (?, ?);'].join(' '),
          [payment_amount, paymentSource],
          function (error, results: RowDataPacket[]) {
            results.insertId
          }
        )
        connection.commit()
        databasePool.query(
          [
            'INSERT INTO reserves (customer_id, start_date, end_date, income_id, room_id) VALUES (?, ?, ?);',
          ].join(' '),
          [],
          function (error, results) {
            if (error) {
              throw error
            }
            const responseObject = GetRoomsResponse.parse({
              rooms: results,
            })
            res.json(responseObject)
          }
        )
      })
    })
  }
)

export default customerRouter
