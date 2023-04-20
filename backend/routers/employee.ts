import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
import {
  EmployeeGetSelfRequest,
  EmployeeGetSelfScheduleResponse,
  EmployeeGetSelfLogResponse,
} from 'types'
import { TypedRequestQuery, validateRequestQuery } from 'zod-express-middleware'

const employeeRouter = Router()

employeeRouter.get(
  '/schedules',
  validateRequestQuery(EmployeeGetSelfRequest),
  async (req: TypedRequestQuery<typeof EmployeeGetSelfRequest>, res) => {
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
      [req.query.employee_id]
    )
    const responseObject = EmployeeGetSelfScheduleResponse.parse({
      schedules: rows,
    })
    res.json(responseObject)
  }
)

employeeRouter.get(
  '/logs',
  validateRequestQuery(EmployeeGetSelfRequest),
  async (req: TypedRequestQuery<typeof EmployeeGetSelfRequest>, res) => {
    const [rows, results] = await databasePool.query(
      [
        'SELECT',
        'start_at,',
        'end_at',
        'FROM work_logs',
        'WHERE employee_id = ?',
        'ORDER BY start_at asc;',
      ].join(' '),
      [req.query.employee_id]
    )
    const responseObject = EmployeeGetSelfLogResponse.parse({
      logs: rows,
    })
    res.json(responseObject)
  }
)

export default employeeRouter
