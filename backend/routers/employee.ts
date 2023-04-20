import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
import {
  EmployeeGetSelfScheduleRequest,
  EmployeeGetSelfScheduleResponse,
} from 'types'
import {
  TypedRequestBody,
  validateRequest,
  validateRequestBody,
} from 'zod-express-middleware'
import { employeeId } from 'types/models/employees.js'
import { TypeOf } from 'zod'

const employeeRouter = Router()

employeeRouter.get(
  '/schedules',
  validateRequestBody(EmployeeGetSelfScheduleRequest),
  async (req: TypedRequestBody<typeof EmployeeGetSelfScheduleRequest>, res) => {
    res.status(200).json({message: 'yay'})
    // const [rows, results] = await databasePool.query(
    //   [
    //     'SELECT',
    //     'schedule_date,',
    //     'first_name,',
    //     'last_name,',
    //     'start_hour,',
    //     'work_hours',
    //     'FROM work_schedules',
    //     'JOIN employees USING (employee_id)',
    //     'ORDER BY schedule_date, start_hour;',
    //   ].join(' ')
    // )
    // const responseObject = EmployeeGetSelfScheduleResponse.parse({
    //   schedules: rows,
    // })
    // res.json(responseObject)
  }
)

// employeeRouter.get('/logs', async (_req, res) => {
//   const [rows, results] = await databasePool.query(
//     [
//       'SELECT',
//       'first_name,',
//       'last_name,',
//       'start_at,',
//       'end_at',
//       'FROM work_logs',
//       'JOIN employees USING (employee_id)',
//       'ORDER BY start_at asc;',
//     ].join(' ')
//     )
//     const responseObject = GetSchedulesResponse.parse({
//       schedules: rows,
//     })
//     res.json(responseObject)
//   })

export default employeeRouter
