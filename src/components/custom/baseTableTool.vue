<!--
描述：table中column中的tool组件的按钮封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.table-tool
    template(v-for="btn in btnList")
      template(v-if="btn.isShow")
        template(v-if="btn.titleCompute")
          mt-button.table-tool_btn(v-if="!btn.cond || btn.cond(scope)" v-on:click="toggle(scope,btn.id)") {{btn.titleCompute(scope)}}
        template(v-else)
          mt-button.table-tool_btn(v-if="!btn.cond || btn.cond(scope)" v-on:click="toggle(scope,btn.id)" size="small") {{btn.title}}
</template>

<script type="text/ecmascript-6">
  import {ON_TABLE_TOOLBAR_CLICK} from './event.toml'

  export default {
    props: {
      scope: {
        type: Object
      },
      isFixedColumn: {
        type: Boolean,
        default: false
      },
      btnList: {  // 工具按钮的列表
        type: Array,
        required: false,
        default: () => {
          return [
            {id: 'view', title: '查看', isShow: true},
            {id: 'edit', title: '编辑', isShow: true},
            {id: 'delete', title: '删除', isShow: true}
          ]
        }
      }
    },
    created() {
      console.log(`[kalix] table tool button is `, this.btnList)
    },
    data() {
      return {}
    },
    computed: {
      columnWidth() {
        let width = 65
        let len = this.btnList.length
        let btnWidth = 34
        if (len > 1) {
          width += btnWidth * (len - 1)
        }
        return width
      },
      isFiex() {
        return this.isFixedColumn ? 'right' : this.isFixedColumn
      }
    },
    methods: {
      toggle(row, btnId) { // toolbar click event
        this.$emit(ON_TABLE_TOOLBAR_CLICK, row, btnId)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .table-tool
    text-align right
    .table-tool_btn
      & + .table-tool_btn
        margin-left 12px
</style>
