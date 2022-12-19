/**
 * @Description: 默认字段列表 | 增删改查的api
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 15:14:20
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-07 13:56:48
 * @FilePath: \web\src\api\Field.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
// import request from "@/utils/http.js";
export default (safe) => {
  // console.log(safe) // vue的this对象
  const request = safe.axios;
  return {
    // 字典-数据库类型列表
    $dic_type() {
      return request({
        url: '/dicttype/getByType?type=0',
        method: 'get',
      })
    },
    // 字典-数据库类型列表1
    $dic_dictTypeId() {
      return request({
        url: '/dicttype/getByType?type=0',
        method: 'get',
      })
    },
    // 分页列表
    list(data) {
      return request({
        url: '/defaultfield/getPage',
        method: 'post',
        data: data
      })
    },
    // 单删
    del(id) {
      return request({
        url: `/defaultfield/delete`,
        method: 'delete',
        data: [id]
      })
    },
    // 多删
    batchDel(ids) {
      return request({
        url: `/defaultfield/delete`,
        method: 'delete',
        data: ids
      })
    },
    // 增
    add(data) {
      return request({
        url: '/defaultfield/add',
        method: 'post',
        data: data
      })
    },
    // 改
    update(data) {
      return request({
        url: '/defaultfield/update',
        method: 'post',
        data: data
      })
    },
  }
}
