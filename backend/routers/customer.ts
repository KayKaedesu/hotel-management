import { Router } from 'express'
import { GetRoomsResponse } from 'types'
import databasePool from '../adapters/db_adapter.js'
const customerRouter = Router()

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
      const responseObject = GetRoomsResponse.parse({
        rooms: results,
      })
      res.json(responseObject)
    }
  )
})

export default customerRouter
