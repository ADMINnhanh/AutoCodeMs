/**
 * @Description: 项目列表 -> 项目详情 -> 生成代码(单表) | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-11 13:58:05
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-08 09:31:04
 * @FilePath: \web\src\assets\js\option\GenerateCode.js
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
    size: "medium",
    gutter: 12,
    labelWidth: 80,
    labelPosition: "top",
    align: "center",
    menuAlign: "center",
    border: true,
    detail: false,
    submitBtn: true,
    emptyBtn: true,
    submitText: "生成代码",
    emptyText: "取消",
    menuPosition: "right",
    column: [
      {
        value: parseInt(safe.$route.query.id),
        prop: "projectId",
        display: false,
        hide: true,
      },
      {
        value: safe.$route.query.path,
        label: "项目路径+模块名称",
        prop: "path",
        placeholder: "请填写项目路径+模块名称，如：com.wjtsc.code",
        span: 24,
        rules: [
          { required: false, message: "请填写", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              rulesUtils.pathNameStandard(rule, value, callback)
            },
            trigger: "blur"
          }
        ],
        tip: rulesUtils.pathNameStandardTip,
        tipPlacement: rulesUtils.tipPlacement,
      },
      {
        label: "作者",
        prop: "author",
        span: 24,
        display: true,
        placeholder: "请填写作者",
        rules: [
          {
            required: false,
            message: "请填写",
            trigger: "blur",
          },
        ],
      },
      {
        label: "邮箱",
        prop: "email",
        span: 24,
        display: true,
        placeholder: "请填写邮箱",
        rules: [
          { required: false, message: '请填写邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请填写正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      {
        label: "版本",
        prop: "version",
        span: 24,
        placeholder: "请填写版本",
      },
      {
        label: "已选表",
        prop: "tableIds",
        span: 24,
        labelslot: true,
        formslot: true,
      },
    ],
  }
}