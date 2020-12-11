module.exports = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'WJJSQL',
    database: 'wjj_db',
    port: '3306',
    connectTimeout: 5000, // 连接超时
    multipleStatements: false // 是否允许一个query中包含多条sql语句
  }
}
