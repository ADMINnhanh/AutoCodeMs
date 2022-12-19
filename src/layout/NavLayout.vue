<!--
 * @Author: xcl
 * @Date: 2022-04-20 18:03:17
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-02 10:53:01
 * @Description: 顶部导航布局
-->
<template>
  <div id="nav-layout">
    <top-nav class="topContainer"></top-nav>
    <div class="slide-page">
      <menu-nav
        class="slideContainer"
        v-if="$store.state.navMode == 'vertical'"
      ></menu-nav>
      <div class="pageContainer" :class="[$store.state.navMode]">
        <!-- 顶部历史导航 -->
        <!-- navHistoryTabsContainer-1 -->
        <!-- navHistoryTabsContainer -->
        <div class="navHistoryTabsContainer">
          <!-- 
            type="card"
            @tab-remove="removeTab"
            :closable="true"
          -->
          <!-- 
            type=""
            :closable="false"
          -->
          <el-tabs
            type=""
            :closable="false"
            class="navHistoryTabs"
            v-model="navHistoryActive"
            @tab-click="clickNavHistory"
          >
            <el-tab-pane
              v-for="item in navHistory"
              :key="item.fullPath"
              :name="item.fullPath"
            >
              <span slot="label" class="tabSpan">
                <i class="point"></i>
                {{ item.meta.menuName }}
                <i
                  class="close"
                  :class="[
                    item.fullPath == '/home/home' && navHistory.length === 1
                      ? ''
                      : 'el-icon-close',
                  ]"
                  @click.stop="removeTab(item.fullPath)"
                ></i>
              </span>
            </el-tab-pane>
          </el-tabs>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="more el-icon-menu"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="false"
                command="refresh"
                icon="el-icon-refresh"
                >刷新</el-dropdown-item
              >
              <el-dropdown-item command="else" icon="el-icon-close"
                >关闭其他</el-dropdown-item
              >
              <el-dropdown-item command="left" icon="el-icon-back"
                >关闭左侧</el-dropdown-item
              >
              <el-dropdown-item command="right" icon="el-icon-right"
                >关闭右侧</el-dropdown-item
              >
              <el-dropdown-item command="all" icon="el-icon-finished"
                >关闭全部</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 头部标题 -->
        <div class="headerT headerT-commonStyle" v-if="$route.name !== 'Home'">
          <span></span>
          <span>{{
            $store.state.newMenuName
              ? $store.state.newMenuName
              : $route.meta.menuName
          }}</span>
          <span
            class="el-icon-arrow-left"
            @click="$router.back()"
            v-if="$route.meta.back"
            >返回</span
          >
        </div>
        <!-- 页面视图 -->
        <router-view
          v-if="isRouterAlive"
          class="routerView"
          :class="[$route.name === 'Home' ? 'homeView' : '']"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/common/TopNav.vue";
import MenuNav from "@/components/common/MenuNav.vue";
import jsMixin from "@/mixins/navHistory.js";
export default {
  name: "NavLayout",
  components: {
    "top-nav": TopNav,
    "menu-nav": MenuNav,
  },
  provide() {
    return {
      reload: this.reload, //提供数据
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  props: {},
  mixins: [jsMixin],
  created() {},
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
        console.log("刷新页面");
      });
    },
  },
};
</script>

<style lang="less">
#nav-layout {
  width: 100%;
  height: 100%;
  .topContainer {
    width: 100%;
    height: 60px;
    background-color: rgba(47, 56, 70, 1);
    color: #fff;
  }
  .slide-page {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: space-between;
    .slideContainer {
      width: 200px;
      height: 100%;
      background-color: rgba(47, 56, 70, 1);
      color: #fff;
      overflow-y: auto;
    }
    .slideContainer::-webkit-scrollbar {
      display: none;
    }
    .pageContainer {
      width: calc(100% - 200px);
      height: 100%;
      background: #efefef;
      color: #333;
      padding: 0px;
      box-sizing: border-box;
      position: relative;

      .headerT {
        width: 98.5%;
        height: 50px;
        margin: 0 auto;
        margin-bottom: 10px;
        box-shadow: 3px 3px 5px #7f7f7f59;
      }
      .routerView {
        width: 98.5%;
        height: calc(100% - 70px - 45px);
        background: #fff;
        overflow: auto;
        box-sizing: border-box;
        padding: 12px;
        margin: 0 auto;
      }
      .homeView {
        height: calc(100% - 57px);
      }
    }
    .pageContainer.horizontal {
      width: calc(100% - 0px);
    }
  }

  .navHistoryTabsContainer {
    width: 100%;
    background-color: #fff;
    margin-bottom: 6px;
    .navHistoryTabs {
      width: calc(100% - 48px);
      float: left;
      .el-tabs__nav-next,
      .el-tabs__nav-prev {
        line-height: 40px;
        color: #666;
        i:hover {
          font-size: 14px;
          color: #000;
        }
      }
      .el-tabs__active-bar {
        display: none;
      }
      .el-tabs__header {
        margin: 0 auto;
      }
      .el-tabs__item {
        padding: 0 8px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        position: relative;
        border: 1px solid #ccc;
        min-width: 120px;
        border-bottom-left-radius: 12px;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 0px;
        border-top-left-radius: 0px;
        // clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
        margin-right: 2px;
        .tabSpan {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .point {
            display: inline-block;
            border-radius: 50%;
            background-color: #999;
            width: 8px;
            height: 8px;
            margin-right: 5px;
          }
          .point:hover {
            background-color: #000;
          }
          .el-icon-close {
            font-size: 12px;
            color: #999;
          }
          .el-icon-close:hover {
            background-color: transparent;
            color: #000;
            font-size: 14px;
          }
        }
      }
      .el-tabs__item.is-active {
        color: #eee;
        background: #0079fe;
        .tabSpan {
          .point {
            background-color: #eee;
          }
          .point:hover {
            background-color: #fff;
          }
          .el-icon-close {
            color: #eee;
          }
          .el-icon-close:hover {
            background-color: transparent;
            color: #fff;
            font-size: 14px;
          }
        }
      }
    }
    .more {
      float: right;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transform: rotate(45deg);
    }
  }
  .navHistoryTabsContainer-1 {
    width: 100%;
    background-color: #fff;
    margin-bottom: 4px;
    .navHistoryTabs {
      width: calc(100% -48px);
      .el-tabs__active-bar {
        display: none;
      }
      .el-tabs__header {
        margin: 0 auto;
      }
      .el-tabs__item {
        min-width: 120px;
        .tabSpan {
          .point,
          .close {
            display: none;
          }
        }
      }
      .el-tabs__item.is-active {
        color: #0079fe;
      }
    }
  }
}
</style>
