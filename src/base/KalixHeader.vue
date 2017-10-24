<template lang="pug">
  mt-header.kalix-header(:title="title")
    mt-button(icon="back" slot="left" v-on:click="onGoBack")
    template(slot="right")
      slot(name="right")
        mt-button(icon="more")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
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
</style>
