import mysql from 'mysql2'

const databasePool = mysql.createPool({
  host: process.env.CLIENT_URL || '127.0.0.1:4000',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default databasePool
