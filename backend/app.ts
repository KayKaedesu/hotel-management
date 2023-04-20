import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url'

import homeRouter from './routers/home.js'
import exampleRouter from './routers/examples.js'
import customerRouter from './routers/customer.js'
import receptionRounter from './routers/reception.js'

// ! DO NOT REMOVE
dotenv.config()

// -------------------setting up
const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(fileURLToPath(import.meta.url), 'static')))

// -------------------routing
app.use('/', homeRouter)
app.use('/test/', exampleRouter)
app.use('/customer/', customerRouter)
app.use('/reception/', receptionRounter)

// --------------------Listen

const PORT = process.env.BACKEND_URL
  ? new URL(process.env.BACKEND_URL).port
  : 4000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
