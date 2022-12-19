/**
 * @Description: 联表管理 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 09:51:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-14 15:53:04
 * @FilePath: \web\src\assets\js\option\LinkTable.js
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
    menuAlign: "center",
    searchBtnText: "查询",
    searchBtnIcon: "el-icon-search",
    emptyBtnText: "重置",
    emptyBtnIcon: "el-icon-brush",
    searchLabelWidth: 80,
    searchFilterDic: true,
    searchFilterNull: true,
    searchIndex: 2,
    searchShowBtn: true,
    searchIcon: true,
    searchMenuSpan: 4,
    // dateBtn: true,
    // copyBtn: true,
    // excelBtn: true,
    // menuType: "menu",// 合并菜单
    menu: true,
    menuWidth: 140,
    menuFixed: "right",
    menuAlign: "center",
    menuHeaderAlign: "center",
    addBtn: false,
    // addBtnText: "新增关联集",
    // addBtnIcon: "el-icon-plus",
    viewBtn: false,
    viewBtnText: "查看",
    viewBtnIcon: "el-icon-view",
    editBtn: false,
    editBtnText: "编辑",
    editBtnIcon: "el-icon-edit",
    delBtn: true,
    delBtnText: "删除",
    delBtnIcon: "el-icon-delete",
    columnBtn: false,
    dialogDrag: true,
    // addTitle: "新增关联集",
    editTitle: "编辑关联集",
    viewTitle: "查看关联集",
    updateBtnText: '保存',
    // saveBtnText: '保存',
    // cancelBtnText: '取消',
    // cellBtn: true,
    labelPosition: "top",
    labelWidth: 120,
    dialogWidth: "650px",
    column: [
      {
        label: "",
        placeholder: "关联集名称/表名称",
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
        label: "关联集名称",
        placeholder: "请填写关联集名称",
        minWidth: 150,
        prop: "name",
        span: 12,
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
        label: "联表类型",
        placeholder: "请选择联表类型",
        width: 150,
        type: "select",
        filterable: true,
        prop: "type",
        span: 12,
        overHidden: true,
        dataType: "number",
        props: {
          label: "label",
          value: "value",
          desc: "desc",
        },
        dicData: [
          { label: '同级联表', value: 0, desc: '' },
          { label: '多级联表', value: 1, desc: '' },
        ],
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        display: false
      },
      {
        label: "父表",
        placeholder: "请填写父表",
        width: 150,
        type: "input",
        prop: "fatherName",
        span: 12,
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
        labelslot: true,
        labelWidth: '100%',
        label: "子表",
        prop: "sonName1",
        span: 24,
        hide: true,
      },
      {
        slot: true,
        headerslot: true,
        formslot: true,
        labelWidth: 0,
        label: "子表",
        minWidth: 254,
        prop: "sonName",
        overHidden: false,
        span: 24,
        type: "array",
        dataType: 'string',
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