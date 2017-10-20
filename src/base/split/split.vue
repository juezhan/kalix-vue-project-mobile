<template lang="pug">
  div.split
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  @import "~common/stylus/variable"
  .split
    position relative
    background-color $color-background-c
    &:before
      setTopLine()
    &:after
      setBottomLine()

</style>
