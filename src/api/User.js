/**
 * @Description: 用户列表 | 增删改查的api
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 15:14:20
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-30 17:20:51
 * @FilePath: \web\src\api\User.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
// import request from "@/utils/http.js";
export default (safe) => {
  // console.log(safe) // vue的this对象
  const request = safe.axios;
  return {
    // 重置密码
    resetPwd(data) {
      return request({
        url: `/user/resetpassword`,
        method: 'post',
        data: data
      })
    },
    // 分页列表
    list(data) {
      return request({
        url: '/user/getPage',
        method: 'post',
        data: data
      })
    },
    // 单删
    del(id, password) {
      return request({
        url: `/user/deleteAll`,
        method: 'delete',
        data: {
          deleteList: [id],
          password: password
        }
      })
    },
    // 多删
    batchDel(ids, password) {
      return request({
        url: `/user/deleteAll`,
        method: 'delete',
        data: {
          deleteList: ids,
          password: password
        }
      })
    },
    // 增
    add(data) {
      return request({
        url: '/user/add',
        method: 'post',
        data: data
      })
    },
    // 改
    update(data) {
      return request({
        url: '/user/update',
        method: 'post',
        data: data
      })
    },
  }
}
