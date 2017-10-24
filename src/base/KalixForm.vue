<template lang="pug">
  div.kalix-form
    slot
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      labelWidth: {
        type: String
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  .kalix-form
    position relative
    &:before
      setTopLine()
    &:after
      setBottomLine()
</style>
