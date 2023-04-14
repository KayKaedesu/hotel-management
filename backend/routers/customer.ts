import { Router } from 'express'
import { GetRoomTypesResponse, GetRoomsResponse, PostReservesRequest } from 'types'
import databasePool from '../adapters/db_adapter.js'
import { validateRequestBody } from 'zod-express-middleware'
const customerRouter = Router()

customerRouter.get('/rooms', (_req, res) => {
  databasePool.query(
    [
      'SELECT',
      '*',
      'FROM room_types',
      'ORDER BY room_num asc;',
    ].join(' '),
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
      'room_type,',
      'daily_cost',
      'FROM rooms',
      'JOIN room_types USING (room_type_id)',
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
  (req, res) => {
    // const connection = databasePool.getConnection()
    // databasePool.query(
    //   [
    //     // 'INSERT '
    //   ].join(' '),
    //   function (error, results) {
    //     if (error) {
    //       throw error
    //     }
    //     const responseObject = GetRoomsResponse.parse({
    //       rooms: results,
    //     })
    //     res.json(responseObject)
    //   }
    // )
  }
)

export default customerRouter
