<template lang="pug">
  div.kalix-base_dialog(v-show="visible")
    kalix-header(v-bind:title="title")
      template(slot="left")
        div(v-on:click="onCancelClick") 关闭
    div.kalix-base_dialog_wrapper
        el-form.search-container(ref="searchForm" v-bind:model="form" label-width="80px" )
          div.kalix-gulp
            div.kalix-cells
              slot(name="searchFormSlot")
                div.kalix-cell(v-for="item in searchFields")
                  el-form-item(v-bind:label="item.label" v-bind:prop="item.prop" v-bind:key="item.prop")
                    el-select(v-if="item.type==='select'" v-model="form[item.prop]" v-bind:class="bindCls(item.cls)" v-bind:data-type="item.dataType")
                      el-option(v-for="option in item.options" v-bind:key="option.value" v-bind:label="option.label" v-bind:value="option.value")
                    el-input-number(v-else-if="item.type==='number'" v-model="form[item.prop]" v-bind:class="bindCls(item.cls)" v-bind:data-type="item.dataType")
                    org-tree.inline(v-else-if="item.type==='orgTree'" v-model="form[item.prop]" v-bind:isAll="item.isAll")
                    el-input(v-else v-model="form[item.prop]")
    div.kalix-base_dialog_ft
      flexbox(v-bind:gutter="12")
        template(v-if="isView")
          flexbox-item
            x-button(type="primary" v-on:click.native="onCancelClick") 关 闭
        template(v-else)
          flexbox-item
            x-button(type="default" v-on:click.native="onResetClick") 重 置
          flexbox-item
            x-button(type="primary" v-on:click.native="onSubmitClick") 提 交
</template>
<script type="text/ecmascript-6">
  import {strToUnicode} from 'common/unicode-convert'
  import KalixHeader from 'base/KalixHeader'
  import {isEmptyObject} from 'common/util'
  import EventBus from 'common/js/eventbus'
  import {ON_SEARCH_BUTTON_CLICK} from './event.toml'

  export default {
    props: {
      bizKey: String,
      isView: false,
      targetURL: {  // 业务数据提交的url,包括add，delete，update
        type: String
      },
      searchFields: { // 搜索查询的字段
        type: Array
      }
    },
    data() {
      return {
        form: {},
        formModel: {},
        title: '',
        visible: false
      }
    },
    created() {
      this._currentForm()
    },
    methods: {
      open(_title, isEdit = false, row) {
        this.visible = true
      },
      close() {
        this.visible = false
        this._afterDialogClose()
      },
      onClose() {
        this.close()
      },
      onCancelClick() {
        console.log('Close')
        this.close()
      },
      bindFormDataType(e) {
        this.formDataType[e.prop] = e.dataType || e.type || 'string'
        this.formDataField[e.prop] = e.field || null
      },
      bindCls(label) {
        if (label) {
          return label.length > 0 ? `${this.bizKey}-${label}` : ''
        }
        return ''
      },
      _currentForm() {
        this.isSearchFrom = false
        this.formDataType = {}
        this.formDataField = {}
        if (!isEmptyObject(this.searchForm)) {  // 是否传入 searchForm
          this.form = this.searchForm
          this.isSearchFrom = true
        } else {
          this.searchFields.forEach(item => {
            this.bindFormDataType(item)
            this.$set(this.form, item.prop, null)
          })
        }
      },
      // 重置搜索框
      onResetClick() {
        this.$refs.searchForm.resetFields()
        if (this.isSearch) {
          EventBus.$emit(ON_SEARCH_BUTTON_CLICK, {})
          this.isSearch = false
        }
      },
      // 提交查询
      onSubmitClick() {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
            console.log('onSubmitClick')
//            todo: 增加查询组成json串
            let requestDatas = []
            for (let item in this.form) {
              const itemVal = this.form[item]
              if (itemVal) {
                let field = item
                let key = `"${field}"`   //  绑定 查询 key
                let val = `"${itemVal}"`   //  绑定 查询 value
                if (this.formDataField[item]) {
                  key = `"${this.formDataField[item]}"`
                } else if (this.formDataType[item] === 'string') {
                  key = `"%${field}%"`
                }
                switch (this.formDataType[item]) {
                  case 'string':
                    if (this.isChinese(itemVal)) {
                      val = `"${strToUnicode(itemVal)}"`
                    }
                    break
                  case 'number':
                    val = `${itemVal}`
                    break
                }
                requestDatas.push(`${key}: ${val}`)
              }
            }
            let searchObj = {}
            if (requestDatas.length > 0) {
              searchObj.jsonStr = `{${requestDatas.join(',')}}`
//              console.log('[Search]', `{${requestDatas.join(',')}}`)
            }
            this.isSearch = true
            EventBus.$emit(ON_SEARCH_BUTTON_CLICK, searchObj)
//
            console.log('[提交查询 Search]', `{${requestDatas.join(',')}}`)
            this.visible = false
            this._afterDialogClose()
          } else {
            console.log('[提交查询] valid', valid)
          }
        })
      },
      // 是否是数字
      isNumberData(_data) {
        const regNumber = /^[0-9]+.?[0-9]*$/
        return regNumber.test(_data)
      },
      isChinese(str) {
        let strExp = new RegExp(/^[\u4E00-\u9FA5]+$/)
        if (strExp.test(str)) {
          return true
        }
        return false
      },
      _afterDialogClose() {
        console.log('[After Dialog Close]:', this.bizKey + '-' + 'KalixDialogClose')
        EventBus.$emit(this.bizKey + '-' + 'KalixDialogClose')
      }
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
      padding-top 46px
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
