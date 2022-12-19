<!--
 * @Description: 
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-01 15:45:14
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-12 09:43:16
 * @FilePath: \web\src\components\common\popUpsFrame.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <section
    :style="{ width, height: height + 106 + 'px' }"
    class="pop_ups_frame"
  >
    <head class="title">
      <span><slot name="title"></slot></span>
      <i @click="$emit('closure')" class="el-icon-close"></i>
    </head>
    <div class="content" :style="{ height: height + 'px' }">
      <slot name="content"></slot>
    </div>
    <footer>
      <el-button icon="el-icon-close" size="small" @click="$emit('closure')"
        >取消</el-button
      >
      <el-button
        icon="el-icon-check"
        size="small"
        @click="$emit('submit')"
        type="primary"
        >确定</el-button
      >
      <slot name="customize"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  props: ["width", "height"],
};
</script>

<style lang="less" scoped>
.pop_ups_frame {
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 16px 24px;
    background-color: rgba(214, 214, 214, 0.63);
    font-size: 20px;
    font-weight: 600;
    span {
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      white-space: nowrap; //文本不会换行
    }
    i {
      color: rgb(117, 117, 117);
      font-size: 20px;
      cursor: pointer;
      font-weight: 900;
    }
  }
  .content {
    width: 100%;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
  }
  footer {
    width: 100%;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>