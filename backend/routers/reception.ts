import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
import { ReceptionGetRoomsResponse } from 'types'

const receptionRounter = Router()

receptionRounter.get('/rooms', async (req, res) =>{
    const [rows, _results] = await databasePool.query(
        'SELECT r.room_id, r.room_num, r.room_type_id, rt.daily_cost, rt.name, rt.description, res.reserve_id, che.check_in_out_id FROM rooms r' +
        ' join room_types rt' +
        ' using(room_type_id)' +
        ' left join (select reserve_id, room_id from reserves where date(start_date) = "2023-01-07") AS res' +
        ' USING (room_id)' +
        ' left join (select check_in_out_id, room_id from check_in_outs cio where date(start_at) = "2023-01-07") AS che' +
        ' USING (room_id);'
      )
      const responseObject = ReceptionGetRoomsResponse.parse({
        allRooms: rows,
      })
      res.json(responseObject)
})
export default receptionRounter