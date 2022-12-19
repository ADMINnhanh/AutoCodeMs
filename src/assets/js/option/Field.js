/**
 * @Description: 默认字段列表 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 09:51:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-16 13:49:24
 * @FilePath: \web\src\assets\js\option\Field.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
import rulesUtils from "@/utils/rules";

// 1.拖拽排序 2.快捷字段排序
/** 注意：拖拽排序和快捷字段排序是冲突的，两者只能存在一个 */
const sortType = 2;

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
    addBtnText: "新增默认字段",
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
    addTitle: "新增默认字段",
    editTitle: "编辑默认字段",
    viewTitle: "查看默认字段",
    updateBtnText: '保存',
    saveBtnText: '保存',
    cancelBtnText: '取消',
    // cellBtn: true,// 设置为true则开启行编辑按钮
    labelPosition: "top",
    dialogCustomClass: "",
    labelWidth: 120,
    dialogWidth: '1360px',
    // sortable: true,// true-同时开启行和列的拖拽功能，false-反之
    rowSort: sortType === 1, // true-开启行的拖拽功能，false-反之
    columnSort: false, // true-开启列的拖拽功能，false-反之
    column: [
      {
        label: "",
        placeholder: "字段名称",
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
        label: "字段名称",
        placeholder: "请填写字段名称",
        prop: "name",
        type: "input",
        width: 200,
        span: 8,
        overHidden: true,
        rules: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              rulesUtils.fieldNameStandard(rule, value, callback)
            },
            trigger: "blur"
          },
          {
            validator: function (rule, value, callback) {
              rulesUtils.byAPIDuplicationName(
                rule, value, callback,
                Object.assign(safe, { dialogDataId: safe.editorFormObj.id }),
                {
                  url: `${safe.$common.basePath}/defaultfield/getList`,
                  method: "post",
                  data: {
                    dictTypeId: safe.editorFormObj.dictTypeId ? safe.editorFormObj.dictTypeId : - 1,// 数据库类型id
                    type: -1,// 分类 -1查所有 0.数据库类型 1.业务类型
                  },
                  hideLoading: true,
                },
              )
            },
            trigger: "blur"
          }
        ],
        tip: rulesUtils.fieldNameStandardTip,
        tipPlacement: rulesUtils.tipPlacement,
        html: true,
        formatter: (val) => {
          return val.name + (val.notes ? "（" + val.notes + "）" : '')
        },
      },
      {
        value: 255,
        label: "字段长度",
        placeholder: "请填写字段长度",
        prop: "length",
        type: "number",
        width: 100,
        span: 8,
        overHidden: false,
        min: 0,
        max: 9999,
        className: "w200", // 自定义类名
      },
      {
        label: "字段默认值",
        placeholder: "请填写字段默认值",
        prop: "defaultValue",
        type: "input",
        maxlength: 30,
        showWordLimit: true,
        width: "120",
        span: 8,
        overHidden: true,
        // hide: true,
      },

      {
        label: "",
        clearable: false, // 清空
        placeholder: "数据库类型",
        prop: "type",
        type: "select",
        filterable: true,
        width: 120,
        span: 8,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        dataType: "number",
        props: {
          label: "dictType",
          value: "id",
          desc: "dictName",
        },
        dicData: [
          { id: -1, dictType: '数据库类型' }
        ],
        hide: true,
        display: false,
        search: true,
        searchValue: -1,
        searchLabel: "",
        searchLabelWidth: "0",
        searchSpan: 4,
        searchOffset: 0,
        change: ({ value, column }) => {
          safe.initList();
        },
      },
      {
        label: "数据库类型",
        placeholder: "请选择数据库类型",
        prop: "dictTypeId",
        type: "select",
        filterable: true,
        width: 120,
        span: 8,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        dataType: "number",
        props: {
          label: "dictType",
          value: "id",
          desc: "dictName",
        },
        dicData: [],
        hide: true,
        display: true,
        control: (val, form) => {
          const index = safe.getColIndex('dataType');
          if (val) {
            // form.dataType = null;
            safe.option.column[index].disabled = false;
          } else {
            form.dataType = null;
            safe.option.column[index].disabled = true;
          }
        },
        change: ({ value }) => {
          const index = safe.getColIndex('dataType');
          let self = safe;
          // 值为空时，把字段类型的下拉选项清空
          if (!value) {
            safe.option.column[index].dicData = [];
            safe.$refs['crud-Field'].updateDic('dataType', [])
            return;
          }
          // 切换数据库类型时，设置更新字段类型的下拉选项
          let config = {
            url: `${self.$common.basePath}/dictdata/getByDictTypeId`,
            method: "get",
            params: {
              sort: 0,
              typeId: value,
            },
            hideLoading: true,
          };
          self
            .axios(config)
            .then(function (res) {
              if (res.code === 200) {
                let data = res.data;
                safe.option.column[index].dicData = data;
                safe.$refs['crud-Field'].updateDic('dataType', data)
              } else {
                // 提示
                self.$message.error(res.msg || res.error || "错误！");
                safe.option.column[index] = [];
                safe.$refs['crud-Field'].updateDic('dataType', [])
              }
            })
            .catch(function (error) {
              self.$message.error(error);
            });
        },
      },
      {
        label: "数据库类型",
        prop: "sourceType",
        width: 200,
        overHidden: true,
        hide: false,
        display: false,
        html: true,
        formatter: (val) => {
          return val.sourceType ? val.sourceType + "（" + val.dictName + "）" : ''
        }
      },

      {
        label: "字段类型",
        placeholder: "请选择字段的数据类型",
        prop: "dataType",
        type: "select",
        filterable: true,
        width: 120,
        span: 8,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        dataType: "number",
        props: {
          label: "dictValue",
          value: "id",
          desc: "dictLabel",
        },
        dicData: [],
        display: true,
        hide: true,
        disabled: true,
      },
      {
        label: "字段类型",
        prop: "dictValue",
        width: 120,
        overHidden: true,
        display: false,
        hide: false,
      },

      {
        value: 0,
        label: "允许为null",
        placeholder: "是否允许为null",
        type: "switch",
        prop: "allowedNull",
        width: 120,
        span: 8,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        dataType: "number",
        props: {
          label: "label",
          value: "value",
          desc: "desc",
        },
        dicData: [
          {
            desc: "",
            label: "不允许",
            value: 1,
          },
          {
            desc: "",
            label: "允许",
            value: 0,
          },
        ],
      },

      {
        value: 0,
        label: "索引类型",
        placeholder: "请选择索引类型",
        type: "radio",
        prop: "keyType",
        width: 100,
        span: 8,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        dataType: "number",
        props: {
          label: "label",
          value: "value",
          desc: "desc",
        },
        dicData: [
          {
            desc: "",
            label: "无",
            value: 0,
          },
          {
            desc: "",
            label: "主键",
            value: 1,
          },
          {
            desc: "",
            label: "唯一索引",
            value: 2,
          },
          {
            desc: "",
            label: "普通索引",
            value: 3,
          },
        ],
        control: (val, form) => {
          const index = safe.getColIndex('primaryKeyType');
          if (val == 1) {
            form.primaryKeyType = 1;
            form.allowedNull = 1;
            safe.option.column[index].addDisplay = true;
            safe.option.column[index].editDisplay = true;
            return {
              primaryKeyType: {
                editDisplay: true,
                addDisplay: true,
              },
            }
          } else {
            form.primaryKeyType = null;
            form.allowedNull = 0;
            safe.option.column[index].addDisplay = false;
            safe.option.column[index].editDisplay = false;
            return {
              primaryKeyType: {
                editDisplay: false,
                addDisplay: false,
              },
            }
          }
        }
      },
      {
        value: 1,
        label: "主键生成策略",
        placeholder: "主键生成策略",
        type: "radio",
        prop: "primaryKeyType",
        width: 100,
        span: 8,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        dataType: "number",
        props: {
          label: "label",
          value: "value",
          desc: "desc",
        },
        dicData: [
          {
            desc: "",
            label: "无",
            value: 0,
          },
          {
            desc: "",
            label: "自增",
            value: 1,
          },
          {
            desc: "",
            label: "用户输入",
            value: 2,
          },
          {
            desc: "",
            label: "UUID",
            value: 3,
          },
        ],
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
      },
      {
        label: "",
        prop: "$primaryKeyType",
        span: 8,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
        hide: true,
      },

      {
        type: 'title',
        span: 24,
        styles: {
          fontSize: '14px',
          color: '#606266',
          textAlign: 'left',
          fontWeight: '400'
        },
        labelWidth: '0px',
        label: '字段功能',
        labelPosition: "required-title",
        editDisplay: true,
        addDisplay: true,
        viewDisplay: false,
        hide: true,
        prop: 'required-title'
      },
      {
        label: '字段功能', children: [
          {
            value: [3, 4, 2, 1, 5],
            label: "基础功能",
            placeholder: "请选择字段基础功能",
            type: "checkbox",
            prop: "functionIds",
            width: 500,
            span: 8,
            overHidden: true,
            html: true,
            all: true,
            class: "my-checkbox-radio-class",
            formatter: (val) => {
              var html = "";
              html += '<div style="display: flex; gap: 8px">';
              if (val.functionIds && val.functionIds.indexOf(3) != -1) {
                html += '<span v-for="item in 10" style="" class="el-tag el-tag--info el-tag--light">详情查询</span>'
              }
              if (val.functionIds && val.functionIds.indexOf(4) != -1) {
                html += '<span style="" class="el-tag el-tag--info el-tag--light">分页查询</span>'
              }
              if (val.functionIds && val.functionIds.indexOf(2) != -1) {
                html += '<span style="" class="el-tag el-tag--info el-tag--light">编辑</span>'
              }
              if (val.functionIds && val.functionIds.indexOf(1) != -1) {
                html += '<span style="" class="el-tag el-tag--info el-tag--light">新增</span>'
              }
              if (val.functionIds && val.functionIds.indexOf(5) != -1) {
                html += '<span style="" class="el-tag el-tag--info el-tag--light">导出Excel</span>'
              }
              if (val.functionIds && val.functionIds.indexOf(6) != -1) {
                html += '<span style="" class="el-tag el-tag--info el-tag--light">导出excel需转义</span>'
              }
              html += '</div>'
              return html;
            },
            dataType: "array",
            props: {
              label: "label",
              value: "value",
              desc: "desc",
            },
            dicData: [
              {
                desc: "",
                label: "详情查询",
                value: 3,
              },
              {
                desc: "",
                label: "分页查询",
                value: 4,
              },

              {
                desc: "",
                label: "编辑",
                value: 2,
              },
              {
                desc: "",
                label: "新增",
                value: 1,
              },
              {
                desc: "",
                label: "导出Excel",
                value: 5,
              },
              {
                desc: "",
                label: "导出excel需转义",
                value: 6,
              },
            ],
            control: (val, form) => {
              if (val && val.indexOf(4) != -1) {
                form.condition = 0;
              } else {
                form.condition = 0;
              }
            }
          },
          {
            value: 0,
            label: "查询条件",
            placeholder: "请选择查询条件",
            // labelTip: '仅针对分页查询的选择',
            type: "radio",
            prop: "condition",
            width: 100,
            span: 8,
            overHidden: true,
            class: "my-checkbox-radio-class",
            dataType: "number",
            props: {
              label: "label",
              value: "value",
              desc: "desc",
            },
            dicData: [
              {
                desc: "",
                label: "无",
                value: 0,
              },
              {
                desc: "",
                label: "模糊查询",
                value: 7,
              },
              {
                desc: "",
                label: "精确查询",
                value: 8,
              },
            ],
            // hide: true,
          },
          {
            value: 0,
            label: "字段含义",
            placeholder: "请选择字段含义",
            type: "radio",
            prop: "meaning",
            width: 100,
            span: 8,
            class: "my-checkbox-radio-class",
            overHidden: true,
            rules: [
              {
                required: false,
                message: "请选择",
                trigger: "blur",
              },
            ],
            dataType: "number",
            props: {
              label: "label",
              value: "value",
              desc: "desc",
            },
            dicData: [
              {
                desc: "",
                label: "无",
                value: 0,
              },
              {
                desc: "",
                label: "逻辑删除",
                value: 9,
              },
              {
                desc: "",
                label: "创建时间",
                value: 10,
              },
              {
                desc: "",
                label: "更新时间",
                value: 11,
              },
            ],
            // hide: true,
          },
        ]
      },

      {
        label: "字段注释",
        placeholder: "请填写字段注释",
        prop: "notes",
        type: "textarea",
        minWidth: 300,
        span: 24,
        maxlength: 255,
        showWordLimit: true,
        minRows: 3,
        maxRows: 5,
        overHidden: true,
        hide: true,
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
        sortable: sortType === 2,
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
        sortable: sortType === 2,
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
    defaultSort: sortType === 2 ? {
      prop: 'createTime',// 排序的字段
      order: 'descending'// ascending 表示升序，descending 表示降序
    } : {},
  }
}