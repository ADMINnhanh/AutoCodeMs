<!--
 * @Author: xcl
 * @Date: 2022-04-20 10:16:41
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-05 11:31:36
 * @Description: 项目根组件
-->
<template>
  <div id="app">
    <!-- 根据需要显示不同的布局情况 -->
    <component :is="layout"></component>
  </div>
</template>

<script>
import BlankLayout from "@/layout/BlankLayout.vue";
import NavLayout from "@/layout/NavLayout.vue";
import { getQueryString } from "@/utils/uri.js";
export default {
  name: "App",
  components: {
    "nav-layout": NavLayout,
    "blank-layout": BlankLayout,
  },
  data() {
    return {};
  },
  props: {
    layout: {
      type: String,
      default: "nav-layout",
    },
  },
  watch: {
    // $route: {
    //   handler(to, from) {
    //     // console.log(to, from);
    //     if (from.path) {
    //       sessionStorage.setItem("historyName", from.name);
    //       if (this.$route.name && this.$route.name != "Login") {
    //         this.isToken();
    //       }
    //     }
    //   },
    //   deep: true,
    // },
  },
  created() {},
  destroyed() {},
  mounted() {
    // if (this.$route.name && this.$route.name != "Login") {
    //   this.isToken();
    // }

    this.window_resize();
  },
  methods: {
    isToken: function () {
      let self = this;
      /* 获取token */
      let token = sessionStorage.getItem("token") || getQueryString("token");
      if (!token) {
        // 清除缓存
        sessionStorage.clear();
        // localStorage.clear();

        // 跳转
        // window.location.href = window.location.origin + "/#/login";
        self.$router.push({ name: "Login" });
      }
    },

    window_resize() {
      let self = this;
      function windowSize() {
        self.$store.commit("common_store_fun", function (e) {
          e.VW = window.innerWidth;
          e.VH = window.innerHeight;
          return e;
        });
      }
      windowSize();
      window.addEventListener("resize", windowSize);
      this.$once("hook:beforeDestroy", () => {
        console.log("hook:beforeDestroy");
        window.removeEventListener("resize", windowSize);
      });
    },
  },
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  min-width: 1280px;
}
</style>
