<!--
 * @Author: xcl
 * @Date: 2022-04-20 18:03:02
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-28 10:54:41
 * @Description: 顶部导航组件
-->
<template>
  <div id="top-nav">
    <div class="title">
      <!-- 代码自动生成 -->
      <img src="@/assets/u24.png" alt="" />
    </div>
    <transition name="el-fade-in-linear">
      <menu-nav
        class="horizontalMenu"
        v-if="$store.state.navMode == 'horizontal'"
      ></menu-nav>
    </transition>
    <div class="icons">
      <el-avatar
        :size="36"
        :src="user ? user.headImage : ''"
        @error="errorHandler"
        @click.native="skipUser()"
        class="userinfo"
      >
        <img
          class="userinfo"
          @click="skipUser()"
          src="../../assets/images/default.png"
          alt=""
        />
      </el-avatar>
      <span class="userinfo username" @click="skipUser()">{{
        user ? user.username : "用户"
      }}</span>
      <el-tooltip
        class="item"
        effect="dark"
        content="切换导航"
        placement="bottom"
      >
        <i class="el-icon-sort" @click="changeNav()"></i>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="退出系统"
        placement="bottom"
      >
        <i class="icon iconfont icon-tuichu" @click="logOut()"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import MenuNav from "@/components/common/MenuNav.vue";
export default {
  name: "TopNav",
  components: { "menu-nav": MenuNav },
  beforeMount() {},
  data() {
    return {
      user: sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : null,
    };
  },
  props: {},
  watch: {},
  created() {},
  beforeDestroy() {},
  destroyed() {},
  mounted() {},
  methods: {
    /**
     * 跳转用户管理
     */
    skipUser() {
      this.$router.push({
        name: "User",
      });
    },

    /**
     * 头像的error处理
     */
    errorHandler() {
      return true;
    },

    /**
     * 切换导航
     */
    changeNav() {
      if (this.$store.state.navMode == "vertical") {
        this.$store.commit("setNavMode", "horizontal");
        document.body.classList.add("horizontal");
        document.body.classList.remove("vertical");
      } else {
        this.$store.commit("setNavMode", "vertical");
        document.body.classList.add("vertical");
        document.body.classList.remove("horizontal");
      }
    },
    /**
     * 退出系统
     */
    logOut() {
      let self = this;
      self
        .$confirm("您将退出系统，是否继续？", "退出系统", {
          confirmButtonText: "退出系统",
          cancelButtonText: "取消",
          type: "success",
          iconClass: "el-icon-switch-button",
          customClass: "logOutMessageBox",
          showClose: false,
          cancelButtonClass: "",
          confirmButtonClass: "el-icon-circle-check",
          closeOnClickModal: true,
          roundButton: false,
          center: true,
        })
        .then(function () {
          let config = {
            url: `${self.$common.basePath}/session/logout`,
            method: "get",
            data: {},
            hideLoading: true,
          };
          self
            .axios(config)
            .then(function (res) {
              // 跳转
              self.$router.push({ name: "Login", params: {} });
              // window.location.href = `/#/login`
              // 清除缓存
              sessionStorage.clear();
              // localStorage.clear();
            })
            .catch(function (error) {
              console.error(error);
              // self.$message.error(error);
            });
        })
        .catch(function () {});
    },
  },
};
</script>

<style lang="less" scoped>
#top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  .title {
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: rgb(255, 254, 254);
    img {
      width: 186px;
      height: 19px;
    }
  }
  .horizontalMenu {
    width: calc(100% - 480px);
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
  }
  .icons {
    display: flex;
    align-items: center;
    .userinfo {
      cursor: pointer;
    }
    .username {
      display: inline-block;
      line-height: 60px;
      text-align: center;
      height: 60px;
      padding: 0 15px 0 10px;
      font-size: 18px;
      color: #fff;
    }
    i {
      display: inline-block;
      line-height: 60px;
      text-align: center;
      height: 60px;
      width: 45px;
      font-size: 24px;
      color: #f1f1f1;
    }
    i:hover {
      background-color: rgba(0, 121, 254, 1);
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
