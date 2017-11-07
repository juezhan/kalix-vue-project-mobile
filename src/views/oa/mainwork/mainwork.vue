<template lang="pug">
  div.mainwork
    group.mainwork-item(v-for="item in workList" v-bind:key="item.id")
      group-title.mainwork-item-title(slot="title")
        i.x-title-icon.x-title-icon-default-framed.title_icon(v-bind:class="item.icon")
        span.title_text {{item.name}}
      div.mainwork-item-wrapper
        cell-box(class="s-flex text mainwork-item"
        v-if="item.details" v-for="itemDetails in item.details" v-bind:key="item.name")
          div.s-flex_item
            div.details-name {{itemDetails.name}}
            div.details-description {{itemDetails.description}}
          div(v-if="itemDetails.name!=='暂无数据'")
            el-button(size="mini" v-on:click="onViewClick(itemDetails.name,itemDetails.processId)") 查看
            el-button(size="mini" v-on:click="onApplyClick(itemDetails.key)") 申请
    process-definition-view(ref="kalixDialog")
</template>
<script type="text/ecmascript-6">
  import {WorkflowMainWorkURL} from '../config.toml'
  import {ON_INIT_DIALOG_DATA} from '@/components/custom/event.toml'
  import EventBus from 'common/js/eventbus'
  import ProcessDefinitionView from '@/views/oa/comp/processDefinitionView'

  let _data = {
    page: 1,
    start: 0,
    limit: 200
  }
  export default {
    data() {
      return {
        workList: [],
        bizKey: 'processDefinition'
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      onApplyClick(_key) {
        this.$router.push({path: `/oa/${_key}`})
      },
      onViewClick(_name, _id) {
        let row = {
          name: _name,
          id: _id
        }
        EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, row)
        this.$refs.kalixDialog.$refs.kalixBizDialog.open('查看')
      },
      getData() {
        this.axios.get(WorkflowMainWorkURL, {
          params: _data
        }).then(response => {
          this.mainWorkList = response.data
          this.mainWorkListMax = this.mainWorkList.length - 1
          this.getDetails(0)
        })
      },
      getDetails(i) {
        let detailURL = '/camel/rest/categorys/getType?category='
        this.axios.get(detailURL + this.mainWorkList[i].key, {
          params: _data
        }).then(res => {
          this.mainWorkList[i].details = res.data.data
          if (i < this.mainWorkListMax) {
            this.getDetails(++i)
          } else {
            this.workList = this.mainWorkList
          }
        })
      }
    },
    components: {
      ProcessDefinitionView
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable"
  .mainwork
    .mainwork-item-title
      line-height 20px
      .title_icon
        font-size 18px
        margin-right 10px
        float left
      .title_text
        font-size 16px
    .mainwork-item-wrapper
      .details-name
        font-size 14px
        font-weight bold
      .details-description
        font-size 12px
        margin-top 5px
        color: $color-dialog-background
</style>
