/**
 * @Description: 创建项目 | 配置项
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022 - 11 - 11 09: 17: 47
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-14 10:06:16
 * @FilePath: \web\src\assets\js\option\CreatedProject.js
 * @Copyright(c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved.
*/

import rulesUtils from "@/utils/rules";
export default (safe) => {
  // console.log(safe) // vue的this对象
  return {
    submitText: "完成",
    filterDic: true, // 过滤数据字典，设置为true返回的对象不会包含$前缀的字典翻译,
    span: 24,
    gutter: 42,
    labelPosition: "top",
    align: "center",
    menuAlign: "center",
    detail: false,
    printBtn: false,
    column: [
      {
        label: "项目名称",
        prop: "name",
        span: 12,
        display: true,
        maxlength: 20,
        showWordLimit: true,
        required: true,
        rules: [
          {
            required: true,
            message: "请填写项目名称",
          },
          {
            validator: function (rule, value, callback) {
              rulesUtils.byAPIDuplicationName(
                rule, value, callback,
                Object.assign(safe, { dialogType: 'add' }),
                {
                  url: `${safe.$common.basePath}/project/getList`,
                  method: "get",
                  params: {},
                  hideLoading: true,
                },
              )
            },
            trigger: "blur"
          }
        ],
      },
      {
        label: "数据库类型",
        span: 12,
        prop: "datasourceType",
        type: "radio",
        value: 0,
        dicData: [
          {
            label: "MySQL",
            value: 0,
          },
          {
            label: "Oracle",
            value: 1,
          },
        ],
        required: true,
        rules: [
          {
            required: true,
            message: "请填写数据库类型",
          },
        ],
      },
      {
        label: "项目路径+模块名称",
        prop: "path",
        span: 12,
        display: true,
        tip: '请参考:com.wjtsc.code',
        required: true,
        rules: [
          {
            required: true,
            message: "请填写项目路径+模块名称",
            trigger: "blur"
          },
          {
            validator: function (rule, value, callback) {
              //  校验英文的正则
              if (/^[a-z]+([.]{1}[a-z]+)*$/.test(value) == false) {
                callback(new Error("路径格式错误，请参考:com.wjtsc.code"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur"
          }
        ],
      },
      {
        label: "表前缀",
        prop: "prefix",
        span: 12,
        display: true,
        tip: '请参考:t_',
        maxlength: 20,
        showWordLimit: true,
        // required: true,
        rules: [
          // {
          //   required: true,
          //   message: "请填写表前缀",
          //   trigger: "blur"
          // },
          {
            validator: function (rule, value, callback) {
              //  校验英文的正则 
              if (/^([a-z]+[_])*$/.test(value) == false) {
                callback(new Error("格式错误，参考：t_"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur"
          }
        ],
      },
      {
        label: "项目负责人",
        prop: "commander",
        span: 12,
        display: true,
        maxlength: 20,
        showWordLimit: true,
        rules: [
          {
            required: true,
            message: "请填写项目负责人",
            trigger: "blur"
          },
        ],
      },
      {
        label: "项目描述",
        prop: "description",
        span: 12,
        maxlength: 255,
        display: true,
        showWordLimit: true,
      },
    ],
  }
}