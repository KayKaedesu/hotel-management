import { z } from 'zod'
import * as customer from '../models/customers.js'
import * as room from '../models/rooms.js'
import * as roomType from '../models/room_types.js'
import * as reserve from '../models/reserves.js'
import * as checkInOut from '../models/check_in_outs.js'
import { income } from '../models/index.js'

export const CustomerGetRoomsResponse = z.object({
  rooms: z.array(
    z.object({
      room_id: room.roomId,
      room_num: room.roomNum,
      room_type_name: roomType.name,
      daily_cost: roomType.dailyCost,
    })
  ),
})

export const GetRoomTypesResponse = z.object({
  room_type_id: roomType.roomTypeId,
  daily_cost: roomType.dailyCost,
  name: roomType.name,
  description: roomType.description,
})

export const PostReservesRequest = z.object({
  user_id: reserve.customerId,
  room_ids: room.roomId.array(),
  start_date: reserve.startDate,
  end_date: reserve.endDate,
  payment_amount: income.amount,
})

export const ReceptionGetRoomsResponse = z.object({
  allRooms: z.array(
    z.object({
      room_id: room.roomId,
      room_num:room.roomNum,
      room_type_id:room.roomTypeId,
      daily_cost:roomType.dailyCost,
      name:roomType.name,
      description:roomType.description,
      reserve_id:reserve.reserveId.optional(),
      check_in_out_id:checkInOut.checkInOutId.optional()
    })
  ),
})