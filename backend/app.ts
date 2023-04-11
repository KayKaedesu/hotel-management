import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

import homeRouter from './routers/home.js'
import exampleRouter from './routers/examples.js'

// ! DO NOT REMOVE
dotenv.config()

// -------------------setting up
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(fileURLToPath(import.meta.url), 'static')))

// -------------------routing
app.use('/', homeRouter)
app.use('/test/', exampleRouter)

// --------------------Listen



const PORT = process.env.BACKEND_URL
  ? new URL(process.env.BACKEND_URL).port
  : 4000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
