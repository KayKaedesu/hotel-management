import express, { Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// -------------------firing express app
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(path.join(fileURLToPath(import.meta.url), 'client/build'))
)

// -------------------routes
app.get('/home', (request: Request, response: Response) => {
  console.log(request.url)
  response.json({ message: `Welcome to the home page!!` })
})

// --------------------Listen
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
