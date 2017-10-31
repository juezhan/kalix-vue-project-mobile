<template lang="pug">
  x-header.kalix-header
    template(slot="overwrite-left")
      slot(name="left")
        div.overwrite-left
          flexbox(v-on:click.native="onGoBack()")
            x-icon(type="ios-arrow-left" size="24" style="fill:#ffffff")
            div.text {{leftText}}
    template(slot="overwrite-title")
      div.overwrite-title {{title}}
    template(slot="right")
      flexbox.overwrite-right
        slot(name="right")
          div.text {{rightText}}
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        default: ''
      },
      leftIcon: {
        default: 'ios-arrow-left'
      },
      leftText: {
        default: '返回'
      },
      rightText: {
        default: ''
      }
    },
    methods: {
      onGoBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .kalix-header
    position fixed
    top 0
    left 0
    width 100%
    z-index 9
    .overwrite-left,
    .overwrite-right
      position relative
      top -3px
    .overwrite-left
      left -12px
      .text
        margin-left 0 !important
    .overwrite-title
      line-height 40px
      text-align center
      color #ffffff
</style>
