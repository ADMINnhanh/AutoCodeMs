<!--
 * @Author: xcl
 * @Date: 2022-04-20 18:04:45
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-09 10:43:58
 * @Description: 登录页面
-->
<template>
  <div id="login">
    <!-- webgl - 3d动画渲染 -->
    <webglBox></webglBox>
    <!-- 动画特效 -->
    <!-- <special-effects></special-effects> -->
    <!-- 用户登录 -->
    <div class="login-box">
      <h2>用户登录</h2>
      <form ref="ruleForm">
        <div class="user-box">
          <input
            v-model="ruleForm.username"
            type="text"
            name="username"
            @input="isShowTips = false"
            required=""
            autocomplete="new-password"
          />
          <label>账户</label>
          <div class="error">{{ ruleForm.username ? "" : "请输入账户" }}</div>
        </div>
        <div class="user-box">
          <input
            v-model="ruleForm.pass"
            type="password"
            name="pass"
            @input="isShowTips = false"
            required=""
            autocomplete="new-password"
          />
          <label>密码</label>
          <div class="error">{{ ruleForm.pass ? "" : "请输入密码" }}</div>
        </div>
        <a @click.prevent="submitForm('ruleForm')">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登 录
        </a>
      </form>
      <div v-if="isShowTips" class="tips" :class="{ red: tipsState == 'red' }">
        {{ tipsText }}
      </div>
    </div>
    <!-- 版权 -->
    <iframe
      style="position: fixed; bottom: 0; left: 0"
      src="http://175.155.179.248:90/copyright-white.html"
      frameborder="0"
      width="100%"
      height="50px"
    ></iframe>
  </div>
  <!-- <el-checkbox v-model="remember">记住密码</el-checkbox> -->
</template>

<script>
import snow from "@/mixins/snow.js";
import webglBox from "@/components/login/webglBox.vue";
import SpecialEffects from "@/components/login/SpecialEffects.vue";
export default {
  name: "Login",
  components: {
    "special-effects": SpecialEffects,
    webglBox,
  },
  data() {
    return {
      remember: localStorage.getItem("pass") ? true : false,
      loading: false,
      ruleForm: {
        pass: "",
        username: "",
      },
      isShowTips: false,
      tipsText: "",
      tipsState: "yellow",
    };
  },
  props: {},
  watch: {
    // 记住密码
    remember(newV, oldV) {
      if (newV) {
        if (this.ruleForm.pass) {
          localStorage.setItem("pass", this.ruleForm.pass);
        }
      } else {
        localStorage.removeItem("pass");
      }
    },
  },
  created() {},
  destroyed() {
    // 回车键
    window.removeEventListener("keypress", this.pressEnter);
  },
  mixins: [snow],
  mounted() {
    // --------- 键盘事件的监听
    window.addEventListener("keypress", this.pressEnter);
  },
  methods: {
    /**
     * 回车登录事件
     * @param  {[type]}                 event [description]
     * @return {[type]}                       [description]
     */
    pressEnter(event) {
      if (this.$route.path && this.$route.path == "/login") {
        // 仅在登录页调用此事件
        if (event.key == "Enter") {
          this.submitForm("ruleForm");
        }
      }
    },

    /**
     * -------------------- 账户密码登录 -------------------
     */
    submitForm(formName) {
      let self = this;
      if (self[formName] && self[formName].username && self[formName].pass) {
        self.loginFun();
      } else {
        self.isShowTips = true;
        self.tipsState = "yellow";
        self.tipsText = "请检查账户/密码是否填写";
      }
    },

    /**
     * --------------------登录function --------------------
     */
    loginFun() {
      let self = this;
      self.loading = true;
      let config = {
        url: `${self.$common.basePath}/session/login`,
        method: "post",
        data: {
          username: self.ruleForm.username,
          password: self.ruleForm.pass,
        },
        hideLoading: true,
      };
      self
        .axios(config)
        .then(function (res) {
          console.log(res);
          if (res.code == 200) {
            self.loading = false;
            localStorage.setItem("userName", self.ruleForm.username);
            self.remember
              ? localStorage.setItem("pass", self.ruleForm.pass)
              : localStorage.removeItem("pass");
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            self.$store.commit("setToken", res.token);
            self.$router.push({ name: "Home" });
            // self.$router.replace({ path: "/home/home" });
            // window.location.href = `/#/home/home`
            // window.location.reload()
          } else {
            sessionStorage.clear();
            localStorage.clear();
            self.loading = false;
            self.isShowTips = true;
            self.tipsState = "red";
            self.tipsText = res.msg;
            // self.$message.error(res.msg);
          }
        })
        .catch(function (error) {
          console.error(error);
          self.loading = false;
          self.isShowTips = true;
          self.tipsState = "red";
          self.tipsText = "出错了，请联系管理员！";
          // self.$message.error(error);
        });
    },
  },
};
</script>

<style lang="less">
@import url("../assets/style/snow.css");
#login {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);

  // 用户登录
  .login-box {
    z-index: 9;
    position: absolute;
    top: 50%;
    right: -5vw;
    width: 500px;
    padding: 50px;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    background: linear-gradient(
      20deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5),
      rgba(3, 233, 244, 0.1),
      rgba(3, 233, 244, 0.6)
    );
    background-image: url(../assets/images/login/login_bg.835458e7.png);
    background-size: 100% 100%;
    background-size: 120% 120%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    font-size: 24px;
    color: #fff;
    text-align: center;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }
  /* input 输入框 在自动填充时，背景颜色问题 */
  .login-box .user-box input:-internal-autofill-previewed,
  .login-box .user-box input:-internal-autofill-selected {
    -webkit-text-fill-color: #fff;
    transition: background-color 5000s ease-out 0.5s;
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
  }

  .login-box .user-box .error {
    top: 35px;
    left: 0;
    color: #f00;
    font-size: 12px;
    position: absolute;
    padding: 10px 0;
    pointer-events: none;
    transition: 0.5s;
    display: none;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }

  .login-box .user-box input:focus ~ .error,
  .login-box .user-box input:valid ~ .error {
    display: block;
  }

  .login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    margin-top: 40px;
    letter-spacing: 4px;
  }

  .login-box a:hover {
    // background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 100px #03e9f4;
  }

  .login-box a span {
    position: absolute;
    display: block;
  }

  .login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  .login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: 0.25s;
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }

  .login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: 0.5s;
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  .login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: 0.75s;
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }

  .tips {
    color: #f7f706;
    position: absolute;
    bottom: 24px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    left: 0;
    transition: 0.5s;
  }
  .tips.red {
    color: #f00;
  }

  .el-checkbox {
    margin-bottom: 40px !important;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
  }

  .el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #56e5ff;
    border-radius: 2px;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    background-color: transparent;
    z-index: 1;
  }

  .el-checkbox__inner::after {
    border: 2px solid #56e5ff;
    border-left: 0;
    border-top: 0;
    height: 8px;
    left: 5px;
    position: absolute;
    top: 2px;
  }

  .el-checkbox__label {
    font-size: 16px;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #56e5ff;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: transparent;
    border-color: #56e5ff;
  }
}
</style>
