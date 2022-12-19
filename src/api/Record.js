/**
 * @Description: 生成记录列表 | 增删改查的api
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 15:14:20
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-30 14:25:34
 * @FilePath: \web\src\api\Record.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
// import request from "@/utils/http.js";
export default (safe) => {
  // console.log(safe) // vue的this对象
  const request = safe.axios;
  return {
    // 分页列表
    list(data) {
      return request({
        url: '/record/getPage',
        method: 'post',
        data: data
      })
    },
    // 单删
    del(id) {
      return request({
        url: `/record/delete`,
        method: 'delete',
        data: [id]
      })
    },
    // 多删
    batchDel(ids) {
      return request({
        url: `/record/delete`,
        method: 'delete',
        data: ids
      })
    },
  }
}
