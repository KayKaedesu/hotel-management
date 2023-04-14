import { z } from 'zod'
import * as customer from '../models/customers.js'
import * as room from '../models/rooms.js'
import * as roomType from '../models/room_types.js'
import * as reserve from '../models/reserves.js'

export const GetRoomsResponse = z.object({
  rooms: z.array(
    z.object({
      room_id: room.roomId,
      room_num: room.roomNum,
      room_type: roomType.roomType,
      daily_cost: roomType.dailyCost,
    })
  ),
})

const _RoomReserveReqParams = z.object({
  id: reserve.roomId,
  customerId: reserve.customerId,
  startDate: reserve.startDate,
  endDate: reserve.endDate,
})

export const PostReservesRequest = z.object({
  user_id: reserve.customerId,
  room_num: room.roomNum,
})

export const CustomerRoomReserveReqParams = _RoomReserveReqParams.extend({})
