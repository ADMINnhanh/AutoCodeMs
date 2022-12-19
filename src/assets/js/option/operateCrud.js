/**
 * @Description: 用户列表 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 09:51:01
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-14 09:33:22
 * @FilePath: \web\src\assets\js\option\operateCrud.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
export default (safe) => {
  // console.log(safe) // vue的this对象
  return {
    align: "center",
    menu: false,
    height: 590,
    defaultSort: {
      prop: 'createTime',// 排序的字段
      order: 'descending'// ascending 表示升序，descending 表示降序
    },
    column: [
      {
        label: "用户名",
        prop: "createBy",
      },
      {
        label: "用户操作",
        prop: "operation",
      },
      {
        label: "状态",
        prop: "status",
        formatter: (val, value, label) => {

          return val.status == 0 ? '失败' : val.status == 1 ? '成功' : '账号已锁定'
        },
      },
      {
        label: "请求url",
        prop: "requestUri",
      },
      {
        label: "请求方式",
        prop: "requestMethod",
      },
      {
        label: "请求参数",
        prop: "requestParams",
      },
      {
        label: "请求时长（毫秒）",
        prop: "requestTime",
        sortable: true,
      },
      {
        label: "用户代理",
        prop: "userAgent",
      },
      {
        label: "IP",
        prop: "ip",
      },
      {
        label: "创建时间",
        prop: "createTime",
        sortable: true,
      },
    ],
  }
}