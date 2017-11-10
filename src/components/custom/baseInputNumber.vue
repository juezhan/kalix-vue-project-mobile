<template lang="pug">
  div.kalix-input_number
    div.kalix-number-button(v-on:click="onUpdateValue(false)")
      x-icon.kalix-number-round(type="ios-minus-outline" size="24")
    div.kalix-number-value {{currentValue}}
    div.kalix-number-button(v-on:click="onUpdateValue(true)")
      x-icon.kalix-number-round(type="ios-plus-outline" size="24")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      value: {
        type: [Number, null],
        default: 0
      },
      min: {
        type: [Number],
        default: 0
      },
      max: {
        type: [Number],
        default: 100
      }
    },
    data() {
      return {
        currentValue: this.value || 0
      }
    },
    methods: {
      onUpdateValue(flag) {
        if (flag) {
//          增加
          this.currentValue += 1
          if (this.currentValue > this.max) {
            this.currentValue = this.max
          }
        } else {
//          减少
          this.currentValue -= 1
          if (this.currentValue < this.min) {
            this.currentValue = this.min
          }
        }
      }
    },
    watch: {
      currentValue(val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .kalix-input_number
    margin 0 12px
    float right
    display flex
    align-items center
    .kalix-number-button
      display inline-block
      padding 6px
      font-size 0
      line-height 0
      .kalix-number-round
        fill #999999
    .kalix-number-value
      flex 1
      text-align center
      padding 0 12px
      width 20px
      height 40px

</style>
