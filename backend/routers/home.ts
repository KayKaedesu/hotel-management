import { Router } from 'express'

const homeRouter = Router({})

homeRouter.get('/', function (_req, res) {
  res.json({
    message: 'Hello world!',
  })
})

export default homeRouter
