/**
 * @Description: 字典数据管理 -> 字典数据详情 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 09:51:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-13 13:51:25
 * @FilePath: \web\src\assets\js\option\DataTypeDetails.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
export default (safe) => {
  // console.log(safe) // vue的this对象
  return {
    saveBtnIcon: "el-icon-check",
    updateBtnIcon: "el-icon-check",
    cancelBtnIcon: "el-icon-close",
    filterDic: true, // 过滤数据字典，设置为true返回的对象不会包含$前缀的字典翻译,
    filterNull: false, // 过滤空数据，设置为true返回的对象不会包含空数据的字段
    rowKey: "id",
    height: 520,
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
    addBtnText: "新增字典项",
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
    addTitle: "新增字典项",
    editTitle: "编辑字典项",
    viewTitle: "查看字典项",
    updateBtnText: '保存',
    saveBtnText: '保存',
    cancelBtnText: '取消',
    // cellBtn: true,// 设置为true则开启行编辑按钮
    labelPosition: "top",
    dialogCustomClass: "w620",
    column: [
      {
        value: parseInt(safe.$route.query.id),
        prop: "dictTypeId",
        display: false,
        hide: true,
      },
      {
        label: "",
        placeholder: "字典标签/字典值",
        prop: "keyword",
        suffixIcon: 'my-icon-search',
        hide: true,
        display: false,
        search: true,
        searchLabel: "",
        searchLabelWidth: "0",
        searchSpan: 6,
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
        label: "字典标签",
        placeholder: "请填写字典标签(如：中共党员)",
        prop: "dictLabel",
        type: "input",
        maxlength: 30,
        showWordLimit: true,
        width: 100,
        span: 24,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请填写",
            trigger: "blur",
          },
        ],
      },
      {
        label: "字典值",
        placeholder: "请填写字典值(如：1)",
        prop: "dictValue",
        type: "input",
        maxlength: 30,
        showWordLimit: true,
        width: 100,
        span: 24,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请填写",
            trigger: "blur",
          },
        ],
      },
      {
        value: 1,
        label: "排序",
        placeholder: "请填写排序",
        prop: "sort",
        type: "number",
        width: "",
        span: 24,
        overHidden: false,
        min: 0,
        max: 9999,
        hide: true,
        className: "w200", // 自定义类名
        display: false,
      },
      {
        label: "备注",
        placeholder: "请填写备注",
        prop: "remark",
        type: "textarea",
        width: "",
        span: 24,
        maxlength: 255,
        showWordLimit: true,
        minRows: 3,
        maxRows: 5,
        overHidden: false,
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