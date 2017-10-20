<template lang="pug">
  div
    kalix-base-tool-bar
    template(v-for="(item,index) in tableData")
      div.cell
        div.s-flex.row_header
          div.checkbox-wrapper
            kalix-checkbox(v-model="item.isChecked")
          div.s-flex_item 行号：{{item.rowNumber}}
        div.s-flex.row
          div 标题：
          div.s-flex_item {{item.title}}
        div.s-flex.row
          div 主题：
          div.s-flex_item {{item.content}}
        div.s-flex.row
          div 收件时间：
          div.s-flex_item {{item.creationDate}}
        div.row
          kalix-base-table-tool
      kalix-separate

</template>
<script type="text/ecmascript-6">
  import KalixSeparate from 'base/separate'
  import KalixCheckbox from 'base/KalixCheckbox'
  import KalixBaseTableTool from 'components/custom/baseTableTool.vue'
  import KalixBaseToolBar from 'components/custom/baseToolBar.vue'
  import {ReceiverURL} from '../config.toml'
  import {PageConfig} from 'config/global.toml'

  export default {
    data() {
      return {
        tableData: [],
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        },
        jsonStr: '',
        searchParam: {}, //  列表查询条件
        sheetVisible: false,
        actions: [
          {
            name: '新建',
            method: this.showToast
          }, {
            name: '删除',
            method: this.showMsgbox
          }
        ]
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        let _data = {
          jsonStr: this.jsonStr,
          page: this.pager.currentPage,
          start: this.pager.start,
          limit: this.pager.limit
        }
        _data = Object.assign(_data, this.searchParam)
        this.$http.get(ReceiverURL, {
          params: _data
        }).then(response => {
          this.tableData = response.data.data.map((item, index) => {
            item.rowNumber = index + this.rowNo
            item.isChecked = false
            return item
          })
        }).catch(() => {
          this.loading = false
          console.log('this.loading = false', this.tableData.length)
        })
      }
    },
    components: {
      KalixBaseTableTool,
      KalixSeparate,
      KalixCheckbox,
      KalixBaseToolBar
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    }
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
