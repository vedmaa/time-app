import mysql from 'mysql2'

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env['TIMEAPP_DB_HOST'],
  port: process.env['TIMEAPP_DB_PORT'],
  user: process.env['TIMEAPP_DB_USER'],
  password: process.env['TIMEAPP_DB_PASSWORD'],
  database: process.env['TIMEAPP_DB_NAME'],
})

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    const createTimeTable = CREATE_TIMES_TABLE_SQL
    connection.query(createTimeTable, (err) => {
      if (!err) {
        console.log('Times table was created')
      }
    })
    connection.release()
  }
})

export default pool
