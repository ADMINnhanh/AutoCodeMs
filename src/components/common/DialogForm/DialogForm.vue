<!--
 * @Description: 表单弹窗
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-24 14:33:34
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-12 09:58:14
 * @FilePath: \web\src\components\common\DialogForm\DialogForm.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
 
<template>
  <div class="pop_ups_box DialogForm_box" :id="id">
    <PopUpsFrame
      :height="height"
      :width="width"
      @submit="submit"
      @closure="closure"
    >
      <template v-slot:title>{{ title }} </template>
      <template v-slot:content>
        <avue-form ref="form" :option="option" v-model="data"></avue-form>
      </template>
      <template v-slot:customize>
        <el-button
          v-for="e in btn"
          :key="e.text"
          :type="e.type"
          :icon="e.icon"
          :disabled="e.disabled"
          @click="e.click(self)"
          size="small"
          >{{ e.text }}</el-button
        >
      </template>
    </PopUpsFrame>
  </div>
</template>

<script>
import PopUpsFrame from "@/components/common/popUpsFrame.vue";
export default {
  components: {
    PopUpsFrame,
  },
  data() {
    return {
      id: new Date() - 0,
      data: {},
      btn: [],
      self: this,
    };
  },
  mounted() {},
  methods: {
    submit() {
      //如果存在验证不通过，msg为错误信息
      this.$refs.form.validate((valid, done, msg) => {
        if (valid) {
          done();
          this.callback({
            data: this.data,
            close: this.closure,
            self: this,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closure() {
      this.beforeClose &&
        this.beforeClose({
          self: this,
        });
      document.body.removeChild(document.getElementById(this.id));
    },
  },
};
</script>

<style lang="less">
.DialogForm_box {
  .avue-form__menu--center {
    display: none;
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
  margin-bottom: 20px;
  font-size: 15px;
}
</style>