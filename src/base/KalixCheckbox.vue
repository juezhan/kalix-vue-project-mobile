<template lang="pug">
  div.kalix-checkbox(v-on:click="onClick")
    i.kalix-mobile-iconfont(v-bind:class="{'kalix-mobile-icon-xuanzhong active':currentValue,'kalix-mobile-icon-xuanzhong1':!currentValue}")
    span.kalix-checkbox-text(v-if="text") {{text}}
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      value: {
        default: false
      },
      text: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    methods: {
      onClick() {
        this.currentValue = !this.currentValue
        this.$emit('input', this.currentValue)
      }
    },
    watch: {
      value(newValue) {
        this.currentValue = newValue
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable"
  .kalix-checkbox
    display inline-block
    padding 6px
    .kalix-mobile-iconfont
      font-size 12px
      &.active
        color #26a2ff
    .kalix-checkbox-text
      font-size 14px
      margin-left 8px
</style>
