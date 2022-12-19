/*
 * @Author: xcl
 * @Date: 2022-10-31 09:21:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-31 11:08:42
 * @Description: main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 总线程，用于跨组件、跨页面通讯
Vue.prototype.$bus = new Vue();

// 引入 normalize.css
import "@/assets/style/normalize.css";
// 引入 reset.css
import "@/assets/style/reset.css";
// 引入 公用css
import '@/assets/style/common.css'
// 引入 font.css
import "@/assets/style/font.css";

// 引入 iconfont
import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";

Vue.config.productionTip = false;

// 引入 公用js
import commonJS from "@/utils/common.js";
Vue.prototype.$common = commonJS;

// 引入 element-ui 版本号:2.15.8
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/style/elementModify.less";
Vue.use(ElementUI);

// # 引入 Avue
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
Vue.use(Avue);

// 注册dataV
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

// 引入 echarts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
import echartsOptionJS from "@/assets/js/echarts/index.js";
Vue.prototype.$echartsOption = echartsOptionJS;

import service from "@/utils/http.js";
Vue.prototype.axios = service;

import api from '@/utils/api.js'
Vue.prototype.api = api;

// DialogForm 
import DialogForm from '@/components/common/DialogForm/index.js'
Vue.prototype.DialogForm = DialogForm;

// Vue.directive
import "./directive/index"

new Vue({
  router,
  store,
  // render: (h) => h(App),
  render: function (createElement) {
    let routeMeta = this.$route.meta;
    let props = {};
    // 控制是否显示 带导航的布局 || 空白布局
    if (routeMeta && routeMeta.showNav) {
      props.layout = "nav-layout";
    } else {
      props.layout = "blank-layout";
    }
    return createElement(App, {
      props,
    });
  },
}).$mount("#app");
