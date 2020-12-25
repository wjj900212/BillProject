var sqlMap = {
  // 用户
  arrears: {
    // 查询欠款表
    selectArrears: 'SELECT * FROM arrears;',
    addArrears: 'INSERT INTO arrears(pkey,name,debtDate,money,phone,status,image,remark,restMoney,alreadyMoney) values(0,?,?,?,?,?,?,?,?,?);',
    deleteArrears: 'delete from arrears where pkey=?;',
    updateArrears: 'update arrears set name=?, money=?, debtDate=?, phone=?, status=?, remark=?, alreadyMoney=?,restMoney=? where pkey=?;'
  }
}

module.exports = sqlMap
