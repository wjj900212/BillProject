<template>
  <a-drawer
    title="修改借款信息"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="billEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='姓名'
                   v-bind="formItemLayout"
                   :validateStatus="validateStatus">
        <a-input v-decorator="['name', {rules: [{ required: true, message: '姓名不能为空'}]}]"/>
        <a-input style="display: none;" v-decorator="['key']"/>
      </a-form-item>
      <a-form-item label="金额" v-bind="formItemLayout" :validateStatus="validateStatus">
        <a-input
          v-decorator="['money', {rules: [
            { required: true , message: '请输入正确的手机号'}
          ]}]"/>
      </a-form-item>
      <!--<a-form-item label='状态' v-bind="formItemLayout">
        <a-radio-group
          v-decorator="[
            'status',
            {rules: [{ required: true, message: '请选择状态' }]}
          ]">
          <a-radio value="0">已还清</a-radio>
          <a-radio value="1">还在欠</a-radio>
        </a-radio-group>
      </a-form-item>-->
      <a-form-item v-bind="formItemLayout" label="已还金额:">
        <a-input placeholder="请输入已还金额"
                 v-decorator="[
          'alreadyMoney',
          {
            rules: [
              {
                required: true,
                message: 'Please input your alreadyMoney!',
              }
            ]
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
      <a-form-item label='备注' v-bind="formItemLayout">
        <a-textarea
          :rows="3"
          v-decorator="[
          'remark',
          {rules: [
            { max: 50, message: '长度不能超过50个字符'}
          ]}]">
        </a-textarea>
      </a-form-item>
    </a-form>
    <div class="drawer-bootom-button">
      <a-button @click="onClose" type="primary">取消</a-button>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>
<script>
import moment from 'moment'
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
}
export default {
  name: 'edit-bill',
  props: {
    billEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      moment,
      updateOptions: [],
      formItemLayout,
      form: this.$form.createForm(this),
      loading: false,
      validateStatus: ''
    }
  },
  methods: {
    onClose () {
      this.loading = false
      this.form.resetFields()
      this.$emit('close')
    },
    setFormValues ({...arrears}) {
      let fields = ['key', 'name', 'money', 'alreadyMoney', 'debtDate', 'phone', 'remark']
      Object.keys(arrears).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = arrears[key]
          this.form.setFieldsValue(obj)
        }
      })
      this.form.setFieldsValue({
        'debtDate': moment(arrears.debtDate)
      })
    },
    doSubmit () {
      this.validateStatus = 'success'
      this.form.validateFields((err, values) => {
        console.log(!err)
        if (!err && this.validateStatus === 'success') {
          this.loading = true
          let arrears = this.form.getFieldsValue()
          console.log(arrears)
          this.$postDate('api/update', {
            ...arrears
          }).then((r) => {
            this.loading = false
            this.$emit('success')
            this.reset()
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    reset () {
      this.validateStatus = ''
      this.loading = false
      this.form.resetFields()
    },
    handleSubmit () {
      this.doSubmit()
    }
  }
}
</script>
