<template lang="pug">
  div.s-flex.row
    div.cell-label {{label}}：
    div.s-flex_item {{prop}}
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      label: {
        type: String
      },
      prop: {
        type: String
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
