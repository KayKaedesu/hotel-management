import { array, z } from 'zod'
import * as customer from '../models/customers.js'
import * as room from '../models/rooms.js'
import * as roomType from '../models/room_types.js'
import * as reserve from '../models/reserves.js'
import { income, workSchedules } from '../models/index.js'
import * as employee from '../models/employees.js'
import * as checkInOut from '../models/check_in_outs.js'

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
  room_ids: room.roomId
    .array()
    .nonempty({ message: 'กรุณาเลือกห้องอย่างน้อย 1 ห้อง' }),
  reserve_range: z
    .array(reserve.startDate)
    .length(2)
    .transform(([start, end]) => ({ start_date: start, end_date: end }))
    .refine((val) => val.start_date < val.end_date, {
      message: 'วันที่เริ่มการจองต้องน้อยกว่าวันที่สิ้นสุด',
      path: ['start_date'],
    })
    .refine(
      (val) => {
        const next7Days = new Date()
        next7Days.setDate(next7Days.getDate() + 7)
        return val.start_date < next7Days
      },
      {
        message: 'วันเริ่มการจองต้องไม่เกิน 7 วัน',
        path: ['start_date'],
      }
    )
    .refine(
      (val) => {
        const next14Days = new Date()
        next14Days.setDate(next14Days.getDate() + 14)
        return val.end_date < next14Days
      },
      {
        message: 'วันสิ้นสุดการจองต้องน้อยกว่า 14 วัน',
        path: ['end_date'],
      }
    )
    .refine(
      (val) => {
        const start = new Date(val.start_date)
        const end = new Date(val.end_date)
        const diffDate = start.getDate() - end.getDate()
        return diffDate <= 7
      },
      {
        message: 'จองได้ไม่เกิน 7 วัน',
        path: ['end_date'],
      }
    ),
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
