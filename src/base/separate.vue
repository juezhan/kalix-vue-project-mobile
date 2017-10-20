<template>
  <div class="separate"></div>
</template>
<script type="text/ecmascript-6">
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  @import "~common/stylus/variable"
  .separate
    position relative
    width 100%
    height 8px
    font-size 0
    line-height 0
    background-color $color-border-b
    &:before
      setTopLine()
    &:after
      setBottomLine()
</style>
