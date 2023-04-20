import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
import {
  EmployeeGetSelfRequest,
  EmployeeGetSelfScheduleResponse,
  EmployeeGetSelfLogResponse
} from 'types'
import {
  TypedRequestBody,
  validateRequestBody,
} from 'zod-express-middleware'

const employeeRouter = Router()

employeeRouter.get(
  '/schedules',
  validateRequestBody(EmployeeGetSelfRequest),
  async (req: TypedRequestBody<typeof EmployeeGetSelfRequest>, res) => {
    const [rows, results] = await databasePool.query(
      [
        'SELECT',
        'schedule_date,',
        'start_hour,',
        'work_hours',
        'FROM work_schedules',
        'WHERE employee_id = ?',
        'ORDER BY schedule_date, start_hour;',
      ].join(' '),
      [req.body.employee_id]
    )
    const responseObject = EmployeeGetSelfScheduleResponse.parse({
      schedules: rows,
    })
    res.json(responseObject)
  }
)

employeeRouter.get(
  '/logs', 
validateRequestBody(EmployeeGetSelfRequest),
async (req:TypedRequestBody<typeof EmployeeGetSelfRequest>, res) => {
  const [rows, results] = await databasePool.query(
    [
      'SELECT',
      'start_at,',
      'end_at',
      'FROM work_logs',
      'WHERE employee_id = ?',
      'ORDER BY start_at asc;',
    ].join(' '),
    [req.body.employee_id]
    )
    const responseObject = EmployeeGetSelfLogResponse.parse({
      logs: rows,
    })
    res.json(responseObject)
  })

export default employeeRouter
