<!--
 * @Description: 纯css的横向滚动框
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-12-06 14:08:22
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-06 14:35:50
 * @FilePath: \web\src\components\common\scrolXDiv.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div
    style="position: relative; overflow: hidden"
    :style="{ height: height + 'px' }"
  >
    <div class="sxd-square" name="绘制一个正方形">
      <div
        class="sxd-box"
        name="继承正方形高度并旋转"
        :style="{ width: height + 'px' }"
      >
        <div class="sxd-rebox" name="旋转回原来的方向" v-bind="$attrs">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scrolXDiv",
  props: {
    // 提供一个纯css的横向滚动框，必须指定高度且只支持数字
    height: {
      default: 300,
      type: Number,
    },
  },
};
</script>
 
<style lang="less" scoped>
.sxd-square {
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
}
.sxd-box {
  transform: rotateZ(-90deg) rotateY(180deg);
  transform-origin: left top;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .sxd-rebox {
    transform: rotate(90deg) rotateX(180deg);
    transform-origin: left top;
  }
}
.sxd-box {
  &::-webkit-scrollbar {
    width: 3.5px;
    height: 3.5px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    background-color: #f5f5f5;
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.05);
    background-color: #c8c8c8;
  }
}
</style>