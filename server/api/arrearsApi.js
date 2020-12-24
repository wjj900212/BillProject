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
  let reqBody = req.body
  console.log(reqBody)
  let debtDate = this.$globalFunction.getNowDate()
  reqBody.debtDate = debtDate
  var $sql = sqlMap.arrears.addArrears
  let addsqlparams = []
  addsqlparams[0] = reqBody.name
  addsqlparams[1] = reqBody.debtDate
  addsqlparams[2] = reqBody.money
  addsqlparams[3] = reqBody.phone || ''
  addsqlparams[4] = reqBody.status || ''
  addsqlparams[5] = reqBody.image || ''
  addsqlparams[6] = reqBody.remark || ''
  pool.getConnection((err, conn) => {
    if (err) {
      console.log('和Mysql数据库建立连接失败')
    } else {
      console.log('和Mysql数据库连接成功')
      conn.query($sql, addsqlparams, (e, r) => {
        if (e) {
          console.log('[INSERT ERROR] - ', err.message)
          return
        }
        var returnObj = {
          code: 200,
          msg: '添加成功'
        }
        res.json(returnObj)
      })
      conn.release() // 释放连接池，等待别的连接使用
    }
  })
})
router.post('/delete', function (req, res) {
  let reqBody = req.body
  var $sql = sqlMap.arrears.deleteArrears
  let deletesqlparams = []
  deletesqlparams[0] = reqBody.pkey

  pool.getConnection((err, conn) => {
    if (err) {
      console.log('和Mysql数据库建立连接失败')
    } else {
      console.log('和Mysql数据库连接成功')
      conn.query($sql, deletesqlparams, (e, r) => {
        if (e) {
          console.log('[DELETE ERROR] - ', err.message)
          return
        }
        var returnObj = {
          code: 200,
          msg: '删除成功'
        }
        res.json(returnObj)
      })
      conn.release() // 释放连接池，等待别的连接使用
    }
  })
})
module.exports = router
