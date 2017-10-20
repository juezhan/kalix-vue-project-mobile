<!--
描述：我的首页-公司新闻组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div
    div(v-for="item in tableData")
      div
        div.s-flax
          div 行号 {{item.rowNumber}}
          div {{item.title}}
        div {{item.content}}
        div creationDate：{{item.creationDate}}
      kalix-base-table-tool
</template>

<script type="text/ecmascript-6">
  import {PageConfig} from 'config/global.toml'
  import {NewsURL} from '../config.toml'
  import KalixBaseTableTool from '../../../components/custom/baseTableTool.vue'

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
        searchParam: {} //  列表查询条件
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
//        let that = this
//        console.log('baseTable', 'getData')
        this.loading = true
        let _data = {
          jsonStr: this.jsonStr,
          page: this.pager.currentPage,
          start: this.pager.start,
          limit: this.pager.limit
        }
        _data = Object.assign(_data, this.searchParam)
        this.$http.get(NewsURL, {
          params: _data
        }).then(response => {
          this.tableData = response.data.data.map((item, index) => {
            item.rowNumber = index + this.rowNo
            return item
          })
        }).catch(() => {
          this.loading = false
          console.log('this.loading = false', this.tableData.length)
        })
      }
    },
    components: {
      KalixBaseTableTool
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
