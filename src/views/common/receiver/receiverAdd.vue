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
            flexbox-item(v-on:click.native="showParn")
              div
                div(v-for="(item,index) in selectedItem" v-key="item.id") {{item.name}}
        x-input(title="消息主题" v-model="formModel.title")
        x-textarea(title="消息内容" v-model="formModel.content" v-bind:rows="3" placeholder="请输入文本")
      popup(v-model="showPopup" height="100%" ref="popup" v-bind:show-mask="false")
        group
          x-input(title="" ref="iptQuery" placeholder="请输入联系人" v-model="query" v-on:on-change="changeQuery")
        group(title="联系人列表")
          cell-box(v-for='item in userList' v-bind:key="item.id" v-on:click.native="selectItem(item)")
            flexbox-item {{item.name}}
            icon(type="success-no-circle")
        x-button(v-on:click.native="closePopup") Close Popup
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import KalixBaseDialog from 'components/custom/baseDialog'
  import KalixForm from 'base/KalixForm'
  import KalixFormCell from 'base/KalixFormCell'
  import {SenderURL} from '../config.toml'
  import {usersURL} from 'views/admin/config.toml'

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
        selectedItem: []
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
      },
      closePopup() {
        this.showPopup = false
      },
      changeQuery() {
        if (this.query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            let _jsonStr = {'%name%': this.query}
            _jsonStr = Object.assign(_jsonStr, this.params)
            let _data = {
              jsonStr: JSON.stringify(_jsonStr),
              page: 1,
              start: 0,
              limit: 200
            }
            this.axios.get(usersURL, {
              params: _data
            }).then(response => {
              this.userList = response.data.data
              console.log(this.userList)
            })
          }, 100)
        } else {
          this.userList = []
        }
      },
      selectItem(item) {
        this.selectedItem.push(item)
        this.closePopup()
      }
    }
  }
</script>

