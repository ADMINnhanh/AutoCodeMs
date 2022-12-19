/**
 * @Description: 用户列表 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 09:51:01
 * @LastEditors: CSDN
 * @LastEditTime: 2022-11-28 16:30:29
 * @FilePath: \web\src\assets\js\option\errerCrud.js
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
        label: "异常信息",
        prop: "errorInfo",
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