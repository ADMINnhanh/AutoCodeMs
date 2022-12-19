/**
 * @Description: 联表管理 | 增删改查的api
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 15:14:20
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-08 11:05:03
 * @FilePath: \web\src\api\LinkTable.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
// import request from "@/utils/http.js";
export default (safe) => {
  // console.log(safe) // vue的this对象
  const request = safe.axios;
  return {
    // 字典-附表
    $dic_father() {
      return request({
        url: '/project/getList',
        method: 'get',
      })
    },
    // 字典-子表
    // $dic_son() {
    //   return request({
    //     url: '/project/getList',
    //     method: 'get',
    //   })
    // },
    // 生成代码
    generateCode(data) {
      return request({
        url: `/table-relation/generateCode`,
        method: 'post',
        data: data,
        responseType: "blob", // 1.首先设置responseType对象格式为 blob: // 二进制流
      })
    },
    // 某项目下的表列表
    oneTableList() {
      return request({
        url: `/table/getList`,
        method: 'post',
        data: {
          projectId: parseInt(safe.$route.query.id)
        },
      })
    },
    // 根据tableId获取字段列表
    getFieldByTableId(tableId) {
      return request({
        url: `/field/getFieldByTableId`,
        method: 'get',
        params: {
          tableId: tableId
        },
      })
    },
    // 分页列表
    list(data) {
      return request({
        url: '/table-relation/getPage',
        method: 'post',
        data: data
      })
    },
    // 单删
    del(id) {
      return request({
        url: `/table-relation/deleteList`,
        method: 'delete',
        data: [id]
      })
    },
    // 多删
    batchDel(ids) {
      return request({
        url: `/table-relation/deleteList`,
        method: 'delete',
        data: ids
      })
    },
  }
}
