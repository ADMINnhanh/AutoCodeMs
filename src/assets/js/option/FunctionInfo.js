/**
 * @Description: 项目列表 -> 项目详情 -> 右侧 分页表格-功能信息 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-11 08:38:21
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-13 14:40:42
 * @FilePath: \web\src\assets\js\option\FunctionInfo.js
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
    searchShow: false,
    page: false,
    // page: true,
    rowKey: "id",
    height: 590,
    // height: 400,
    stripe: true,
    border: true,
    header: true,
    selection: false,
    selectionFixed: false,
    reserveSelection: true,
    tip: false,
    index: false,
    indexFixed: false,
    indexLabel: "序号",
    align: "center",
    menuAlign: "center",
    // dateBtn: true,
    // excelBtn: true,
    // menuType: "menu",// 合并菜单
    menu: true,
    // menuTitle: ' ',
    menuWidth: 180,
    menuFixed: "right",
    // menuFixed: false,
    menuAlign: "center",
    menuHeaderAlign: "center",
    addBtn: false,
    viewBtn: false,
    editBtn: false,
    delBtn: false,
    delBtnText: "删除",
    delBtnIcon: "el-icon-delete",
    columnBtn: false,
    // dialogDrag: true,
    refreshBtn: false,
    dialogCustomClass: "w620",
    column: [
      {
        label: "功能名称",
        placeholder: "",
        prop: "name",
        type: "input",
        width: '180',
        span: 24,
        overHidden: true,
      },
      {
        label: "功能描述",
        placeholder: "",
        prop: "description",
        type: "input",
        minWidth: 300,
        span: 24,
        overHidden: true,
      },
      {
        label: "字段",
        prop: "fields",
        width: 254,
        overHidden: false,
        html: true,
        formatter: (val) => {
          var html = "";
          if (val.fields && val.fields.length > 0) {
            html += '<div style="display: flex; gap: 8px">';
            if (val.fields.length > 2) {
              const element1 = val.fields[0];
              html += '<span style="width:92px;" class="el-tag el-tag--info el-tag--light ellipsis">' + element1.name + '</span>'
              const element2 = val.fields[1];
              html += '<span style="width:92px;" class="el-tag el-tag--info el-tag--light ellipsis">' + element2.name + '</span>'
              const element3 = (val.fields.length - 2) + ' +';
              html += '<span style="width:40px;" class="el-tag el-tag--info el-tag--light ellipsis">' + element3 + '</span>'
            }
            if (val.fields.length == 2) {
              const element1 = val.fields[0];
              html += '<span style="width:92px;" class="el-tag el-tag--info el-tag--light ellipsis">' + element1.name + '</span>'
              const element2 = val.fields[1];
              html += '<span style="width:92px;" class="el-tag el-tag--info el-tag--light ellipsis">' + element2.name + '</span>'
            }
            if (val.fields.length == 1) {
              const element1 = val.fields[0];
              html += '<span style="width:92px;" class="el-tag el-tag--info el-tag--light ellipsis">' + element1.name + '</span>'
            }
            html += '</div>'
          }
          return html;
        },
        display: false,
      },
      {
        label: "字段",
        prop: "new_fields",
        type: "array",
        span: 24,
        dataType: 'string',
        hide: true,
      },
      {
        label: "功能备注",
        placeholder: "",
        prop: "notes",
        type: "input",
        minWidth: 100,
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