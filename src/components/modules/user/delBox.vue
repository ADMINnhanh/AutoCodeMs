<!--
 * @Description: 删除弹框
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-16 14:20:13
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-02 09:45:39
 * @FilePath: \web\src\components\modules\user\delBox.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box resetPassword">
    <PopUpsFrame
      :height="225"
      width="300px"
      @submit="submit"
      @closure="closure"
    >
      <template v-slot:title> 删除用户 </template>
      <template v-slot:content>
        <div class="warn">!</div>
        <p v-if="!user.batch">是否要删除用户 【{{ user.username }}】？</p>
        <p v-if="user.batch">
          是否要删除已选中的【{{ user.ids.length }}】个用户？
        </p>
        <p>如需删除，请验证当前账号登录密码</p>
        <avue-form ref="form" v-model="form" :option="option"></avue-form>
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
  props: ["user"],
  data() {
    return {
      form: {},
      option: {
        submitBtn: false,
        span: 24,
        emptyBtn: false,
        column: [
          {
            type: "password",
            label: "",
            labelWidth: 0,
            prop: "password",
            span: 24,
            // type: "input",
            placeholder: "请填写密码",
            autocomplete: "new-password",
            rules: [
              {
                required: true,
                message: "请填写密码",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      // 如果存在验证不通过
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          this.$emit("submit", this.form, done);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closure() {
      this.$emit("closure");
    },
  },
};
</script>

<style lang="less">
.resetPassword {
  .el-collapse-item__content {
    .avue-form__group {
      .avue-form__menu.avue-form__menu--center {
        display: none;
      }
    }
  }
}
</style>
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
  line-height: 28px;
}
.el-input {
  width: 70%;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
}
</style>