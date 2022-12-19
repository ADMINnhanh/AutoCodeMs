<!--
 * @Description: 
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-01 15:58:03
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-13 09:37:26
 * @FilePath: \web\src\components\modules\project\deleteProject.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box">
    <PopUpsFrame
      :height="225"
      width="500px"
      @submit="submit"
      @closure="closure"
    >
      <template v-slot:title>
        <slot name="title"></slot>
      </template>
      <template v-slot:content>
        <div class="warn">!</div>
        <p>如需删除，请验证当前账号登录密码</p>
        <el-input
          show-password
          v-model="password"
          placeholder="请输入密码"
        ></el-input>
      </template>
    </PopUpsFrame>
  </div>
</template>

<script>
import PopUpsFrame from "../../common/popUpsFrame.vue";
export default {
  components: {
    PopUpsFrame,
  },
  props: ["upData"],
  data() {
    return {
      password: "",
    };
  },
  methods: {
    submit() {
      // console.log("删除项目");
      this.$emit("submit", { password: this.password, upData: this.upData });
    },
    closure() {
      this.$emit("closure");
    },
  },
};
</script>

<style lang="less" scoped>
.pop_ups_box {
  position: fixed;
  top: 60px;
  height: calc(100% - 60px);
  background-color: rgba(0, 0, 0, 0.397);
  z-index: 10;
}
.warn {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 55px;
  background-color: #266ef5;
  font-weight: 700;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
p {
  text-align: center;
  line-height: 32px;
}
.el-input {
  width: 70%;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
}
</style>