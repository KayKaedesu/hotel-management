import { z } from 'zod'

const scheduleDate = z.enum([
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
])

const hourInADay = z.number().int().gte(0).lt(24)

const startHour = hourInADay
const workHours = hourInADay

export { id as workScheduleId } from './base.js'
export { employeeId } from './employees.js'
export { scheduleDate, startHour, workHours }
