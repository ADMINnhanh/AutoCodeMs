<!--
 * @Description: 表的列表
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 13:59:09
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-13 15:16:38
 * @FilePath: \web\src\views\project\Table.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->

<template>
  <div id="table">
    <!-- 顶部 选项卡切换 -->
    <avue-tabs
      ref="tabs"
      :option="tabsOption"
      @change="handleChange"
    ></avue-tabs>

    <single-table v-if="tabType.prop == 'tab1'"></single-table>
    <link-table v-if="tabType.prop == 'tab2'"></link-table>
  </div>
</template>

<script>
import SingleTable from "@/components/modules/projectDetails/SingleTable.vue";
import LinkTable from "@/components/modules/projectDetails/LinkTable.vue";

export default {
  name: "Table",
  components: {
    "single-table": SingleTable,
    "link-table": LinkTable,
  },
  data() {
    return {
      // 顶部 选项卡切换
      tabType: {},
      tabsOption: {
        position: "top",
        type: "card",
        column: [
          {
            icon: "el-icon-info",
            label: "单表管理",
            prop: "tab1",
            disabled: false,
          },
          {
            icon: "el-icon-info",
            label: "联表管理",
            prop: "tab2",
            disabled: false,
          },
        ],
      },
    };
  },
  computed: {},
  props: {},
  watch: {},
  created() {
    this.tabType = this.tabsOption.column[0];
  },
  mounted() {
    this.$store.commit("setNewMenuName", this.$route.query.name + " - 表管理");
  },
  methods: {
    // ======================= 顶部 选项卡切换 ======================= //
    handleChange(column) {
      this.tabType = column;
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#table {
}
</style>
