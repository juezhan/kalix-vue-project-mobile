<template lang="pug">
  div.welcome
    kalix-header
    kalix-grids(v-if="menuList.length" v-bind:data-source="menuList")
      template(slot-scope="scope")
        div.grids-item-content
          router-link(tag="div" v-bind:to="{path:'/'+scope.item.id}")
            i.icon(v-bind:class="scope.item.iconCls")
            div.text {{scope.item.text}}
    div(v-else) 没有模块
</template>
<script type="text/ecmascript-6">
  import KalixHeader from 'components/m-header/m-header'
  import Cookie from 'js-cookie'
  import Cache from 'common/cache'
  import {applicationURL} from 'config/global.toml'
  import {isEmptyObject} from 'common/util'
  import Grids from 'base/grids/grids.vue'

  export default {
    data() {
      return {
        menuList: []
      }
    },
    mounted() {
      this.fetchData()
    },
    watch: {'$route': 'fetchData'},
    methods: {
      fetchData() {
        let d = new Date()
        let cd = d.getTime()
        let toolListData = []
        if (Cache.get('toolListData')) {
          toolListData = JSON.parse(Cache.get('toolListData'))
        }
        if (!isEmptyObject(toolListData)) {
          this.menuList = toolListData
        } else {
          const data = {
            jsonStr: '{"supportMobile":true}',
            _dc: cd,
            page: 1,
            start: 0,
            limit: 25
          }
          this.$http.get(applicationURL, {
            params: data
          }).then(response => {
            if (response && response.data) {
              toolListData = response.data.filter(item => {
                return item.supportMobile
              })
              this.menuList = toolListData
              Cache.save('toolListData', JSON.stringify(toolListData))
            }
          })
        }
        if (this.isPollMsg) {
          this.pollMsg()
        }
        this.icon = this.decode(Cookie.get('currentUserIcon')) // 如果为null，则取默认的图标
        if (this.icon === 'null') {
          this.icon = ''
        }
      },
      decode(s) {
        if (s) {
          return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'))
        }
        return 'null'
      }
    },
    components: {
      KalixGrids: Grids,
      KalixHeader
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .welcome
    .icon
      font-size 36px
      margin 0
    .text
      font-size 14px
      margin-top 8px
</style>
