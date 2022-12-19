/*
 * @Author: xcl
 * @Date: 2022-04-20 18:06:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-02 16:09:42
 * @Description: 路由配置
 */
import Login from "../views/Login.vue"; /* 登录 */

import Error from "../views/Error.vue"; /* 报错 */

import HomeIndex from "../views/home/Index.vue";
import Home from "../views/home/Home.vue"; /* 首页 */

import ProjectIndex from "../views/project/Index.vue";
import List from "../views/project/List.vue"; /* 项目管理-项目列表 */
import Table from "../views/project/Table.vue"; /* 项目管理-表管理 */
import Demo from "../views/project/Demo.vue"; /* 项目管理-Avue 演示 */
import ProjectDetails from "../views/project/ProjectDetails.vue"; /* 项目管理-项目列表-详情（单表管理+联表管理） */
import Record from "../views/project/Record.vue"; /* 项目管理-生成记录管理 */

import ConfigureIndex from "../views/configure/Index.vue";
import DataType from "../views/configure/DataType.vue"; /* 配置管理-默认数据类型管理 */
import Field from "../views/configure/Field.vue"; /* 配置管理-默认字段管理 */
import DataTypeDetails from "../views/configure/DataTypeDetails.vue"; /* 配置管理-默认数据类型管理-字典类型详情 */

import SystemIndex from "../views/system/Index.vue";
import User from "../views/system/User.vue"; /* 用户管理 */
import Log from "../views/system/log.vue"; /* 日志管理 */

const routes = [
  // 默认
  {
    path: "*",
    redirect: "/login",
  },
  // 登录
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      reload: '',// 刷新用的属性
      showNav: false, // 是否显示顶部导航
    },
    children: [],
  },
  // 报错
  {
    path: "/error",
    name: "Error",
    component: Error,
    meta: {
      reload: '',// 刷新用的属性
      showNav: false, // 是否显示顶部导航
    },
    children: [],
  },
  // 首页
  {
    path: "/home",
    name: "HomeIndex",
    component: HomeIndex,
    meta: {
      reload: '',// 刷新用的属性
      showNav: true, // 是否显示顶部导航
      menuName: "首页", // 菜单名称
      iconClass: "icon-shouye", // 图标className
    },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "首页", // 菜单名称
        },
        children: [],
      },
    ],
  },
  // 项目管理
  {
    path: "/project",
    name: "ProjectIndex",
    component: ProjectIndex,
    meta: {
      reload: '',// 刷新用的属性
      showNav: true, // 是否显示顶部导航
      menuName: "项目管理", // 菜单名称
      iconClass: "icon-xiangmu", // 图标className
    },
    children: [
      {
        path: "list",
        name: "List",
        component: List,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "项目列表", // 菜单名称
        },
        children: [],
      },
      {
        path: "record",
        name: "Record",
        component: Record,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "生成记录管理", // 菜单名称
        },
        children: [],
      },
      {
        path: "dataRecovery",
        name: "DataRecovery",
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "数据恢复", // 菜单名称
        },
      },
      {
        path: "table",
        name: "Table",
        component: Table,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "表管理", // 菜单名称
          hideSlide: true, // 隐藏侧边导航
          back: true, // 返回上一级
        },
        children: [],
      },
      {
        path: "details",
        name: "ProjectDetails",
        component: ProjectDetails,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "项目详情", // 菜单名称
          hideSlide: true, // 隐藏侧边导航
          back: true, // 返回上一级
        },
        children: [],
      },
      {
        path: "demo",
        name: "Demo",
        component: Demo,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "Avue 演示", // 菜单名称
          hideSlide: true, // 隐藏侧边导航
        },
        children: [],
      },
    ],
  },
  // 配置管理
  {
    path: "/configure",
    name: "ConfigureIndex",
    component: ConfigureIndex,
    meta: {
      reload: '',// 刷新用的属性
      showNav: true, // 是否显示顶部导航
      menuName: "配置管理", // 菜单名称
      iconClass: "icon-shezhi", // 图标className
    },
    children: [
      {
        path: "data_type",
        name: "DataType",
        component: DataType,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "字典数据管理", // 菜单名称
        },
        children: [],
      },
      {
        path: "field",
        name: "Field",
        component: Field,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "默认字段管理", // 菜单名称
        },
        children: [],
      },
      {
        path: "details",
        name: "DataTypeDetails",
        component: DataTypeDetails,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "字典数据详情", // 菜单名称
          hideSlide: true, // 隐藏侧边导航
          back: true, // 返回上一级
        },
        children: [],
      },
    ],
  },
  // 运维管理
  {
    path: "/sys",
    name: "SystemIndex",
    component: SystemIndex,
    meta: {
      reload: '',// 刷新用的属性
      showNav: true, // 是否显示顶部导航
      menuName: "运维管理", // 菜单名称
      iconClass: "icon-chanpin", // 图标className
    },
    children: [
      {
        path: "user",
        name: "User",
        component: User,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "用户管理", // 菜单名称
        },
        children: [],
      },
      {
        path: "log",
        name: "Log",
        component: Log,
        meta: {
          reload: '',// 刷新用的属性
          showNav: true, // 是否显示顶部导航
          menuName: "日志管理", // 菜单名称
        },
        children: [],
      },
    ],
  },
];

export default routes;
