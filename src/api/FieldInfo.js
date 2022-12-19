/**
 * @Description: 项目列表 -> 项目详情 -> 右侧 分页表格-字段信息 | 增删改查的api
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 15:14:20
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-30 08:50:19
 * @FilePath: \web\src\api\FieldInfo.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
// import request from "@/utils/http.js";
export default (safe) => {
  // console.log(safe) // vue的this对象
  const request = safe.axios;
  return {
    // 字典-字段类型列表
    $dic_dataType() {
      return request({
        url: '/dictdata/getByDictTypeId?sort=0&typeId=' + safe.$route.query.datasourceType,
        method: 'get',
      })
    },
    // 字典-字典类型列表
    $dic_dictTypeId() {
      return request({
        url: '/dicttype/getByType?type=1',
        method: 'get',
      })
    },
    // 分页列表
    list(data) {
      return request({
        url: '/field/getPage',
        method: 'post',
        data: data
      })
    },
    // 单删
    del(id) {
      return request({
        url: `/field/deleteList`,
        method: 'delete',
        data: [id]
      })
    },
    // 多删
    batchDel(ids) {
      return request({
        url: `/field/deleteList`,
        method: 'delete',
        data: ids
      })
    },
    // 增
    add(data) {
      return request({
        url: '/field/add',
        method: 'post',
        data: data
      })
    },
    // 改
    update(data) {
      return request({
        url: '/field/update',
        method: 'post',
        data: data
      })
    },
  }
}
