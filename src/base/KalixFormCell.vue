<template lang="pug">
  div.kalix-form-cell
    div.kalix-form-cell__hd
      div.label(v-bind:style="labelStyle") {{label}}
    div.kalix-form-cell__bd
      slot
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: String
      }
    },
    created() {
    },
    computed: {
      labelStyle() {
        let styleObj = {}
        let _labelWidth = this.$parent._props.labelWidth || this.labelWidth
        if (_labelWidth) {
          styleObj.width = _labelWidth + 'px'
        }
        return styleObj
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .kalix-form-cell
    position relative
    padding 8px 12px
    display flex
    &:not(:first-child)
      &:before
        setTopLine()
        left 12px
    .kalix-form-cell__hd
      margin 0
      .label
        color: $color-text-gray
    .kalix-form-cell__bd
      flex 1
</style>
