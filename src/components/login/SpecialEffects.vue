<!--
 * @Description: 登录页面-动画特效  组件
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-12-09 10:19:27
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-09 10:42:51
 * @FilePath: \web\src\components\login\SpecialEffects.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div class="SpecialEffects">
    <!-- spinner - 动画加载特效 -->
    <div class="spinnerDiv">
      <orbit-spinner
        :animation-duration="5 * 1000"
        :size="120"
        :color="color ? color : '#ff1d5e'"
      />
    </div>
    <!-- datav - 边框动画特效 -->
    <dv-border-box-8 class="dvDiv" :dur="20"></dv-border-box-8>
  </div>
</template>

<script>
import { OrbitSpinner } from "epic-spinners";

export default {
  name: "SpecialEffects",
  components: { "orbit-spinner": OrbitSpinner },
  beforeMount() {},
  data() {
    return {
      // spinner - 动画加载特效
      color: "",
      timer: null,
    };
  },
  props: {},
  watch: {},
  created() {},
  beforeDestroy() {},
  destroyed() {
    // 清除 spinner 的定时器
    this.timer ? clearInterval(this.timer) : "";
  },
  mounted() {
    // --------- 生成 spinner 的随机色
    this.timer ? clearInterval(this.timer) : "";
    this.color = this.randomColor();
    this.timer = setInterval(() => {
      this.color = this.randomColor();
    }, 5 * 1000);
  },
  methods: {
    /**
     * 生成随机色
     */
    randomColor() {
      var color = "rgb(";
      for (var i = 0; i < 3; i++) color += parseInt(Math.random() * 256) + ",";
      color = color.substring(0, color.length - 1) + ")";
      return color;
    },
  },
};
</script>

<style lang="less" scoped>
.SpecialEffects {
  // 动画加载特效
  .spinnerDiv {
    // width: 100%;
    // height: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    width: 120px;
    height: 120px;
    top: 2vh;
    right: 2vw;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 边框动画特效
  .dvDiv {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>
