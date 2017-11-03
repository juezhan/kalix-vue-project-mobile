<template lang="pug">
  div.kalix-base_dialog(v-show="visible")
    kalix-header(v-bind:title="title")
      template(slot="left")
        div(v-on:click="onCancelClick") 关闭
    div.kalix-base_dialog_wrapper
      el-form(ref="dialogForm" v-bind:model="formModel" label-width="80px"
      v-bind:inline-message="false"
      v-bind:show-message="false"
      )
        slot(name="dialogFormSlot")
    div.kalix-base_dialog_ft
      flexbox(v-bind:gutter="12")
        template(v-if="isView")
          flexbox-item
            x-button(type="primary" v-on:click.native="onCancelClick") 关 闭
        template(v-else)
          flexbox-item
            x-button(type="default" v-on:click.native="onCancelClick") 取 消
          flexbox-item
            x-button(type="primary" v-on:click.native="onSubmitClick") 提 交
</template>
<script type="text/ecmascript-6">
  import Message from 'common/js/message'
  import KalixHeader from 'base/KalixHeader'
  import EventBus from 'common/js/eventbus'
  import {ON_REFRESH_DATA} from './event.toml'

  export default {
    props: {
      formModel: { // dialog中的form的数据模型，由父组件传递
        type: Object,
        required: true
      },
      bizKey: String,
      isView: false,
      targetURL: {  // 业务数据提交的url,包括add，delete，update
        type: String
      }
    },
    data() {
      return {
        title: '',
        visible: false
      }
    },
    methods: {
      open(_title, isEdit = false, row) {
        this.visible = true
        this.title = _title
        this.isEdit = isEdit
        let beforeFormModel = JSON.parse(JSON.stringify(this.formModel))
        console.log(`open before formModel :`, beforeFormModel)
        if (row) {
          this.$emit('update:formModel', row)  // 设置sync才有效
//          Object.assign(this.formModel, row)
        } else {
          this.$emit('update:formModel', JSON.parse(this.tempFormModel))
//          Object.assign(this.formModel, JSON.parse(this.tempFormModel))
        }
        console.log('open temp FormModel', this.tempFormModel)
        console.log('open formModel', this.formModel)
        console.log('open row', row)

//        this.$emit('update:formModel', row)
      },
      close() {
        this.visible = false
      },
      onClose() {
        this.close()
      },
      onCancelClick() {
        console.log('Close')
        this.close()
      },
      onSubmitClick() {
//        window.KalixDialog = this.$refs.dialogForm
        this.$refs.dialogForm.validate((valid, b) => {
          console.log('onSubmitClick this.$refs.dialogForm', this.$refs.dialogForm)
          console.log('valid', valid)
          if (valid) {
            this.axios.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
                this.visible = false
                // 关闭对话框
//                this.close()
                // 清空form
//                this.$parent.resetDialogForm()
//                this.$emit('resetDialogForm')
              } else {
                Message.error(response.data.msg)
              }
              // 刷新列表
              EventBus.$emit(ON_REFRESH_DATA)
              this._afterDialogClose()
              console.log('[kalix] dialog submit button clicked !')
              this.visible = false
            })
          } else {
            let validateMessages = []
            this.$refs.dialogForm.fields.forEach(e => {
              validateMessages.push(e.validateMessage)
            })
            Message.error(validateMessages.join('<br/>'))
            return false
          }
        })
      },
      _afterDialogClose() {
        EventBus.$emit(this.bizKey + '-' + 'KalixDialogClose')
      }
    },
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
      console.log('called created!!!')
//      EventBus.$on(this.bizKey + '-' + ON_INIT_DIALOG_DATA, this.initData)
    },
    components: {
      KalixHeader//, XButton, Flexbox, FlexboxItem
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  .kalix-base_dialog
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 99
    background-color #fff
    .kalix-base_dialog_wrapper
      padding-top 40px
    .kalix-base_dialog_ft
      position relative
      bottom 0
      left 0
      width 100%
      padding 12px
      box-sizing border-box
      .kalix-base_dialog_ft_wrapper
        display flex
        margin 0 -6px
        .kalix-base_dialog_ft_wrapper_cell
          flex 1
          padding 0 6px
          .kalix-base_dialog_ft_btn
            width 100%


</style>
