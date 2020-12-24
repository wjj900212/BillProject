<template>
  <a-drawer
    title="添加设备"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="handleCancel"
    :visible="billAddVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="姓名:">
      <a-input placeholder="请输入借款人姓名"
        v-decorator="[
          'name',
          {
            rules: [
              {
                required: true,
                message: 'Please input your name!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="金额:">
      <a-input placeholder="请输入借款金额"
        v-decorator="[
          'money',
          {
            rules: [
              {
                required: true,
                message: 'Please input your money!',
              }
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="日期:">
      <a-date-picker placeholder="请选择借款日期"
        v-decorator="[
      'debtDate',
      {
        rules: [
        {
          required: true,
          message: 'Please select Date!'
          }
        ]
      }]" />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="联系方式:">
      <a-input placeholder="请输入联系方式"
        v-decorator="[
          'phone'
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '86' }]"
          style="width: 70px"
        >
          <a-select-option value="86">
            +86
          </a-select-option>
          <a-select-option value="87">
            +87
          </a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="备注:">
      <a-textarea placeholder="备注信息" v-decorator="[
          'remark'
        ]" allow-clear />
    </a-form-item>
  </a-form>
    <div class="drawer-bootom-button">
      <a-button @click="handleCancel" type="primary">取消</a-button>
      <a-button @click="handleOk" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
import Moment from 'moment'
export default {
  name: 'add-bill',
  data () {
    return {
      confirmDirty: false,
      confirmLoading: false,
      loading: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    }
  },
  props: {
    billAddVisiable: {
      default: false
    }
  },
  components: {
    Moment
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    handleOk () {
      this.handleSubmit()
    },
    handleCancel () {
      this.$emit('close')
    },
    handleSubmit (e) {
      /* e.preventDefault()
      console.log(e) */
      let _this = this
      let params = {}
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          params.name = values.name
          params.debtDate = Moment(values.debtDate).format('YYYY-MM-DD')
          params.money = values.money
          if (values.phone !== undefined) {
            params.phone = values.phone
          }
          if (values.remark !== undefined) {
            params.remark = values.remark
          }
          console.log(params)
          _this.$postDate('api/add', params, {headers: {'Content-Type': 'application/json'}}).then((r) => {
            _this.form.resetFields()
            _this.$emit('success')
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
