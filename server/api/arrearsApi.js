const express = require('express')
const router = express.Router()
const sqlMap = require('../api/arrearsApi')
// 实现与mysql交互  使用连接池提升性能
const {pool, Result} = require('../mysqlPool')

// 查询所有欠账
router.get('/arrears', (req, res) => {
  var $sql = sqlMap.arrears.selectArrears
  pool.getConnection((err, conn) => {
    conn.query($sql, (e, r) => {
      if (e) throw err
      res.json(new Result(r))
    })
    conn.release() // 释放连接池，等待别的连接使用
  })
})
module.exports = router
