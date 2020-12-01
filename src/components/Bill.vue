<template>
  <div class="Bill">
    <div class="title">
      <a-row>
        <a-col :span="24">
          记账
        </a-col>
      </a-row>
    </div>
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
            <span slot="operation" slot-scope="text">
              <a>编辑</a>
              <a>添加</a>
            </span>

            <a-table
              slot="expandedRowRender"
              slot-scope="text"
              :columns="innerColumns"
              :data-source="innerData"
              :pagination="false"
            >
              <span slot="status" slot-scope="text"> <a-badge status="success" />Finished </span>
            </a-table>
          </a-table>
        </template>
      </div>

    </div>
    <!--添加弹出框-->
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  { title: '序号', customRender: (text, record, index) => `${index + 1}` },
  { title: '欠款人姓名', dataIndex: 'name', key: 'name' },
  { title: '欠款金额', dataIndex: 'platform', key: 'platform' },
  { title: '欠款日期', dataIndex: 'version', key: 'version' },
  { title: '已还金额', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: '剩余金额', dataIndex: 'creator', key: 'creator' },
  { title: '欠款状态', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '备注', dataIndex: 'createdAt1', key: 'createdAt1' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
]

const data = []
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00'
  })
}

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
      data,
      columns,
      innerColumns,
      innerData,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
      console.log('弹出model')
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
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
  .title{
    background:#42b983;
    font-size:18px;
    font-weight: bold;
    color:#ffffff;
    height:40px;
    line-height: 40px;
  }
  .content{
    width:80%;
    height:100%;
    margin:0px auto;
    padding:20px 10px 10px 10px;
  }
  .con-btn{
    margin-bottom:10px;
    text-align: right;
  }
</style>
