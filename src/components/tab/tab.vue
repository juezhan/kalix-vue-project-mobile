<template>
  <div class="tab">
    <router-link v-for="item in menuList" :key="item" tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">{{item.text}}</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cookie from 'js-cookie'
  import Cache from 'common/cache'
  import {applicationURL} from 'config/global.toml'
  import {isEmptyObject} from 'common/util'

  export default {
    data() {
      return {
        menuList: []
      }
    },
    mounted() {
      this.initMenu()
    },
    methods: {
      initMenu() {
        let d = new Date()
        let cd = d.getTime()
        let toolListData = {}
        if (Cache.get('toolListData')) {
          toolListData = JSON.parse(Cache.get('toolListData'))
        }
        if (!isEmptyObject(toolListData)) {
          this.menuList = toolListData
        } else {
          const data = {
            _dc: cd,
            page: 1,
            start: 0,
            limit: 25
          }
          this.$http.get(applicationURL, {
            params: data
          }).then(response => {
            if (response && response.data) {
              this.menuList = response.data
              toolListData.data = this.menuList
              Cache.save('toolListData', JSON.stringify(toolListData.data))
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
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
