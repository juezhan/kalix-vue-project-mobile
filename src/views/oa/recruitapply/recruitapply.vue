<!--
描述：办公自动化-用人申请
开发人：hqj
开发日期：2017年10月23日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='recruitApply' title='用人申请列表' v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog' bizSearch='OaRecruitApplySearch' v-bind:btnList='btnList'
      v-bind:isFixedColumn="isFixedColumn" v-bind:customTableTool="customTableTool"
      v-bind:dictDefine="dictDefine")
        template(slot="tableColumnSlot" slot-scope="scope")
          kalix-table-row(label="名称" v-bind:prop="scope.item.title")
          kalix-table-row(label="申请部门" v-bind:prop="scope.item.orgName")
          kalix-table-row(label="申请时间" v-bind:prop="scope.item.applyDate")
          kalix-table-row(label="用工原因" v-bind:prop="scope.item.reasonName")
          kalix-table-row(label="职位名称" v-bind:prop="scope.item.positionName")
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {RecruitApplyURL, RecruitApplyComponent, RecruitApplyStartURL} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'
  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import TaskView from '@/views/oa/comp/taskView'

  // 注册全局组件
  registerComponent(RecruitApplyComponent)

  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'OA-DICT-KEY',
          type: '招聘需求原因',
          targetField: 'reasonName',
          sourceField: 'reason'
        }],
        isFixedColumn: true,
        hasTableSelection: true,
        btnList: workflowBtnList,
        targetURL: RecruitApplyURL,
        bizDialog: [
          {id: 'view', dialog: 'OaRecruitApplyView'},
          {id: 'edit', dialog: 'OaRecruitApplyAdd'},
          {id: 'add', dialog: 'OaRecruitApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'}
        ]
      }
    },
    components: {
      BaseTable,
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn,
      KalixProcessStatusColumn: ProcessStatusColumn, // 工作流状态列
      KalixTaskView: TaskView
    },
    created() {
    },
    mounted() {
      registerComp()
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId, RecruitApplyStartURL, this)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
