/**
 * @Description: 项目列表 -> 项目详情 -> 右侧 分页表格-字段信息 | 增删改查的api
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 15:14:20
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-30 08:59:38
 * @FilePath: \web\src\api\FunctionInfo.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
// import request from "@/utils/http.js";
export default (safe) => {
  // console.log(safe) // vue的this对象
  const request = safe.axios;
  return {
    // 列表
    list(data) {
      return request({
        url: '/function/getListByTableId',
        method: 'get',
        params: data
      })
    },
  }
}
