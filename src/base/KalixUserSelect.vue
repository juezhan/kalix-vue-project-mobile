<template lang="pug">
  div.kalix-user_select
    flexbox(v-on:click.native="showParn")
      flexbox-item.user-select-item
        div.item(v-for="(item,index) in selectedItem" v-bind:key="item.id")
          div.weui-btn.weui-btn_mini.weui-btn_default {{item.name}}
          i.item-close(v-on:click.stop="closeItem(item)")
            x-icon.item-close-icon(type="ios-close" size="12")
      div.user-select-btn_search(v-on:click="showParn")
        div.weui-btn.weui-btn_default.user-select-btn_icon
          x-icon(type="ios-search-strong" size="20")
    popup(v-model="showPopup" height="100%" ref="popup" v-bind:show-mask="false")
      group
        x-input(title="" ref="iptQuery" placeholder="请输入联系人" v-model="query" v-on:on-change="changeQuery")
      group(title="联系人列表")
        cell(v-for='item in userList' v-bind:title="item.name" v-bind:key="item.id" v-on:click.native="selectItem(item)")
          icon(type="success-no-circle")
      div.weui-btn.weui-btn_default(v-on:click="closePopup") 关闭
</template>
<script type="text/ecmascript-6">
  import {usersURL} from 'views/admin/config.toml'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入用户名称'
      },
      value: {
        required: true
      },   // 用于绑定v-model
      multiple: { // 是否允许多选
        type: Boolean,
        default: false
      },
      params: {}, // 附加搜索参数
      defaultOptions: {},
      defaultIds: '',     // 已选择的 id 逗号分隔字符串,
      userNames: '',
      userIds: ''
    },
    data() {
      return {
        showPopup: false,
        userList: [],
        loading: false,
        currentValue: '',
        query: '',
        selectUser: {},
        selectedItem: []
      }
    },
    created() {
      // 如果有传入 defaultIds
      let _data = {
        id: this.defaultIds,
        page: 1,
        start: 0,
        limit: 200
      }
      this.axios.get(usersURL, {
        params: _data
      }).then(response => {
        this.users = response.data.data
        if (this.userIds) {
          this.userList = response.data.data
          if (this.multiple) {
            let _defaultIds = this.userIds.toString().split(',') // 将 userIds 转换为 数组
            let _defaultIdsInt = _defaultIds.map(item => {    // 将 _defaultIds 字符串数组转化为 数字
              return item * 1
            })
            this.currentValue = _defaultIdsInt  // 用户ID集合 赋给 currentValue
          } else {
            this.currentValue = this.userIds * 1
          }
          let that = this
          setTimeout(() => {  // 清空 下拉列表
            that.userList = []
          }, 20)
        }
      })
    },
    methods: {
      onChange(value) {
        let _selectUser = {}
        let _users = null
        let _userIds = null
        if (this.multiple) {  // 多选
          let uList = this.users || this.userList
          let users = uList.filter((item) => {
            return (value.indexOf(item.id) > -1)
          })
          _selectUser = users || []
          _users = []
          _userIds = []
          _selectUser.forEach(e => {
            _users.push(e.name)
            _userIds.push(e.id)
          })
          _users = _users.join(',')
          _userIds = _userIds.join(',')
        } else {  // 单选
          let users = this.userList.filter((item) => {
            return item.id === value
          })
          _selectUser = users[0] || {}
          _users = _selectUser.name
          _userIds = _selectUser.id
        }
        this.$emit('update:userNames', _users)
        this.$emit('update:userIds', _userIds)
        this.$emit('userSelected', _selectUser)  // 发送事件
      },
      remoteMethod(query) {
        if (query && query !== '') {
//          this.$emit('input', this.currentValue)  // 设置model的数值
          this.loading = true
          setTimeout(() => {
            this.loading = false
            let _jsonStr = {'%name%': query}
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
            })
          }, 100)
        } else {
          this.userList = []
        }
      },
      showParn() {
        this.showPopup = true
        setTimeout(() => {
          this.$refs.iptQuery.focus()
        }, 200)
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
        this.query = ''
        this.currentValue = item.id

        let _userNames = []
        let _userIds = []
        if (this.selectedItem.length > 1) {
          this.selectedItem.forEach(e => {
            _userIds.push(e.id)
            _userNames.push(e.name)
          })
        } else {
          _userIds = this.selectedItem[0].id
          _userNames = this.selectedItem[0].name
        }
        this.$emit('update:userNames', _userNames)
        this.$emit('update:userIds', _userIds)

        this.closePopup()
      },
      closeItem(item) {
        let index = this.selectedItem.findIndex(e => {
          return e.id === item.id
        })
        this.selectedItem.splice(index, 1)
      }
    },
    watch: {
      currentValue(newValue) {
        this.$emit('input', newValue)  // 设置model的数值
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .kalix-user_select
    padding 0 15px
    box-sizing border-box
    .user-select-item
      width 100%
      min-height 40px
      font-size 0;
      line-height 0
      .item
        position relative
        display inline-block
        margin 6px 10px 5px 0
        .item-close
          position: absolute;
          line-height 0
          padding: 6px;
          border-radius: 50%;
          top: -12px;
          right: -12px;
          .item-close-icon
            fill: #ff0000

    .user-select-btn_search
      font-size 0
      line-height 0
      margin-right -10px
      padding 5px
      height 40px
      width 40px
      display block
      box-sizing border-box
      .user-select-btn_icon
        margin: 0;
        padding: 5px;
        font-size: 0;
        display: inline-block;

</style>
