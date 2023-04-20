import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
import { GetSchedulesRequest, GetSchedulesResponse } from 'types'
import { TypedRequestBody, validateRequest, validateRequestBody } from 'zod-express-middleware'
import { employeeId } from 'types/models/employees.js'
import { TypeOf } from 'zod'

const employeeRouter = Router()

employeeRouter.get('/schedules',
  validateRequestBody(
    GetSchedulesRequest
  ),
  async (req:TypedRequestBody<typeof GetSchedulesRequest>, res) => {
  const [rows, results] = await databasePool.query(
    [
      'SELECT',
      'schedule_date,',
      'first_name,',
      'last_name,',
      'start_hour,',
      'work_hours',
      'FROM work_schedules',
      'JOIN employees USING (employee_id)',
      'ORDER BY schedule_date, start_hour;',
    ].join(' ')
  )
  const responseObject = GetSchedulesResponse.parse({
    schedules: rows,
  })
  res.json(responseObject)
})

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
