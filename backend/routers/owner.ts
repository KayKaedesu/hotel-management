import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
import {
  OwnerGetLogResponse,
  OwnerGetScheduleResponse,
  OwnerGetIncomeResponse,
  OwnerGetEmployeeResponse,
} from 'types'

const ownerRouter = Router()

ownerRouter.get('/schedules', async (_req, res) => {
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
  const responseObject = OwnerGetScheduleResponse.parse({
    schedules: rows,
  })
  res.json(responseObject)
})

ownerRouter.get('/logs', async (_req, res) => {
  const [rows, results] = await databasePool.query(
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
  const [rows, results] = await databasePool.query(
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
  const responseObject = OwnerGetIncomeResponse.parse({
    income: rows,
  })
  res.json(responseObject)
})

ownerRouter.get('/employees', async (_req, res) => {
  const [rows, results] = await databasePool.query(
    [
      'SELECT',
      'first_name,',
      'last_name,',
      'tel_num,',
      // 'email,',
      'j.name,',
      'hourly_wage',
      'FROM employees',
      'JOIN jobs AS j USING (job_id)',
      'JOIN accounts USING (account_id)',
      'ORDER BY employee_id;',
    ].join(' ')
  )
  const responseObject = OwnerGetEmployeeResponse.parse({
    employees: rows,
  })
  res.json(responseObject)
})

export default ownerRouter
