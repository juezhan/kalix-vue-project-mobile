<!--
描述：我的首页-收件箱组件-查看组件
开发人：桑杨
开发日期：2017年8月30日
-->
<template lang="pug">
  kalix-base-dialog(bizKey="receiver" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    kalix-form(slot="dialogFormSlot" label-width="100")
      kalix-form-cell(label="标题") {{formModel.title}}
      kalix-form-cell(label="内容") {{formModel.content}}
      kalix-form-cell(label="发布人") {{formModel.senderName}}
      kalix-form-cell(label="发布时间") {{formModel.creationDate}}
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import KalixBaseDialog from 'components/custom/baseDialog'
  import KalixForm from 'base/KalixForm'
  import KalixFormCell from 'base/KalixFormCell'

  export default {
    data() {
      return {
        show: false,
        readonly: true,
        formModel: Object.assign({}, FormModel)
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
<style scoped lang="stylus" type="text/stylus">
</style>
