const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '34.136.109.33',
  user: 'everyone',
  password: 'morgan-group2400$$',
  database: 'bear_market',
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack)
    return
  }
  console.log('Connected to MySQL as id ' + connection.threadId)
})

module.exports = connection
