<!--
描述：我的首页-收件箱组件-新增组件
开发人：桑杨
开发日期：2017年8月30日
-->
<template lang="pug">
  kalix-base-dialog(bizKey="receiver" ref="kalixBizDialog"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL")
    div(slot="dialogFormSlot")
      group
        cell-box
          flexbox
            label.weui-label(style="width:5em;") 收件人
            flexbox-item
              kalix-user-select(v-model="userList" v-bind:userIds.sync="receiverIds" )
        x-input(title="消息主题" v-model="formModel.title")
        x-textarea(title="消息内容" v-model="formModel.content" v-bind:rows="3" placeholder="请输入文本")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import KalixBaseDialog from 'components/custom/baseDialog'
  import KalixForm from 'base/KalixForm'
  import KalixFormCell from 'base/KalixFormCell'
  import KalixUserSelect from 'base/KalixUserSelect'
  import {SenderURL} from '../config.toml'

  export default {
    data() {
      return {
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
        receiverIds: []
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
