import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const databasePool = await mysql.createPool({
  host: '127.0.0.1',
  port: Number(process.env.MYSQL_TCP_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default databasePool
