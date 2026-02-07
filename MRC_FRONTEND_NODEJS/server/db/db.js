const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'D2_92665_Divita',
    password: 'manager',
    database: 'mrc_test_db'})

module.exports = pool