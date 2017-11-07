<template lang="pug">
  div.home
    kalix-header(:title="title")
      x-icon(slot="right" type="ios-search-strong"
      v-on:click.native="onClickSearch"
      size="24" style="fill:#ffffff")
    component(:is="which_to_show")
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import KalixHeader from 'base/KalixHeader'
  import Welcome from '@/views/admin/welcome'
  import EventBus from 'common/js/eventbus'

  const _import = require('@/api/_import_' + process.env.NODE_ENV)
  let content = {
    Welcome
  }

  export default {
    data() {
      return {
        title: '',
        which_to_show: 'Welcome'
      }
    },
    mounted() {
      this.fetchData()
    },
    watch: {
      $route(to) {
        console.log('to', arguments)
        this.fetchData()
      }
    },
    methods: {
      fetchData() {
        console.log('fetchData', this.$route)
        if (this.$route.name === 'login') {
          return
        }
        let currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
        this.title = currentTreeListItem.text

        let app = this.$route.params.app // 应用名称
        let fun = this.$route.params.fun // 功能名称
        console.log('app:', app)
        console.log('fun:', fun)
        console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
        if (fun !== undefined) {
          this.which_to_show = _import(`${app}/${fun.toLowerCase()}/${fun.toLowerCase()}`)
          console.log('this.which_to_show:', `${app}/${fun.toLowerCase()}/${fun.toLowerCase()}`)
        } else {
          this.which_to_show = (content[fun]) ? fun : 'Welcome'
        }
      },
      onClickSearch() {
        EventBus.$emit('onOpenSearch')
      }
    },
    components: {
      KalixHeader,
      Welcome,
      KalixContent: content
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  @import "~common/stylus/variable"
  .home
    padding-top 46px
    background-color $color-border-b
</style>
