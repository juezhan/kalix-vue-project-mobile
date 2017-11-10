<!--
描述：办公自动化-用人申请-新增组件
开发人：hqj
开发日期：2017年10月23日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="recruitApply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.kalix-gulp(slot="dialogFormSlot")
      div.kalix-cells
        div.kalix-cell
          el-form-item(label="名称" v-bind:label-width="labelWidth" prop="title" v-bind:rules="rules.title")
            el-input(v-model="formModel.title")
        div.kalix-cell
          el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgId" v-bind:rules="rules.orgId" v-bind:label-width="labelWidth")
            <!--kalix-org-select(v-model="formModel.orgId" v-on:selectChange="onOrgIdChange")-->
            popup-picker(title="" v-bind:data="list1"
            v-model="value1"
            v-on:on-show="onShow"
            v-on:on-hide="onHide"
            v-on:on-change="onChange" placeholder="请选择申请部门")
        div.kalix-cell
          el-form-item.s-flex_item.kalix-form-table-td(label="申请事由" prop="reason" v-bind:label-width="labelWidth")
            kalix-dict-select(v-model="formModel.reason" appName="oa" dictType="招聘需求原因" style="width:100%")
        div.kalix-cell
          el-form-item.s-flex_item.kalix-form-table-td(label="职位名称" prop="positionName" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.positionName")
        div.kalix-cell
          el-form-item.kalix-form-table-td(label="拟聘人数"
          prop="recruitCount"
          v-bind:label-width="labelWidth")
            kalix-input-number(v-model="formModel.recruitCount")
        div.kalix-cell
          el-form-item.kalix-form-table-td(label="定编人数" prop="allocationCount" v-bind:label-width="labelWidth")
            kalix-input-number(v-model="formModel.allocationCount")
        div.kalix-cell
          el-form-item.kalix-form-table-td(label="现有人数" prop="existCount" v-bind:label-width="labelWidth")
            kalix-input-number(v-model="formModel.existCount")
        div.kalix-cell
          el-form-item(label="核心职责" prop="coreRecruit" v-bind:label-width="labelWidth")
            el-input(type="textarea" v-model="formModel.coreRecruit" v-bind:rows="4" placeholder="请输入")
        div.kalix-cell
          el-form-item(label="常规职责" prop="commonRecruit" v-bind:label-width="labelWidth")
            el-input(type="textarea" v-model="formModel.commonRecruit" v-bind:rows="4" placeholder="请输入")
        div.kalix-cell
          el-form-item(label="任职基本条件" prop="baseCondition" v-bind:label-width="labelWidth")
            el-input(type="textarea" v-model="formModel.baseCondition" v-bind:rows="4" placeholder="请输入")
        div.kalix-cell
          el-form-item.s-flex_item.kalix-form-table-td(label="待遇标准" prop="treatmentLevel" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.treatmentLevel")
        div.kalix-cell
          el-form-item.s-flex_item.kalix-form-table-td(label="建议招聘方式" prop="recruitType" v-bind:label-width="labelWidth")
            kalix-dict-select(v-model="formModel.recruitType" appName="oa" dictType="招聘方式" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {RecruitApplyURL} from '../config.toml'
  import Cache from 'common/cache'
  import Dialog from '@/components/custom/baseDialog.vue'
  import KalixInputNumber from '@/components/custom/baseInputNumber.vue'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import BaseDictSelect from '@/components/custom/baseDictSelect'

  export default {
    data() {
      return {
        value1: [],
        list1: [
          ['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']
        ],
        formModel: Object.assign({}, FormModel),
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'}],
          orgId: [{type: 'number', required: true, message: '请选择申请部门', trigger: 'change'}]
        },
        targetURL: RecruitApplyURL,
        labelWidth: '110px',
        orgNameOptions: []
      }
    },
    components: {
      KalixInputNumber,
      KalixDialog: Dialog,
      KalixOrgSelect: UserOrgSelect,
      KalixDictSelect: BaseDictSelect
    },
    created() {
      this.orgNameOptions = JSON.parse(Cache.get(`${'UserOrgs'.toUpperCase()}-KEY`))
    },
    methods: {
      onOrgIdChange(item) {
        this.formModel.orgName = item.name
      },
      onChange(val) {
        console.log('val change', val)
      },
      onShow() {
        console.log('on show')
      },
      onHide(type) {
        console.log('on hide', type)
      }
    }
  }
</script>
