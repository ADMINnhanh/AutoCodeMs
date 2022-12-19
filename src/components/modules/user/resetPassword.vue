<!--
 * @Description: 重置密码
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-16 14:20:13
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-02 09:49:09
 * @FilePath: \web\src\components\modules\user\resetPassword.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box resetPassword">
    <PopUpsFrame
      :height="325"
      width="400px"
      @submit="submit"
      @closure="closure"
    >
      <template v-slot:title> 重置密码 </template>
      <template v-slot:content>
        <div class="warn">!</div>
        <p>是否重置账号 【{{ user.username }}】的密码？</p>
        <avue-form ref="form" v-model="form" :option="option"></avue-form>
      </template>
    </PopUpsFrame>
  </div>
</template>

<script>
import PopUpsFrame from "../../common/popUpsFrame.vue";
import rulesUtils from "@/utils/rules";
export default {
  components: {
    PopUpsFrame,
  },
  props: ["user"],
  data() {
    let user_label = `请输入账号【${this.user.username}】的新密码`;
    return {
      form: {},
      option: {
        submitBtn: false,
        span: 24,
        labelPosition: "top",
        emptyBtn: false,
        column: [
          {
            type: "password",
            autocomplete: "new-password",
            label: "请输入登录密码验证身份",
            prop: "password",
            span: 24,
            type: "password",
            placeholder: "请填写登录密码",
            required: true,
            rules: [
              {
                required: true,
                message: "请填写登录密码",
              },
            ],
          },
          {
            span: 24,
            label: user_label,
            prop: "newPassword",
            autocomplete: "new-password",
            required: true,
            placeholder: "请填写新密码",
            type: "password",
            rules: [
              {
                required: true,
                message: "请填写新密码",
                trigger: "blur",
              },
              {
                min: 8,
                max: 20,
                message: "长度在 8 到 20 个字符",
                trigger: "blur",
              },
              {
                validator: function (rule, value, callback) {
                  rulesUtils.passwordNameStandard(rule, value, callback);
                },
                trigger: "blur",
              },
            ],
            tip: rulesUtils.passwordNameStandardTip,
            tipPlacement: rulesUtils.tipPlacement,
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