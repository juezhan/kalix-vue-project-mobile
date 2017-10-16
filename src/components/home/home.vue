<template lang="pug">
  div.home
    div.item(v-for="item in treeData" v-bind:key="item.id")
      div.s-flex.title(@click="onShowTree(item)")
        div.s-flex_item
          i.icon(:class="item.iconCls")
          |{{item.text}}
        i.mini-icon(:class="{'el-icon-arrow-right':!item.isShow,'el-icon-arrow-down':item.isShow}")
      div.content(v-if="item.isShow")
        ul
          li.cell(v-for="item in item.children" v-bind:key="item.id")
            i.icon(:class="item.iconCls")
            |{{item.text}}

</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import Cache from 'common/cache'
  import {cacheTime, systemApplicationsBaseURL} from 'config/global.toml'

  export default {
    data() {
      return {
        treeData: []
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData(appId) {
        if (this.$route.name === 'login') {
          return
        }
        if (!appId) {
          let toolListData = JSON.parse(Cache.get('toolListData'))
          if (!toolListData) {
            return
          }
        }
        let d = new Date()
        let cd = d.getTime()
        let treeListData = {}
        this.currApp = this.$route.params.app
        this.currFun = this.$route.params.fun || ''
        if (Cache.get('treeListData')) {
          treeListData = JSON.parse(Cache.get('treeListData'))
        }
        if (treeListData.createDate && (treeListData.createDate - cd) < cacheTime && treeListData[this.currApp]) {
          this.treeData = treeListData[this.currApp]
        } else {
          const data = {_dc: cd, node: 'root'}
          Vue.axios({
            url: systemApplicationsBaseURL + this.currApp,
            method: 'get',
            params: data
          }).then(response => {
            console.log('response', response)
            let nowDate = new Date()
            if (response.data && response.data.code !== 401) {
              this.treeData = response.data
              if (this.treeData.length) {
                this.treeData.forEach(function (e, i) {
                  Vue.set(e, 'isShow', false)
                })
                treeListData[this.currApp] = this.treeData
                treeListData.createDate = nowDate.getTime()
                Cache.save('treeListData', JSON.stringify(treeListData))
              }
            }
          })
        }
      },
      onShowTree(item) {
        item.isShow = !item.isShow
      }
    },
    components: {}
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  .home
    .item
      position relative
      padding 8px 12px
      &:after
        setBottomLine()
      .title
        font-size 16px
        line-height 34px
        .icon
          font-size 30px
          margin-right 12px
      .mini-icon
        font-size 10px
      .content
        padding-left 42px
        .cell
          line-height 30px
          .icon
            font-size 24px
            margin-right 12px

</style>
