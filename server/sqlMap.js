var sqlMap = {
  // 用户
  arrears: {
    // 查询欠款表
    selectArrears: 'SELECT * FROM arrears;',
    addArrears: 'INSERT INTO arrears(name,debtDate,money,phone,status,remark) values(?,?,?,?,?,?);'
  }
}

module.exports = sqlMap
