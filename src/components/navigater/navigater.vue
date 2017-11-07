<template lang="pug">
  div.navigater
    kalix-header(:title="title")
    div.item(v-for="item in treeData" v-bind:key="item.id")
      div.s-flex.category(@click="onShowTree(item)")
        div.s-flex_item.title {{item.text}}
        i.icon(:class="item.iconCls")
      div.cells
        div.s-flex.cell(v-for="item in item.children" v-bind:key="item.id")
          div.s-flex_item.title(v-on:click="selectItem(item)")
            i.icon(:class="item.iconCls")
            | {{item.text}}
          i.arrow.el-icon-arrow-right
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import Cache from 'common/cache'
  import KalixHeader from 'base/KalixHeader'
  import {cacheTime, systemApplicationsBaseURL} from 'config/global.toml'

  export default {
    data() {
      return {
        title: '',
        currApp: '',
        treeData: []
      }
    },
    mounted() {
      this.fetchData()
    },
    watch: {'$route': 'fetchData'},
    methods: {
      fetchData() {
        if (this.$route.name === 'login') {
          return
        }
        let toolListData = JSON.parse(Cache.get('toolListData'))
        if (!toolListData) {
          return
        }
        let d = new Date()
        let cd = d.getTime()
        let treeListData = {}
        this.currApp = this.$route.params.app
        let toolItem = toolListData.find(item => {
          return item.id === this.currApp
        })
        if (toolItem) {
          this.title = toolItem.text
        }
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
      },
      selectItem(item) {
        this.$router.push({path: `/${this.currApp}/${item.routeId.split('/').pop()}`})
        Cache.save('currentTreeListItem', JSON.stringify(item))
      }
    },
    components: {
      KalixHeader
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .navigater
    padding-top 46px
    .item
      position relative
      &:after
        setBottomLine()
      &:last-child
        &:after
          visibility hidden
      .category
        position relative
        padding 8px 12px
        background-color $color-background-c
        &:after
          setBottomLine()
        .title
          font-size 14px
          line-height 34px
        .icon
          font-size 30px
          margin 0
        .mini-icon
          font-size 10px
      .cells
        padding-left 42px
        .cell
          position relative
          padding 8px 0
          line-height 32px
          align()
          &:after
            setBottomLine()
          &:last-child
            &:after
              visibility hidden
          .title
            font-size 16px
            .icon
              font-size 24px
              margin-right 12px
          .arrow
            font-size 12px
            margin-right 12px

</style>
