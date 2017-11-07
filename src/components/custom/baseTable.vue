<template lang="pug">
  div.kalix-base-table
    kalix-base-tool-bar(
    v-on:checkedAll="onCheckedAll"
    v-on:onToolBarClick="onToolBarClick"
    v-bind:toolbarBtnList="toolbarBtnList")
    div.kalix-base-table-wrapper
      template(v-for="(item,index) in tableData")
        div.cell
          div.s-flex.row_header
            div.checkbox-wrapper
              kalix-checkbox(v-model="item.isChecked")
            div.s-flex_item 行号：{{item.rowNumber}}
          slot(name="tableColumnSlot" v-bind:item="item")
          div.row
            kalix-base-table-tool(
            v-bind:btnList="btnList"
            v-on:onTableToolBarClick="btnClick"
            v-bind:scope="item")
        kalix-separate
    component(:is="whichBizDialog" ref="kalixDialog"
    v-bind:formModel="formModel"
    v-bind:formRules="formRules")
    component(:is="bizSearch" ref="bizSearchRef" v-if="bizSearch")
</template>
<script type="text/ecmascript-6">
  import KalixSeparate from 'base/separate'
  import KalixCheckbox from 'base/KalixCheckbox'
  import KalixBaseTableTool from 'components/custom/baseTableTool.vue'
  import KalixBaseToolBar from 'components/custom/baseToolBar.vue'
  import {PageConfig, SecurityBtnUrl} from 'config/global.toml'
  import EventBus from 'common/js/eventbus'
  import {DictKeyValueObject} from 'common/keyValueObject'
  import {
    ON_SEARCH_BUTTON_CLICK,
    ON_REFRESH_DATA,
    ON_OPEN_SEARCH
  } from './event.toml'

  export default {
    props: {
      isFixedColumn: {
        type: Boolean,
        default: false
      },
      toolbarBtnList: {   //  toolBar 中按钮数组
        type: Array,
        default: () => {
          return []
        }
      },
      hasTableSelection: { // 表格是否有选择框
        type: Boolean,
        default: false
      },
      isShowToolBar: { // 是否显示工具栏
        type: Boolean,
        default: true
      },
      dialogOptions: {},
      bizKey: {  // 主鍵
        type: String,
        required: true
      },
      title: {  // 表格组件标题名
        type: String,
        required: true
      },
      buttonPermissionPrefix: { //  table中tool的按钮组件认证前缀
        type: String,
        default: ''   // 为空时候，不校验权限
      },
      bizSearch: {  //  使用的搜索组件名称
        type: String
      },
      bizDialog: {  //  使用的对话框组件名称
        type: Array
      },
      formModel: {  //  新建，查看，编辑使用的 form 对象模型
        type: Object
//        required: true
      },
      formRules: {  //  from 对象验证参数
        type: Object
//        required: true
      },
      targetURL: {  //  列表操作请求的 URL 地址
        type: String
//        required: true
      },
      jsonStr: {  //  数据列表请求的查询条件
        type: String,
        default: ''
      },
      tableFields: {   //  数据列表的列名
        type: Array
      },
      btnList: {   //  table中按钮数组
        type: Array,
        required: true
      },
      dictDefine: {  // 数据字典定义
        type: Array
      },
      customRender: { // 对table的数据进行自定义的修饰
        type: Function
      },
      customTableTool: { // 对table的操作按钮进行自定义的操作
        type: Function
      },
      customToolBar: { // 对 ToolBar 的操作按钮进行自定义的操作
        type: Function
      },
      tableRowClassName: { // 对table的一行数据进行样式定制
        type: Function
      },
      deleteAllUrl: {
        type: String,
        default: ''
      },
      customToolbarClickEvents: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        myFixed: true,
        iconCls: '',
        loading: true,
        tableData: [],
        totalCount: 0,
        whichBizDialog: '', //
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        },
        tableHeight: 0, //  列表组件高度
        searchParam: {} //  列表查询条件
      }
    },
    created() {
      this.getData()
    },
    activated() {
      EventBus.$on(ON_SEARCH_BUTTON_CLICK, this.onSearchClick)
      EventBus.$on(ON_REFRESH_DATA, this.refresh)
      EventBus.$on(ON_OPEN_SEARCH, this.openSearch)
      EventBus.$on(this.bizKey + '-' + 'KalixDialogClose', () => {
//        console.log(`%c[kalix] reset ${this.bizKey} whichBizDialog`, 'background: #222;color: #bada55')
        this.whichBizDialog = ''
      })
    },
    deactivated() {
      console.log(this.bizKey + ' is deactivated')
      EventBus.$off(ON_SEARCH_BUTTON_CLICK)
      EventBus.$off(ON_REFRESH_DATA)
      EventBus.$off(ON_OPEN_SEARCH)
      EventBus.$off(this.bizKey + '-' + 'KalixDialogClose')
    },
    mounted() {
    },
    methods: {
      openSearch() {
        this.$refs.bizSearchRef.$refs.kalixBizSearch.open()
      },
      getData() {
        this.loading = true
        let _data = {
          jsonStr: this.jsonStr,
          page: this.pager.currentPage,
          start: this.pager.start,
          limit: this.pager.limit
        }
        _data = Object.assign(_data, this.searchParam)
        this.$http.get(this.targetURL, {
          params: _data
        }).then(response => {
          this.tableData = response.data.data.map((item, index) => {
            item.rowNumber = index + this.rowNo
            item.isChecked = false
            return item
          })

          if (this.dictDefine) { // 设置数据字典
            this.setDictDefine(this.tableData)
          }
        }).catch(() => {
          this.loading = false
          console.log('this.loading = false', this.tableData.length)
//          this.$router.push({path: '/login'})
        })
        this._validateButton()
      },
      onCheckedAll(flag) {
        this.tableData.map(e => {
          e.isChecked = flag
        })
      },
      btnClick(row, btnId) { // table工具栏点击事件
        console.log('row', row)
        console.log('btnId', btnId)
        switch (btnId) {
          case 'view': {
            let dig = this.bizDialog.filter((item) => {
              return item.id === 'view'
            })
            this.whichBizDialog = dig[0].dialog
            console.log('row', row)
            setTimeout(() => {
//              this.$emit('update:formModel', row)
//              EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, row)
              this.$refs.kalixDialog.$refs.kalixBizDialog.open('查看', false, row)
            }, 20)
            break
          }
          case 'edit': {
            this.whichBizDialog = ''
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'edit'
              })
            console.log('[kalix] edit dialog is: ' + dig[0].dialog)
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
//              this.$emit('update:formModel', row)
//              EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, row)
              this.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
              if (typeof (this.$refs.kalixDialog.init) === 'function') {
                this.$refs.kalixDialog.init(this.dialogOptions)
              }
            }, 20)
            console.log('edit is clicked')
            break
          }
          case 'delete': {
            console.log('delete is clicked')
            this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'DELETE',
                url: this.targetURL + '/' + row.id,
                params: {},
                data: {
                  id: row.id
                }
              })
            }).then(response => {
              this.getData()
//              Message.success(response.data.msg)
            }).catch(() => {
            })
            break
          }
          case 'attachment': {
            console.log('attachment is clicked')
            let that = this
            this.whichBizDialog = 'AttachmentDialog'
            setTimeout(() => {
              that.$refs.kalixDialog.openDialog(row, this.bizKey)
            }, 20)
            break
          }
          default: // 默认转到调用props的方法
            this.customTableTool(row, btnId)
            break
        }
      },
      onAddClick() {
        // 添加按钮点击事件
//        this.whichBizDialog = ''
        let that = this
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'add'
          })
