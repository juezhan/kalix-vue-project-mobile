<!--
描述：table上方工具栏组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.kalix-base-tool-bar
    div.s-flex.kalix-base-tool-bar-wrapper
      div.checkbox-wrapper
        kalix-checkbox(v-model="checkedAll" text="全选")
      div.s-flex_item
        template(v-for="btn in defaultBtnList")
          mt-button.kalix-btn(v-if="btn.isShow" v-on:click="toggle(btn.id)" size="small") {{btn.title}}
</template>

<script type="text/ecmascript-6">
  import KalixCheckbox from 'base/KalixCheckbox'
  import {ON_TOOLBAR_CLICK} from './event.toml'
  import {GlobalToolBarButtonList} from 'config/global.toml'
  import {concatArrayObject, getNewObject} from 'common/util.js'

  export default {
    props: {
      toolbarBtnList: {
        type: Array
      }
    },
    data() {
      return {
        checkedAll: false
      }
    },
    created() {
      this.initToolBtnList()
    },
    methods: {
      initToolBtnList() {
        let defaultToolBarBtnList = getNewObject(GlobalToolBarButtonList)
        this.defaultBtnList = concatArrayObject(this.toolbarBtnList, defaultToolBarBtnList)
      },
      toggle(btnId) {
        this.$emit(ON_TOOLBAR_CLICK, btnId)
      }
    },
    components: {
      KalixCheckbox
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .kalix-base-tool-bar
    position relative
    padding 12px
    &:after
      setBottomLine($color-background-d)
    .kalix-base-tool-bar-wrapper
      align()
      .checkbox-wrapper
        position relative
        margin-left -6px
        margin-right 12px
        padding-right 6px
        &:after
          setRightLine()
      .kalix-btn
        &+.kalix-btn
          margin-left 12px
</style>
