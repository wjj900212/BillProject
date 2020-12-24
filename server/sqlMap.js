var sqlMap = {
  // 用户
  arrears: {
    // 查询欠款表
    selectArrears: 'SELECT * FROM arrears;',
    addArrears: 'INSERT INTO arrears(pkey,name,debtDate,money,phone,status,image,remark,restMoney) values(0,?,?,?,?,1,?,?,?);',
    deleteArrears: 'delete from arrears where pkey=?'
  }
}

module.exports = sqlMap
