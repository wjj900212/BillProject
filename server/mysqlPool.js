const mysql = require('mysql')
const db = require('./db')

// 创建一个数据库连接池
const pool = mysql.createPool(db)

function Result ({code = 1, msg = '', data = {}}) {
  this.code = code
  this.msg = msg
  this.data = data
}

module.exports = {pool, Result}
