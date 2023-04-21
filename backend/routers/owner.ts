import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
import {
  OwnerGetLogResponse,
  OwnerGetScheduleResponse,
  OwnerGetEmployeeResponse,
  OwnerGetIncomeSumResponse,
  OwnerGetEmployeeRequest,
} from 'types'
import { ZodError, z } from 'zod'
import { TypedRequestQuery, validateRequestQuery } from 'zod-express-middleware'

const ownerRouter = Router()

ownerRouter.get('/schedules', async (_req, res) => {
  const [rows] = await databasePool.query(
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
  const responseObject = OwnerGetScheduleResponse.parse({
    schedules: rows,
  })
  res.json(responseObject)
})

ownerRouter.get('/logs', async (_req, res) => {
  const [rows] = await databasePool.query(
    [
      'SELECT',
      'first_name,',
      'last_name,',
      'start_at,',
      'end_at',
      'FROM work_logs',
      'JOIN employees USING (employee_id)',
      'ORDER BY start_at asc;',
    ].join(' ')
  )
  const responseObject = OwnerGetLogResponse.parse({
    logs: rows,
  })
  res.json(responseObject)
})

ownerRouter.get('/income', async (_req, res) => {
  const [rows] = await databasePool.query(
    [
      'SELECT',
      'r.room_id,',
      'name,',
      'amount,',
      'received_at,',
      'source,',
      'e.reserve_id,',
      'c.check_in_out_id',
      'FROM income',
      'LEFT JOIN reserves AS e USING (income_id)',
      'LEFT JOIN check_in_outs AS c USING (income_id)',
      'LEFT JOIN rooms AS r ON (e.room_id = r.room_id OR c.room_id = r.room_id)',
      'LEFT JOIN room_types AS t ON (r.room_type_id)',
      'ORDER BY room_id, received_at asc;',
    ].join(' ')
  )
  const responseObject = OwnerGetIncomeSumResponse.parse({
    income: rows,
  })
  res.json(responseObject)
})

ownerRouter.get('/employees',
validateRequestQuery(OwnerGetEmployeeRequest),  
async (req: TypedRequestQuery<typeof OwnerGetEmployeeRequest>, res) => {
  const where = ``
  const [rows] = await databasePool.query(
    `
      SELECT
        first_name,
        last_name,
        tel_num,
        username,
        j.name,
        hourly_wage
      FROM employees
      JOIN jobs AS j USING (job_id)
      JOIN accounts USING (account_id)
      ${}
      ORDER BY employee_id;
`.replaceAll('\n', ' ').trim()
  )
  const responseObject = OwnerGetEmployeeResponse.parse({
    employees: rows,
  })
  res.json(responseObject)
})

export default ownerRouter

ownerRouter.get('/income-sum', async (req, res) => {
  const [rows] = await databasePool.query(
    `
    SELECT customer_id,
        CONCAT(first_name, ' ', last_name) as full_name,
        tel_num,
        COUNT(r.reserve_id)                as reserve_count,
        COUNT(c.check_in_out_id)           as check_in_out_count,
        IFNULL(SUM(i.amount), 0)                      as income_sum
    FROM customers
        LEFT JOIN check_in_outs as c USING (customer_id)
        LEFT JOIN reserves AS r USING (customer_id)
        LEFT JOIN income AS i ON (i.income_id = c.income_id or r.income_id = i.income_id)
    GROUP BY customer_id
    ORDER BY income_sum desc;
    `
      .replaceAll('\n', ' ')
      .trim()
  )
  try {
    const parsed = OwnerGetIncomeSumResponse.parse({
      incomeArray: rows,
    })
    res.status(200).json(parsed)
  } catch (e) {
    res.status(400).json({ error: e as ZodError })
  }
})
