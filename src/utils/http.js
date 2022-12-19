/*
 * @Author: xcl
 * @Date: 2022-03-08 09:18:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-31 10:57:44
 * @Description: http请求工具类
 */
import router from "../router";
// 引入 axios 并配置
import axios from "axios";
const service = axios.create({
  baseURL: window.SERVER_CONFIG.baseUrl,
  timeout: 10000 * 12// 超时时间
});
service.defaults.headers["X-Requested-With"] = "XMLHttpRequest";

// loading
import { Loading } from "element-ui";
var loading; // config里面的hideLoading为true时，没有加载状态
import Message from "element-ui/packages/message/index.js";

import { getQueryString } from "./uri";

/******************axios拦截器****************/
// request  拦截
service.interceptors.request.use(
  function (config) {
    config.showLoading
      ? (loading = Loading.service({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)",
      }))
      : "";
    try {
      var token = sessionStorage.getItem("token") || getQueryString("token");
      // console.log("token：", token) 
      // if (token) {
      //   if (config.baseURL.includes('https://console-mock.apipost.cn/mock/')) {
      //     config.headers["token"] = token || null;
      //   } else {
      //     config.headers.common["token"] = token || null;
      //   }
      // }
      config.headers["token"] = token || null;
    } catch (e) {
      console.log("获取令牌信息有误!");
    }
    // 添加时间戳
    config.params ? '' : config.params = {}
    config.params.timestamp = new Date().getTime()
    // config.params.token = sessionStorage.getItem("token")
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// response 拦截
service.interceptors.response.use(
  function (response) {
    loading ? loading.close() : "";
    // console.log("response：", response)
    if (response.status == 200) {
      if (
        response.config.responseType &&
        response.config.responseType == "blob"
      ) {
        // 文件流
        return response;
      } else {
        if (response.data) {
          // 有请求体
          if (response.data.code == 401) {
            router.push({
              path: "/error",
              query: {
                code: 401,
                message: "身份验证失效，请重新登录",
              },
            });
            return Promise.reject("身份验证失效，请重新登录");
          } else if (response.data.code == 403) {
            Message({
              message: "权限不足，禁止访问",
              type: "error",
              duration: 2000,
              showClose: true,
            });
            return Promise.reject("权限不足，禁止访问");
          } else {
            return response.data;
          }
        } else {
          // 没有请求体
          Message({
            message: "后台程序未对数据做处理，请联系管理员",
            type: "error",
            duration: 2000,
            showClose: true,
          });
          return Promise.reject("后台程序未对数据做处理，请联系管理员");
        }
      }
    } else {
      // console.log("response error：", response);
      let msg =
        response.status == 400
          ? "错误请求"
          : response.status == 404
            ? "未找到"
            : response.status == 500
              ? "服务端发生错误，请联系管理员"
              : response.status || "error";
      if (response.status == 401) {
        router.push({
          path: "/error",
          query: {
            code: "Error",
            message: "身份验证失效，请重新登录",
          },
        });
        return Promise.reject("身份验证失效，请重新登录");
      } else {
        Message({
          message: msg,
          type: "error",
          duration: 2000,
          showClose: true,
        });
        return Promise.reject(msg);
      }
    }
  },
  function (error) {
    loading ? loading.close() : "";
    // console.log("Error：", error);
    if (error.message) {
      let msg = error.message.includes("timeout")
        ? "网络连接超时..."
        : error.message == "Network Error"
          ? "网络异常,请稍后再试"
          : error.message;
      if (error.message.includes("401")) {
        router.push({
          path: "/error",
          query: {
            code: "Error",
            message: "身份验证失效，请重新登录",
          },
        });
        return Promise.reject("身份验证失效，请重新登录");
      } else {
        Message({
          message: msg,
          type: "error",
          duration: 2000,
          showClose: true,
        });
        return Promise.reject(msg);
      }
    } else {
      Message({
        message: "服务端发生错误，请联系管理员",
        type: "error",
        duration: 2000,
        showClose: true,
      });
      return Promise.reject("服务端发生错误，请联系管理员");
    }
  }
);

export default service;
