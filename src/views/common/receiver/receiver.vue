<template lang="pug">
  div
    kalix-base-table(bizKey="receiver" title='收件列表'
    ref="kalixTable"
    v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog"
    v-bind:toolbarBtnList="toolbarBtnList"
    v-bind:btnList="btnList" )
      template(slot="tableColumnSlot" scope="scope")
        div.s-flex.row
          div.cell-label 标题：
          div.s-flex_item {{scope.item.title}}
        div.s-flex.row
          div.cell-label 主题：
          div.s-flex_item {{scope.item.content}}
        div.s-flex.row
          div.cell-label 收件时间：
          div.s-flex_item {{scope.item.creationDate}}

</template>
<script type="text/ecmascript-6">
  import KalixBaseTable from 'components/custom/baseTable'
  import {ReceiverURL, ReceiverComponent, SenderToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'
  // 注册全局组件
  registerComponent(ReceiverComponent)

  export default {
    data() {
      return {
        toolbarBtnList: [
          {id: 'deleteChecked', isShow: true}
        ],
        bizDialog: [
          {id: 'view', dialog: 'CommonReceiverView'},
          {id: 'add', dialog: 'CommonReceiverAdd'}
        ],
        targetURL: ReceiverURL,
        btnList: SenderToolButtonList
      }
    },
    created() {
    },
    methods: {},
    components: {
      KalixBaseTable
    },
    computed: {}
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  @import "~common/stylus/mixin"
  .cell
    font-size 14px
    .row
      position relative
      padding 8px 12px;
      &:not(:last-child)
        &:after
          setBottomLine()
          left 12px
          right 12px
    .row_header
      position relative
      padding 6px 12px
      align()
      &:after
        setBottomLine()
      .checkbox-wrapper
        position relative
        padding-right 6px
        margin-left -6px
        margin-right 12px
        &:after
          setRightLine()
          top -6px
          bottom -6px

</style>
