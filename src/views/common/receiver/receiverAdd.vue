<!--
描述：我的首页-收件箱组件-新增组件
开发人：桑杨
开发日期：2017年8月30日
-->
<template lang="pug">
  kalix-base-dialog(bizKey="receiver" ref="kalixBizDialog"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL")
    div.kalix-cell(slot="dialogFormSlot")
      el-form-item(label="收件人")
        kalix-user-select(v-bind:params="params" style="width:100%"
        v-model="receiverIds" v-bind:multiple="multiple"
        v-on:userSelected="onUserSelected")
      el-form-item(label="消息主题" prop="title" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="消息内容" prop="content" v-bind:rules="rules.content")
        el-input(v-model="formModel.content" type="textarea" v-bind:autosize="{ minRows: 4, maxRows: 8}")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import KalixBaseDialog from 'components/custom/baseDialog'
  import KalixForm from 'base/KalixForm'
  import KalixFormCell from 'base/KalixFormCell'
  import KalixUserSelect from 'base/KalixUserSelect'
  //  import KalixUserSelect from 'components/biz/userselect/userselect'
  import {SenderURL} from '../config.toml'

  export default {
    data() {
      return {
        params: {},
        multiple: true,
        show: false,
        readonly: true,
        formModel: Object.assign({}, FormModel),
        targetURL: SenderURL,
        showPopup: false,
//        popupId: 'popup' + Math.floor(Math.random() * 1000),
        query: '',
        userList: [],
        loading: false,
        selectedItem: [],
        receiverIds: [],
        rules: {
          receiverIds: [{required: true, message: '请输入收件人', trigger: 'blur'}],
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        }
      }
    },
    created() {
    },
    components: {
      KalixBaseDialog,
      KalixForm,
      KalixFormCell,
      KalixUserSelect
    },
    methods: {
      onUserSelected(users) {
        console.log('onUserSelected', users)
        let ids = []
        let names = []
        users.forEach(item => {
          ids.push(item.id)
          names.push(item.name)
        })
        this.formModel.receiverIds = ids.join(':')
        this.formModel.receiverNames = names.join(',')
      },
      open(title, flag, row) {
        this.show = true
        this.formModel = row
        console.log('row', row)
      },
      showParn() {
        this.showPopup = true
        setTimeout(() => {
          this.$refs.iptQuery.focus()
        }, 200)
//        document.body.removeChild(document.getElementsByClassName('vux-popup-mask')[0])
//        this.$refs.popup.insertBefore(document.getElementsByClassName('vux-popup-mask')[0])
//        let mask = document.getElementsByClassName('vux-popup-mask')[0]
//        mask.insertBefore(document.getElementById(this.popupId), mask.childNodes[0])
//        let popup = document.getElementById(this.popupId)
//        let mask = document.getElementsByClassName('vux-popup-mask')[0]
//        popup.insertBefore(mask, popup.childNodes[0])
//        console.log(this.popupId)
      }
    },
    watch: {
      receiverIds(newValue) {
        let value = [].concat(newValue)
        this.formModel.receiverIds = value.join(':')
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
