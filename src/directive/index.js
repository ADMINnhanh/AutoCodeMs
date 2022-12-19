/**
 * @Description: 自定义vue命令
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-28 14:12:29
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-02 14:27:58
 * @FilePath: \web\src\directive\index.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
import Vue from "vue";
import router from "../router";

import CopyTableByHave from "@/components/modules/projectDetails/copyTableByHave.vue";
const Popover = Vue.extend(CopyTableByHave);
Vue.directive('copy', {
  bind(el, binding, vnode) {
    const popper = new Popover({
      router,
      el: document.createElement('div'),
      data() {
        return {}
      },
      methods: {
        upData: binding.value
      }
    })
    document.body.appendChild(popper.$el); // 添加到body上 
    el.instance = popper;
    // el.instance.content = binding.value.content || '';// 绑定的值
    el.onclick = () => {
      el.instance.visible = true; // 展示
      Vue.nextTick(() => {
        // console.log(el)
      })
    }

  },
  update() { },
  unbind(el, binding) {
    // 解除事件监听
    el.instance && el.instance.$destroy();
  }
})