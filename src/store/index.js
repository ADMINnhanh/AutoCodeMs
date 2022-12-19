/*
 * @Author: xcl
 * @Date: 2022-10-31 09:21:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-03 08:45:27
 * @Description: 存储
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    navMode: 'horizontal',
    newMenuName: '',// 新标题

    VW: 0,
    VH: 0,
  },
  getters: {},
  mutations: {
    setToken(state, value) {
      state.token = value;
    },
    setNavMode(state, value) {
      state.navMode = value;// horizontal / vertical
    },
    setNewMenuName(state, value) {
      state.newMenuName = value;
    },

    // 通用 --> 自定义处理方式
    common_store_fun(state, data) {
      data(state);
    },
  },
  actions: {},
  modules: {},
});
