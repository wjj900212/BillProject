const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const arrearsApi = require('./api/arrearsApi')

// 采用设置所有均可访问的方法解决跨域问题
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Acces-Control-Allow-Origin', '*')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() === 'options') {
    // 让options尝试请求快速结束
    res.send(200)
  } else {
    next()
  }
})

app.use(cors()) // 解决跨域
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// 后端api路由
app.use('/api', arrearsApi)
// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')
app.get('/', (req, res) => {
  res.json('helloWord')
})
