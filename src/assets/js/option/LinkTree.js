/**
 * @Description: 生成代码(联表) -> 右侧 树 | 配置项
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-11 13:32:19
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-23 17:13:10
 * @FilePath: \web\src\assets\js\option\LinkTree.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
export default (safe) => {
  // console.log(safe) // vue的this对象
  return {
    filter: false,
    multiple: true,
    accordion: false,
    menu: false,
    defaultExpandAll: true,
    defaultCheckedKeys: [],
    formOption: {},
    props: {
      labelText: "表",
      label: "name",
      value: "id",
      children: "children",
    },
  }
}