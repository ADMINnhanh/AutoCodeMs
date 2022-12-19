<!--
 * @Author: xcl
 * @Date: 2022-04-20 18:04:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-20 18:11:38
 * @Description: 空白布局
-->
<template>
  <div id="blank-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "BlankLayout",
  components: {},
  data() {
    return {};
  },
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
#blank-layout {
  width: 100%;
  height: 100%;
}
</style>
