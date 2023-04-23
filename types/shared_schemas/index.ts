import { z } from 'zod'
import * as room from '../models/rooms.js'
import * as roomType from '../models/room_types.js'
import * as reserve from '../models/reserves.js'
import {
  worklogs,
  income,
  workSchedules,
  rooms,
  roomTypes,
  employees,
  jobs,
  accounts,
} from '../models/index.js'
import * as customer from '../models/customers.js'
import * as employee from '../models/employees.js'
import * as checkInOut from '../models/check_in_outs.js'
import { accountType, password, email } from '../models/accounts.js'
import { money } from '../models/base.js'
import { jobId } from '../models/jobs.js'
import { username } from '../models/accounts.js'

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
      room_num: room.roomNum,
      room_type_id: room.roomTypeId,
      daily_cost: roomType.dailyCost,
      name: roomType.name,
      description: roomType.description,
      reserve_id: reserve.reserveId.optional(),
      check_in_out_id: checkInOut.checkInOutId.optional(),
    })
  ),
})

export const ReceptionPostCustomersRequest = z.object({
  first_name: customer.firstName,
  last_name: customer.lastName,
  tel_num: customer.telNum,
  account: z
    .object({
      username,
      password,
      email,
    })
    .optional(),
})

export const ReceptionPostCustomersResponse = z.object({
  first_name: customer.firstName,
  last_name: customer.lastName,
  tel_num: customer.telNum,
  customer_id: customer.customerId,
  account_id: customer.accountId.optional(),
})

export const CustomerPostCustomersRequest = z.object({
  first_name: customer.firstName,
  last_name: customer.lastName,
  tel_num: customer.telNum,
  username,
  password,
  email,
})

export const CustomerPostCustomersResponse = z.object({
  first_name: customer.firstName,
  last_name: customer.lastName,
  tel_num: customer.telNum,
  customer_id: customer.customerId,
  account_id: customer.accountId
})

export const ReceptionistGetCustomersRequest = z.object({
  customer_id: customer.customerId,
})

export const EmployeeGetSelfRequest = z.object({
  employee_id: employee.employeeId,
})

export const EmployeeGetSelfScheduleResponse = z.object({
  schedules: z.array(
    z.object({
      schedule_date: workSchedules.scheduleDate,
      start_hour: workSchedules.startHour,
      work_hours: workSchedules.workHours,
    })
  ),
})

export const EmployeeGetSelfLogResponse = z.object({
  logs: z.array(
    z.object({
      start_at: worklogs.startAt,
      end_at: worklogs.endAt,
    })
  ),
})

export const OwnerGetScheduleResponse = z.object({
  schedules: z.array(
    z.object({
      schedule_date: workSchedules.scheduleDate,
      first_name: employee.firstName,
      last_name: employee.lastName,
      start_hour: workSchedules.startHour,
      work_hours: workSchedules.workHours,
    })
  ),
})

export const OwnerGetLogResponse = z.object({
  logs: z.array(
    z.object({
      first_name: employee.firstName,
      last_name: employee.lastName,
      start_at: worklogs.startAt,
      end_at: worklogs.endAt,
    })
  ),
})

export const OwnerGetIncomeResponse = z.object({
  income: z.array(
    z.object({
      room_id: rooms.roomId,
      name: roomTypes.name,
      amount: income.amount,
      received_at: income.receivedAt,
      source: income.source,
      reserve_id: reserve.reserveId,
      check_in_out_id: checkInOut.checkInOutId,
    })
  ),
})

export const OwnerGetEmployeeRequest = z.object({
  jobs: jobs.name.array(),
})

export const OwnerGetEmployeeResponse = z.object({
  employees: z.array(
    z.object({
      full_name: z.string(),
      tel_num: employees.telNum,
      username: accounts.username,
      job_name: jobs.name,
      hourly_wage: jobs.hourlyWage,
    })
  ),
})

export const OwnerGetCustomerResponse = z.object({
  customers: z.array(
    z.object({
      customer_id: customer.customerId,
      full_name: customer.firstName,
    })
  ),
})

export const OwnerGetIncomeSumResponse = z.object({
  incomeArray: z.array(
    z.object({
      customer_id: customer.customerId,
      full_name: z.string(),
      tel_num: customer.telNum,
      reserve_count: z.number().int(),
      check_in_out_count: z.number().int(),
      income_sum: z.number().nonnegative(),
    })
  ),
})

export const CustomerGetRequest = z.object({
  customerId: customer.customerId,
})

export const CustomerGetSelfReservesResponse = z.object({
  myReserves: z.array(
    z.object({
      reserveId: reserve.reserveId,
      roomId: room.roomId,
      roomNum: room.roomNum,
      floor: z.coerce.number().int().positive(),
      roomType: roomType.name,
      paidAmount: money,
      startDate: reserve.startDate,
      endDate: reserve.endDate,
      status: z.enum(['upcoming', 'active', 'complete']),
    })
  ),
})

export const OwnerGetJobsResponse = z.object({
  jobs: z.array(
    z.object({
      job_id: jobs.jobId,
      job_name: jobs.name,
      hourly_wage: jobs.hourlyWage,
    })
  ),
})
