<!--
描述：我的首页-收件箱组件-新增组件
开发人：桑杨
开发日期：2017年8月30日
-->

<template lang="pug">
  kalix-base-dialog(bizKey="receiver" ref="kalixBizDialog"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL")
    kalix-form(slot="dialogFormSlot" label-width="100")
      kalix-form-cell(label="收件人")
        input.kalix-input(v-model="formModel.receiverIds" type="text")
      kalix-form-cell(label="消息主题")
        input.kalix-input(v-model="formModel.title" type="text")
      kalix-form-cell(label="消息内容")
        textarea.weui-textarea(placeholder="请输入文本" rows="3" v-model="formModel.content" )
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import KalixBaseDialog from 'components/custom/baseDialog'
  import KalixForm from 'base/KalixForm'
  import KalixFormCell from 'base/KalixFormCell'
  import {SenderURL} from '../config.toml'

  export default {
    data() {
      return {
        show: false,
        readonly: true,
        formModel: Object.assign({}, FormModel),
        targetURL: SenderURL
      }
    },
    created() {
    },
    components: {
      KalixBaseDialog,
      KalixForm,
      KalixFormCell
    },
    methods: {
      open(title, flag, row) {
        this.show = true
        this.formModel = row
        console.log('row', row)
      }
    }
  }
</script>

