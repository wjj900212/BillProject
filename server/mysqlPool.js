const mysql = require('mysql')
// 创建一个数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'WJJSQL',
  database: 'wjj_db',
  port: '3306',
  connectTimeout: 5000, // 连接超时
  multipleStatements: false // 是否允许一个query中包含多条sql语句
})

function Result ({code = 1, msg = '', data = {}}) {
  this.code = code
  this.msg = msg
  this.data = data
}

module.exports = {pool, Result}
