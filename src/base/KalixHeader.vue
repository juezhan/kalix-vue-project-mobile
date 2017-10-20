<template lang="pug">
  mt-header(:title="title")
    mt-button(icon="back" slot="left" v-on:click="onGoBack")
    mt-button(icon="more" slot="right")
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
</style>
