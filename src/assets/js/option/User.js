/**
 * @Description: 用户列表 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 09:51:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-15 10:57:32
 * @FilePath: \web\src\assets\js\option\User.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
import rulesUtils from "@/utils/rules";
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
    menuWidth: 210,
    menuFixed: "right",
    menuAlign: "center",
    menuHeaderAlign: "center",
    addBtn: true,
    addBtnText: "新增用户",
    addBtnIcon: "el-icon-plus",
    viewBtn: false,
    viewBtnText: "查看",
    viewBtnIcon: "el-icon-view",
    editBtn: true,
    editBtnText: "编辑",
    editBtnIcon: "el-icon-edit",
    delBtn: false,
    delBtnText: "删除",
    delBtnIcon: "el-icon-delete",
    addTitle: "新增用户",
    editTitle: "编辑用户",
    viewTitle: "查看用户",
    updateBtnText: '保存',
    saveBtnText: '保存',
    cancelBtnText: '取消',
    // cellBtn: true,// 设置为true则开启行编辑按钮
    labelPosition: "top",
    dialogCustomClass: "",
    gutter: 20, // 表单项间隔
    dialogWidth: "800px",
    column: [
      {
        label: "",
        placeholder: "账号/昵称",
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
        // value: 'admin' + Math.floor(Math.random() * 999),
        label: "账号",
        placeholder: "请填写账号",
        prop: "username",
        type: "input",
        width: 120,
        span: 12,
        overHidden: true,
        rules: [
          { required: true, message: '请填写', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              rulesUtils.userNameStandard(rule, value, callback);
            },
            trigger: "blur"
          }
        ],
        tip: rulesUtils.userNameStandardTip,
        tipPlacement: rulesUtils.tipPlacement,
      },
      {
        value: 'wjt' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + + Math.floor(Math.random() * 99),
        label: "密码",
        placeholder: "请填写密码",
        prop: "password",
        type: "password",
        autocomplete: "new-password",
        width: 120,
        span: 12,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请填写",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              rulesUtils.passwordNameStandard(rule, value, callback);
            },
            trigger: "blur"
          }
        ],
        tip: rulesUtils.passwordNameStandardTip,
        tipPlacement: rulesUtils.tipPlacement,
        hide: true,
        editDisplay: false,
        addDisplay: true,
        viewDisplay: false,
      },
      {
        label: "昵称",
        placeholder: "请填写昵称",
        prop: "nickName",
        type: "input",
        maxlength: 30,
        showWordLimit: true,
        width: 120,
        span: 12,
        overHidden: true,
      },
      {
        label: "手机号",
        placeholder: "请填写手机号",
        prop: "phone",
        type: "input",
        minWidth: 150,
        span: 12,
        overHidden: true,
        rules: [
          {
            required: false,
            message: "请填写",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              rulesUtils.phoneNameStandard(rule, value, callback);
            },
            trigger: "blur"
          }
        ],
      },
      {
        label: "邮箱",
        placeholder: "请填写邮箱",
        prop: "email",
        type: "input",
        minWidth: 150,
        span: 12,
        overHidden: true,
        rules: [
          { required: false, message: '请填写邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请填写正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      {
        value: 0,
        label: "性别",
        placeholder: "请选择性别",
        prop: "gender",
        type: "select",
        filterable: true,
        width: 100,
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
            label: "男",
            value: 0,
          },
          {
            desc: "",
            label: "女",
            value: 1,
          },
        ],
      },
      {
        prop: "state",
        clearable: false, // 清空
        dataType: "number",
        props: {
          label: "label",
          value: "value",
          desc: "desc",
        },
        searchDicData: [{
          desc: "",
          label: "账户状态",
          value: -1,
        },
        {
          desc: "",
          label: "启用",
          value: 0,
        },
        {
          desc: "",
          label: "禁用",
          value: 1
        },],
        search: true,
        searchLabel: "",
        searchValue: -1,
        searchType: "select",
        searchPlaceholder: "账户状态",
        searchLabelWidth: "0",
        searchSpan: 4,
        searchOffset: 0,
        display: false,
        hide: true,
        change: ({ value, column }) => {
          safe.initList();
        },
      },
      {
        value: 0,
        label: "封禁状态",
        placeholder: "请选择账户状态",
        prop: "state1",
        type: "radio",
        width: 100,
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
            label: "启用",
            value: 0,
          },
          {
            desc: "",
            label: "禁用",
            value: 1
          },
        ],
        hide: false,
        display: true,
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