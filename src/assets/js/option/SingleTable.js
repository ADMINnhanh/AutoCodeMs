/**
 * @Description: 表的列表 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 09:51:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-14 16:02:57
 * @FilePath: \web\src\assets\js\option\SingleTable.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
import rulesUtils from "@/utils/rules";
export default (safe) => {
  // console.log(safe) // vue的this对象
  return {
    saveBtnIcon: "el-icon-check",
    updateBtnIcon: "el-icon-check",
    cancelBtnIcon: "el-icon-close",
    rowKey: "id",
    height: 460,
    stripe: true,
    border: true,
    header: true,
    selection: true,
    selectionFixed: false,
    reserveSelection: true,
    tip: true,
    index: true,
    indexFixed: false,
    indexLabel: "序号",
    align: "center",
    filterDic: true,
    filterNull: false,
    menuAlign: "center",
    searchBtnText: "查询",
    searchBtnIcon: "el-icon-search",
    emptyBtnText: "重置",
    emptyBtnIcon: "el-icon-brush",
    searchLabelWidth: 0,
    searchFilterDic: true,
    searchFilterNull: true,
    searchIndex: 2,
    searchShowBtn: true,
    searchIcon: true,
    searchMenuSpan: 4,
    // dateBtn: true,
    // excelBtn: true,
    copyBtn: true,
    columnBtn: false,
    dialogDrag: true,
    // menuType: "menu",// 合并菜单
    menu: true,
    menuWidth: 210,
    menuFixed: "right",
    menuAlign: "center",
    menuHeaderAlign: "center",
    addBtn: true,
    addBtnText: "新增表",
    addBtnIcon: "el-icon-plus",
    viewBtn: false,
    viewBtnText: "查看",
    viewBtnIcon: "el-icon-view",
    editBtn: true,
    editBtnText: "编辑",
    editBtnIcon: "el-icon-edit",
    delBtn: true,
    delBtnText: "删除",
    delBtnIcon: "el-icon-delete",
    addTitle: "新增表",
    editTitle: "编辑表",
    viewTitle: "查看表",
    updateBtnText: '保存',
    saveBtnText: '保存',
    cancelBtnText: '取消',
    // cellBtn: true,// 设置为true则开启行编辑按钮
    labelPosition: "top",
    dialogCustomClass: "w620",
    column: [
      // {
      //   component: 'el-alert',
      //   labelWidth: '0px',
      //   span: 24,
      //   params: {
      //     title: '',
      //     description: '表名不允许重复，请修改表名！',
      //     type: 'warning',
      //     center: true,
      //     closable: true,
      //   },
      //   prop: '',
      //   hide: true,
      //   editDisplay: false,
      //   addDisplay: safe.isCopy,
      //   viewDisplay: false,
      // },
      {
        label: "",
        placeholder: "表名称/表备注",
        prop: "keyword",
        suffixIcon: 'my-icon-search',
        hide: true,
        display: false,
        search: true,
        searchLabel: "",
        searchLabelWidth: "0",
        searchSpan: 6,
        // searchOffset: 6,
        searchOffset: 14,
        blur: ({ value, column }) => {
          safe.initList();
        },
        change: ({ value, column }) => {
          // 监听clear事件
          if (!value) {
            safe.initList();
          }
        },
        type: 'search',
        appendClick: () => {
          safe.initList();
        },
      },
      {
        value: parseInt(safe.$route.query.id),
        label: "项目",
        placeholder: "请选择项目",
        prop: "projectId",
        type: "select",
        filterable: true,
        width: 214,
        span: 24,
        overHidden: true,
        dataType: "number",
        props: {
          label: "name",
          value: "id",
          desc: "desc",
        },
        dicData: [],
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        // search: true,
        search: false,
        searchValue: 1,
        searchLabel: "",
        searchPlaceholder: "选择项目",
        searchLabelWidth: "0",
        // searchSpan: 4,
        searchOffset: 0,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
        hide: true,
      },
      {
        value: safe.$route.query.prefix || '',
        label: "表名",
        placeholder: "请填写表名",
        prop: "name",
        type: "input",
        width: 150,
        span: 24,
        overHidden: true,
        rules: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              rulesUtils.tableNameStandard(rule, value, callback)
            },
            trigger: "blur"
          },
          {
            validator: function (rule, value, callback) {
              rulesUtils.byAPIDuplicationName(
                rule, value, callback,
                Object.assign(safe, { dialogDataId: safe.editorFormObj.id }),
                {
                  url: `${safe.$common.basePath}/table/getList`,
                  method: "post",
                  data: {
                    keyword: "",
                    projectId: parseInt(safe.$route.query.id),
                  },
                  hideLoading: true,
                },
              )
            },
            trigger: "blur"
          }
        ],
        tip: rulesUtils.tableNameStandardTip,
        tipPlacement: rulesUtils.tipPlacement,
      },
      {
        label: "表备注",
        placeholder: "请填写表备注",
        prop: "notes",
        type: "textarea",
        width: "",
        span: 24,
        showWordLimit: true, // 字数限制
        maxlength: 255,
        showWordLimit: true,
        minRows: 3,
        maxRows: 5,
        overHidden: true,
      },
      {
        // value: [],
        label: "默认字段",
        placeholder: "请选择表的默认字段",
        type: "checkbox",
        prop: "defaultFieldIds",
        span: 24,
        all: true,
        rules: [
          {
            required: false,
            message: "请选择",
            trigger: "blur",
          },
        ],
        dataType: "array",
        props: {
          label: "name",
          value: "id",
          desc: "desc",
        },
        dicData: [],
        hide: true,
        editDisplay: false,
        addDisplay: true,
        viewDisplay: false,
      },
      {
        sortable: true,
        label: "字段统计",
        prop: "fieldCount",
        type: "number",
        width: "120",
        display: false,
      },
      {
        label: "创建人",
        placeholder: "",
        prop: "createBy",
        type: "input",
        width: 120,
        span: 12,
        overHidden: false,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
      },
      {
        sortable: true,
        label: "创建时间",
        placeholder: "",
        prop: "createTime",
        type: "input",
        width: 150,
        span: 12,
        overHidden: false,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
      },
      {
        label: "更新人",
        placeholder: "",
        prop: "updateBy",
        type: "input",
        width: 120,
        span: 12,
        overHidden: false,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
      },
      {
        sortable: true,
        label: "更新时间",
        placeholder: "",
        prop: "updateTime",
        type: "input",
        width: 150,
        span: 12,
        overHidden: false,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
      },
    ],
    defaultSort: {
      prop: 'createTime',// 排序的字段
      order: 'descending'// ascending 表示升序，descending 表示降序
    },
  }
}