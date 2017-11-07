<!--
描述：办公自动化-工作流状态统一封装的组件 用于table的列显示
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div
</template>

<script type="text/ecmascript-6">
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'danger',
          1: 'warning',
          2: 'success'
        }
        return statusMap[status]
      },
      dictFilter(value) {
        const valueMap = {
          2: '已结束',
          1: '处理中',
          0: '未申请'
        }
        return valueMap[value]
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
