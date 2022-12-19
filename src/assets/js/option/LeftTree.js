/**
 * @Description: 项目列表 -> 项目详情 -> 左侧 树 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-11 13:32:19
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-15 10:56:59
 * @FilePath: \web\src\assets\js\option\LeftTree.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
import rulesUtils from "@/utils/rules";
export default (safe) => {
  // console.log(safe) // vue的this对象
  return {
    title: "新增表",
    filter: true,
    filterText: "表名称",
    addBtnText: "新增",
    editBtnText: "修改",
    delBtnText: "删除",
    multiple: false,
    accordion: false,
    menu: true,
    addBtn: false,
    editBtn: true,
    delBtn: true,
    defaultExpandAll: true,
    dialogWidth: "30%",
    formOption: {
      saveBtnIcon: "el-icon-check",
      updateBtnIcon: "el-icon-check",
      cancelBtnIcon: "el-icon-close",
      filterDic: true, // 过滤数据字典，设置为true返回的对象不会包含$前缀的字典翻译,
      filterNull: false, // 过滤空数据，设置为true返回的对象不会包含空数据的字段
      labelWidth: 100,
      labelPosition: "top",
      menuAlign: "right",
      menuPosition: "right",
      column: [
        {
          value: parseInt(safe.$route.query.id),
          prop: "projectId",
          display: false,
          hide: true,
        },
        {
          value: safe.$route.query.prefix || '',
          row: true,
          span: 24,
          label: "表名",
          placeholder: "请填写表名",
          prop: "name",
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
                  Object.assign(safe, { dialogDataId: safe.$refs.tree.node.id }),
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
          row: true,
          span: 24,
          type: "textarea",
          placeholder: "请填写表备注",
          label: "表备注",
          prop: "notes",
          maxlength: 255,
          showWordLimit: true,
          minRows: 3,
          maxRows: 5,
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
        },
      ],
    },
    props: {
      labelText: "标题",
      label: "name",
      subLabel: 'notes',
      value: "id",
      children: "children",
    },
  }
}