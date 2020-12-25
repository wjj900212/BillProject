const express = require('express')
const router = express.Router()
const sqlMap = require('../sqlMap')
// 实现与mysql交互  使用连接池提升性能
const {pool, Result} = require('../mysqlPool')

function getNowDate () {
  function addZero (num) {
    var str = ''
    if (num >= 0 && num < 10) {
      str = '0' + num
    } else {
      str = '' + num
    }
    return str
  }
  var now = new Date()
  var returnStr = ''
  var year = now.getFullYear()
  var month = now.getMonth()
  month = addZero(month)
  var date = now.getDate()
  date = addZero(date)
  /* var hours = now.getHours()
hours = addZero(hours)
var min = now.getMinutes()
min = addZero(min) */
  returnStr = year + '-' + month + '-' + date
  return returnStr
}
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
  let debtDate = getNowDate()
  reqBody.debtDate = debtDate
  reqBody.restMoney = reqBody.money - reqBody.alreadyMoney
  var $sql = sqlMap.arrears.addArrears
  let addsqlparams = []
  addsqlparams[0] = reqBody.name
  addsqlparams[1] = reqBody.debtDate
  addsqlparams[2] = reqBody.money
  addsqlparams[3] = reqBody.phone || ''
  addsqlparams[4] = reqBody.status || 1
  addsqlparams[5] = reqBody.image || ''
  addsqlparams[6] = reqBody.remark || ''
  addsqlparams[7] = reqBody.restMoney || '' // 剩余的钱数在新增加数据的时候跟借款是一样的
  addsqlparams[8] = reqBody.alreadyMoney
  console.log(addsqlparams)
  pool.getConnection((err, conn) => {
    if (err) {
      console.log('和Mysql数据库建立连接失败')
    } else {
      console.log('和Mysql数据库连接成功')
      conn.query($sql, addsqlparams, (e, r) => {
        if (e) {
          console.log('[INSERT ERROR] - ', e.message)
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
router.post('/update', function (req, res) {
  let reqBody = req.body
  console.log(reqBody)
  if (reqBody.money === reqBody.alreadyMoney) {
    reqBody.status = 0
  }
  reqBody.restMoney = reqBody.money - reqBody.alreadyMoney
  let debtDate = getNowDate()
  reqBody.debtDate = debtDate

  var $sql = sqlMap.arrears.updateArrears
  let updatesqlparams = []
  updatesqlparams[0] = reqBody.name
  updatesqlparams[1] = reqBody.money
  updatesqlparams[2] = reqBody.debtDate
  updatesqlparams[3] = reqBody.phone
  updatesqlparams[4] = reqBody.status || 1
  updatesqlparams[5] = reqBody.remark || ''
  updatesqlparams[6] = reqBody.alreadyMoney
  updatesqlparams[7] = reqBody.restMoney
  updatesqlparams[8] = reqBody.key
  console.log(updatesqlparams)
  pool.getConnection((err, conn) => {
    if (err) {
      console.log('和Mysql数据库建立连接失败')
    } else {
      console.log('和Mysql数据库连接成功')
      conn.query($sql, updatesqlparams, (e, r) => {
        if (e) {
          console.log('[UPDATE ERROR] - ', e.message)
          return
        }
        var returnObj = {
          code: 200,
          msg: '修改成功'
        }
        res.json(returnObj)
      })
      conn.release() // 释放连接池，等待别的连接使用
    }
  })
})
module.exports = router
