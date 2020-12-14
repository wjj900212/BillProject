<template>
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
      <a-input placeholder="请借款金额"
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
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="日期:">
      <a-date-picker placeholder="请选择借款日期"
        v-decorator="[
      'date-picker',
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
      <a-textarea placeholder="备注信息" allow-clear @change="onChange" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'add-bill',
  data () {
    return {
      confirmDirty: false,
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
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onChange (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
