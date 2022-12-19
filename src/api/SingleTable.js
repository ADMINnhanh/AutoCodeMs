/**
 * @Description: 表的列表 | 增删改查的api
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 15:14:20
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-07 16:57:46
 * @FilePath: \web\src\api\SingleTable.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
// import request from "@/utils/http.js";
export default (safe) => {
  // console.log(safe) // vue的this对象
  const request = safe.axios;
  return {
    // 字典-项目列表
    $dic_projectId() {
      return request({
        url: '/project/getList',
        method: 'get',
      })
    },
    // 字典-默认字段
    $dic_defaultFieldIds() {
      return request({
        url: '/defaultfield/getList',
        method: 'post',
        data: {
          dictTypeId: parseInt(safe.$route.query.datasourceType),//数据库类型id
          type: 0,// 分类 -1查所有 0.数据库类型 1.业务类型
        }
      })
    },
    // 分页列表
    list(data) {
      return request({
        url: '/table/getPage',
        method: 'post',
        data: data
      })
    },
    // 单删
    del(id) {
      return request({
        url: `/table/deleteList`,
        method: 'delete',
        data: [id]
      })
    },
    // 多删
    batchDel(ids) {
      return request({
        url: `/table/deleteList`,
        method: 'delete',
        data: ids
      })
    },
    // 增
    add(data) {
      return request({
        url: '/table/add',
        method: 'post',
        data: data
      })
    },
    // 改
    update(data) {
      return request({
        url: '/table/update',
        method: 'post',
        data: data
      })
    },
  }
}
