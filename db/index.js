const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'qsxpkn16.',
    database: 'test_db'
})

module.exports = db