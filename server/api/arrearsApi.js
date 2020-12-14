const express = require('express')
const router = express.Router()
const sqlMap = require('../sqlMap')
// 实现与mysql交互  使用连接池提升性能
const {pool, Result} = require('../mysqlPool')

// 查询所有欠账
router.get('/arrears', (req, res) => {
  var $sql = sqlMap.arrears.selectArrears
  pool.getConnection((err, conn) => {
    if (err) {
      console.log('和Mysql数据库建立连接失败')
    } else {
      console.log('和Mysql数据库连接成功')
      conn.query($sql, (e, r) => {
        if (e) throw err
        res.json(new Result({data: r}))
      })
      conn.release() // 释放连接池，等待别的连接使用
    }
  })
})
// 添加欠账信息
router.post('/add', function (req, res) {
  let name = req.body.name
  let debtDate = req.body.debtDate
  let money = req.body.money
  let phone = req.body.phone
  let status = 1
  let remark = req.body.remark
  var $sql = sqlMap.arrears.addArrears
  let addsqlparams = [name, debtDate, money, phone, status, remark]
  pool.getConnection((err, conn) => {
    if (err) {
      console.log('和Mysql数据库建立连接失败')
    } else {
      console.log('和Mysql数据库连接成功')
      conn.query($sql, addsqlparams, (e, r) => {
        if (e) throw err
        res.json(new Result({data: r}))
      })
      conn.release() // 释放连接池，等待别的连接使用
    }
  })
})
module.exports = router
