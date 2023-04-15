import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'

const employeeRouter = Router()

employeeRouter.get('/schedules', (_req, res) => {
  databasePool.query(
    [
      'SELECT',
      'schedule_date',
      'first_name,',
      'last_name,',
      'start_hour,',
      'end_hour',
      'FROM work_schedules',
      'JOIN employees USING (employee_id)',
      'ORDER BY start_hour asc;',
    ].join(' '),
    function (error, results) {
      
    }
  )
})

employeeRouter.get('/logs', (_req, res) => {
  databasePool.query(
    [
      'SELECT',
      'first_name,',
      'last_name,',
      'start_at,',
      'end_at',
      // รวมชั่วโมงที่ทำ
      'FROM work_logs',
      'JOIN employees USING (employee_id)',
      'ORDER BY start_at asc;',
    ].join(' '),
    function (error, results) {
      const responseObject = results
      res.json(responseObject)
    }
  )
})

export default employeeRouter
