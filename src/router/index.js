/*
 * @Author: xcl
 * @Date: 2022-10-31 09:21:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-31 10:00:45
 * @Description: 路由
 */
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决NavigationDuplicated
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

import routes from "./routes";
const router = new VueRouter({
  mode: "hash", // history 和 hash 模式
  base: process.env.BASE_URL,
  routes,
});

export default router;
