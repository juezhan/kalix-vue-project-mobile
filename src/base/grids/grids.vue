<template>
  <div class="grids">
    <router-link :tag="tag" :to="{path:'/'+item.id}" :key="index" class="grids-item"
                 v-for="(item,index) in dataSource">
      <div class="grids-item-wrapper">
        <div class="grids-item-content">
          <slot :item="item"></slot>
        </div>
      </div>
    </router-link>
    <div class="grids-item" v-for="(item,index) in data">
      <div class="grids-item-wrapper">
        <div class="grids-item-content"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    props: {
      tag: {
        default: 'div'
      },
      dataSource: Array
    },
    data() {
      return {
        data: []
      }
    },
    mounted() {
      this.setDateSource()
    },
    methods: {
      setDateSource() {
        let n = this.dataSource.length % 3
        if (n !== 0) {
          for (let i = 0; i < (3 - n); i++) {
            this.data.push({})
          }
        }
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  .grids
    font-size 0
    .grids-item
      position relative
      width 33.33333%
      display inline-block
      font-size 0
      line-height 0
      &:first-child
        &:before
          setTopLine()
          right -200%
      &:nth-child(3n+1)
        &:after
          setBottomLine()
          right -200%
      &:nth-child(3n)
        .grids-item-wrapper
          &:after
            visibility hidden
      .grids-item-wrapper
        padding-top 100%
        font-size 0
        position relative
        &:after
          setRightLine()
        .grids-item-content
          position absolute
          top 0
          left 0
          height 100%
          width 100%
          line-height 1
          text-align center
          font-size 12px
          color $color-text
          display flex
          justify-content center
          align-items center

</style>
