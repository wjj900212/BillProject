<template>
  <div class="Bill">
    <div class="content">
      <div class="con-btn">
        <a-button type="primary" @click="showModal">
          添加
        </a-button>
        <a-button type="primary">
          导出
        </a-button>
      </div>
      <div class="con-table">
        <template>
          <a-table :columns="columns" :data-source="data" class="components-table-demo-nested">
            <span slot="debtDate" slot-scope="text">{{text| formatDate}}</span>
            <span slot="status" slot-scope="text">
              <span v-if="text === 1">还在欠</span>
              <span v-else-if="text === 0">已还清</span>
            </span>
            <template slot="operation" slot-scope="text, record">
              <a-icon type="setting" theme="twoTone" @click="billEidt(record)" title="编辑"/>
              <a-icon type="delete" theme="twoTone" twoToneColor="#42b983" @click="billDelete(record)" title="删除"/>
              <a>添加</a>
            </template>
            <a-table
              slot="expandedRowRender"
              slot-scope="text"
              :columns="innerColumns"
              :data-source="innerData"
              :pagination="false"
            >
            </a-table>
          </a-table>
        </template>
      </div>
    </div>
    <!--添加弹出框-->
    <add-bill
      @close="handleBillAddClose"
      @success="handleBillAddSuccess"
      :billAddVisiable = "isShowBillAdd.visible"
    ></add-bill>
    <!-- 修改 -->
    <edit-bill
      ref="billEdit"
      @close="handleBillEditClose"
      @success="handleBillEditSuccess"
      :billEditVisiable="isShowBillEdit.visible">
    </edit-bill>
  </div>
</template>

<script>
import AddBill from './addBill'
import EditBill from './editBill'
const columns = [
  { title: '序号', customRender: (text, record, index) => `${index + 1}` },
  { title: '欠款人姓名', dataIndex: 'name', key: 'name' },
  { title: '欠款金额', dataIndex: 'money', key: 'money' },
  { title: '欠款日期', dataIndex: 'debtDate', key: 'debtDate', scopedSlots: { customRender: 'debtDate' } },
  { title: '已还金额', dataIndex: 'alreadyMoney', key: 'alreadyMoney' },
  { title: '剩余金额', dataIndex: 'restMoney', key: 'restMoney' },
  { title: '欠款状态', dataIndex: 'status', key: 'status', scopedSlots: { customRender: 'status' } },
  { title: '备注', dataIndex: 'remark', key: 'remark' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
]

const innerColumns = [
  { title: '还款日期', dataIndex: 'date', key: 'date' },
  { title: '还款金额', dataIndex: 'money', key: 'money' }
]

const innerData = []
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    money: '300'
  })
}
export default {
  name: 'Bill',
  data () {
    return {
      data: [],
      columns,
      innerColumns,
      innerData,
      isShowBillAdd: {
        visible: false
      },
      isShowBillEdit: {
        visible: false
      }
    }
  },
  components: {
    EditBill,
    AddBill
  },
  mounted () {
    this.getArrearsList()
  },
  methods: {
    showModal () {
      this.isShowBillAdd.visible = true
    },
    handleBillAddClose () {
      this.isShowBillAdd.visible = false
    },
    handleBillAddSuccess () {
      this.isShowBillAdd.visible = false
      this.$message.success('新增设备成功')
      this.getArrearsList()
    },
    getArrearsList () {
      let _this = this
      this.$get('/api/arrears', {
      }).then((r) => {
        let dataList = r.data.data
        console.log(dataList)
        let arrearsData = []
        for (let i = 0; i < dataList.length; ++i) {
          arrearsData.push({
            key: dataList[i].pkey,
            name: dataList[i].name,
            money: dataList[i].money,
            debtDate: dataList[i].debtDate,
            phone: dataList[i].phone,
            alreadyMoney: dataList[i].alreadyMoney,
            restMoney: dataList[i].restMoney,
            status: dataList[i].status,
            remark: dataList[i].remark
          })
        }
        _this.data = arrearsData
      })
    },
    handleBillEditClose () {
      this.isShowBillEdit.visible = false
    },
    handleBillEditSuccess () {
      this.isShowBillEdit.visible = false
      this.$message.success('修改借款信息成功')
      this.getArrearsList()
    },
    billEidt (record) {
      console.log(record)
      this.$refs.billEdit.setFormValues(record)
      this.isShowBillEdit.visible = true
    },
    billDelete (record) {
      let that = this
      this.$confirm({
        title: '确定删除所选中的记录?',
        content: '当您点击确定按钮后，这些记录将会被彻底删除',
        centered: true,
        onOk () {
          let params = {pkey: record.key}
          that.$postDate('api/delete', {...params}).then(() => {
            that.$message.success('删除成功')
            that.getArrearsList()
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.content{
  width:100%;
  height:100%;
  margin:0px auto;
}
.con-btn{
  margin-bottom:10px;
  text-align: right;
}
</style>
