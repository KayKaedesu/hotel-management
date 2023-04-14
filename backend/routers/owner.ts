import { Router } from 'express'
import databasePool from '../adapters/db_adapter.js'
const ownerRouter = Router()

ownerRouter.get('/employees', (_req, res) => {
  databasePool.query(
    [
      'SELECT',
      'first_name,',
      'last_name,',
      'tel_num,',
      'name `job name`', //
      'FROM employees',
      'JOIN jobs USING (job_id)',
      'ORDER BY first_name asc;',
    ].join(' '),
    function (error, results) {
      const responseObject = results
      res.json(responseObject)
    }
  )
})

ownerRouter.get('/income', (_req, res) => {
    databasePool.query(
      [
        'SELECT',
        'amount,',
        'received_at,',
        'source,',
        'FROM income',
        'ORDER BY received_at asc;',
      ].join(' '),
      function (error, results) {
        const responseObject = results
        res.json(responseObject)
      }
    )
  })

export default ownerRouter
