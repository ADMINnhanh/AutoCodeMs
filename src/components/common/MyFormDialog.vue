<!--
 * @Description: 自定义的表单弹窗-外框/容器
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-11 15:09:17
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-17 10:25:25
 * @FilePath: \web\src\components\common\MyFormDialog.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box">
    <section :style="{ width, height: height + 'px' }" class="pop_ups_frame">
      <head class="title">
        <span><slot name="title"></slot></span>
        <i @click="$emit('close')" class="el-icon-close"></i>
      </head>
      <div class="content myFormDialog">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MyFormDialog",
  components: {},
  props: {
    width: {
      type: String,
      default: "50%",
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.pop_ups_box {
  position: fixed;
  top: 60px;
  left: 200px;
  width: calc(100% - 200px);
  height: calc(100% - 60px);
  background-color: rgba(0, 0, 0, 0.397);
  z-index: 10;
}
.pop_ups_frame {
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 16px 24px;
    background-color: rgba(214, 214, 214, 0.63);
    font-size: 20px;
    font-weight: 600;
    i {
      color: rgb(117, 117, 117);
      font-size: 20px;
      cursor: pointer;
      font-weight: 900;
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 52px - 60px);
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
  }
  .footer {
    width: 100%;
    height: 60px;
    border-top: 1px solid #e4e7ed;
    background: #fff;
    text-align: right;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  // 隐藏表单底部操作菜单
  .myFormDialog {
    /deep/.avue-form__menu {
      display: none;
    }
  }
}
</style>