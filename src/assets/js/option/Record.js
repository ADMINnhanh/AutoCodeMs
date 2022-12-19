/**
 * @Description: 生成记录列表 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 09:51:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-13 14:22:51
 * @FilePath: \web\src\assets\js\option\Record.js
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
    copyBtn: false,
    columnBtn: false,
    dialogDrag: true,
    // menuType: "menu",// 合并菜单
    menu: true,
    menuWidth: 100,
    menuFixed: "right",
    menuAlign: "center",
    menuHeaderAlign: "center",
    addBtn: false,
    addBtnText: "新增记录",
    addBtnIcon: "el-icon-plus",
    viewBtn: false,
    viewBtnText: "查看",
    viewBtnIcon: "el-icon-view",
    editBtn: false,
    editBtnText: "编辑",
    editBtnIcon: "el-icon-edit",
    delBtn: true,
    delBtnText: "删除",
    delBtnIcon: "el-icon-delete",
    addTitle: "新增记录",
    editTitle: "编辑记录",
    viewTitle: "查看记录",
    updateBtnText: '保存',
    saveBtnText: '保存',
    cancelBtnText: '取消',
    // cellBtn: true,// 设置为true则开启行编辑按钮
    labelPosition: "top",
    dialogCustomClass: "",
    dialogWidth: "950px",
    column: [
      {
        label: "",
        placeholder: "项目名称/表名",
        prop: "keyword",
        suffixIcon: 'my-icon-search',
        hide: true,
        display: false,
        search: true,
        searchLabel: "",
        searchLabelWidth: "0",
        searchSpan: 6,
        searchOffset: 10,
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
        label: "项目名称",
        placeholder: "",
        prop: "projectName",
        type: "input",
        width: 150,
        span: 24,
        overHidden: true,
      },
      {
        slot: true,
        label: "表名",
        placeholder: "",
        prop: "tableName",
        // type: "input",
        width: 254,
        span: 24,
        overHidden: false,
        type: "array",
        dataType: 'string',
      },
      {
        label: "表类型",
        clearable: false, // 清空
        placeholder: "表类型",
        prop: "type",
        type: "select",
        filterable: true,
        width: 120,
        span: 12,
        overHidden: true,
        dataType: "number",
        props: {
          label: "label",
          value: "value",
          desc: "desc",
        },
        dicData: [
          {
            desc: "",
            label: "单表",
            value: 0,
          },
          {
            desc: "",
            label: "联表平级",
            value: 1,
          },
        ],
        searchDicData: [
          {
            desc: "",
            label: "表类型",
            value: -1,
          },
          {
            desc: "",
            label: "单表",
            value: 0,
          },
          {
            desc: "",
            label: "联表平级",
            value: 1,
          },
        ],
        searchValue: -1,
        search: true,
        searchLabel: "",
        searchLabelWidth: "0",
        searchSpan: 4,
        searchOffset: 0,
        hide: true,
        display: false,
        change: ({ value, column }) => {
          safe.initList();
        },
      },
      {
        label: "表类型",
        clearable: false, // 清空
        placeholder: "表类型",
        prop: "type1",
        type: "select",
        filterable: true,
        width: 120,
        span: 12,
        overHidden: true,
        dataType: "number",
        props: {
          label: "label",
          value: "value",
          desc: "desc",
        },
        dicData: [
          {
            desc: "",
            label: "单表",
            value: 0,
          },
          {
            desc: "",
            label: "联表平级",
            value: 1,
          },
        ],
      },
      {
        label: "路径",
        placeholder: "",
        prop: "path",
        type: "input",
        width: "",
        span: 12,
        overHidden: false,
      },
      {
        label: "作者",
        placeholder: "",
        prop: "author",
        type: "input",
        width: 120,
        span: 12,
        overHidden: true,
      },
      {
        label: "作者邮箱",
        placeholder: "",
        prop: "email",
        type: "input",
        width: 150,
        span: 12,
        overHidden: true,
      },
      {
        label: "版本",
        placeholder: "",
        prop: "version",
        type: "input",
        width: 100,
        span: 24,
        overHidden: true,
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