//        console.log(dig[0].dialog)3
        this.whichBizDialog = dig[0].dialog
        console.log('[onAddClick]', dig[0].dialog)
//        this.$emit('update:formModel', {})
        setTimeout(() => {
//          EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, JSON.parse(this.tempFormModel))
          that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            that.$refs.kalixDialog.init(this.dialogOptions)
          }
        }, 20)
      },
      onToolBarClick(btnId) {
        // baseToolBar 回调事件
        switch (btnId) {
          case 'add':
            this.onAddClick()
            break
          case 'refresh':
            this.onRefreshClick()
            break
          default:
            this.customToolBar(btnId)
            break
        }
      },
      /**
       * 发送按钮权限认证
       * @private
       */
      _validateButton() {
        if (this.buttonPermissionPrefix !== '') { // 默认为空不校验
          let _permissionData = []
          this.btnList.map(item => {  // 组成按钮验证字符串
            item.permission = this.buttonPermissionPrefix + item.id
            if (item.isPermission) {  // 判断是否参与校验
              _permissionData.push(this.buttonPermissionPrefix + item.id)
            }
          })
          // 发送按钮验证
          if (_permissionData.length > 0) {
            this.$http.get(`${SecurityBtnUrl}${_permissionData.join('_')}`).then(res => {
              res.data.buttons.forEach(item => {
                let tmp = this.btnList.find(e => {
                  if (e.permission === item.permission) {
                    return e
                  }
                })
                tmp.isShow = true
//                tmp.isShow = item.status  // 根据返回的权限确定按钮是否显示
              })
            })
          }
//          console.log(`[Kalix] table tool button list is `, this.btnList)
        }
      },
      onRefreshClick() { // 刷新按钮点击事件
        this.getData()
      },
      refresh() { // 刷新表格数据
        console.log('[kalix] ' + this.title + ' refresh is trigger!')
        this.getData()
      },
      setDictDefine(_data) { // 处理数据字典
        console.log('[_data]:', _data)
        this.dictDefine.forEach((item) => {
          //  获取 对应的键值对 对象
          let _keyObj = DictKeyValueObject(item.cacheKey, item.type)
          console.log('[kalix]-[baseTable.vue] dict should get key is ', _keyObj)
          _data.forEach(function (e) {
            //  检测 _keyObj 是否存在
            if (_keyObj) {
              // 替换对应的列值
              e[item.targetField] = _keyObj[e[item.sourceField]]
            }
          })
        })
      },
      onSearchClick(_searchParam) { // 查询按钮点击事件
        console.log('查询按钮点击事件 [kalix] base table search clicked')
        this.searchParam = _searchParam
        this.refresh()
      }
    },
    components: {
      KalixBaseTableTool,
      KalixSeparate,
      KalixCheckbox,
      KalixBaseToolBar
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/border"
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .kalix-base-table
    background-color $color-background
    .kalix-base-table-wrapper
      .cell
        font-size $font-size-medium
        line-height 1.3
        .row
          position relative
          padding 8px 12px;
          &:not(:last-child)
            &:after
              setBottomLine()
              left 12px
              right 12px
          .cell-label
            color: $color-text-gray
        .row_header
          position relative
          padding 6px 12px
          align()
          &:after
            setBottomLine()
          .checkbox-wrapper
            position relative
            padding-right 6px
            margin-left -6px
            margin-right 12px
            &:after
              setRightLine()
              top -6px
              bottom -6px

</style>
