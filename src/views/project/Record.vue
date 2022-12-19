<!--
 * @Description: 生成记录列表
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-14 10:54:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-30 16:19:04
 * @FilePath: \web\src\views\project\Record.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div id="record">
    <div class="headerT-commonStyle" style="height: 30px; padding: 0px">
      <span style="display: none"></span>
      <span style="font-size: 14px">生成记录列表</span>
    </div>
    <my-avue-crud
      module="Record"
      :hideTopMenu="false"
      :searchObj="{
        type: -1,
      }"
      @queryAfter="queryAfter"
      @beforeOpen="beforeOpen"
    >
      <!-- tableName -->
      <template slot-scope="scope" slot="tableName">
        <div
          style="display: flex; flex-wrap: wrap; gap: 8px; margin-left: 10px"
          v-if="
            scope.row.tableName && scope.row.tableName.split(',').length <= 2
          "
        >
          <el-tag
            v-for="(item, index) in scope.row.tableName
              ? scope.row.tableName.split(',')
              : []"
            :key="item + index"
            type="info"
            >{{ item }}</el-tag
          >
        </div>
        <el-popover
          v-else
          placement="bottom"
          transition="zoom-in-top"
          :visible-arrow="false"
          width="500"
          trigger="hover"
        >
          <div style="display: flex; flex-wrap: wrap; gap: 8px">
            <el-tag
              v-for="(item, index) in scope.row.tableName
                ? scope.row.tableName.split(',')
                : []"
              :key="item + index"
              type="info"
              >{{ item }}</el-tag
            >
          </div>
          <el-button slot="reference" size="small" type="text">
            <div style="display: flex; flex-wrap: wrap; gap: 8px">
              <el-tag
                v-for="(item, index) in scope.row.tableName
                  ? scope.row.tableName.split(',').slice(0, 2)
                  : []"
                style="width: 66px"
                class="ellipsis"
                :key="item + index"
                type="info"
                >{{ item }}</el-tag
              >
              <el-tag
                key="99999999999999"
                type="info"
                v-if="
                  scope.row.tableName &&
                  scope.row.tableName.split(',').length > 2
                "
                >+{{ scope.row.tableName.split(",").length - 2 }}</el-tag
              >
              <i
                v-if="
                  scope.row.tableName &&
                  scope.row.tableName.split(',').length > 2
                "
                class="el-icon-arrow-down"
                style="margin-top: 8px; font-weight: 600; font-size: 20px"
              ></i>
            </div>
          </el-button>
        </el-popover>
      </template>
    </my-avue-crud>
  </div>
</template>

<script>
import MyAvueCrud from "@/components/common/MyAvueCrud.vue";
export default {
  name: "Record",
  components: {
    "my-avue-crud": MyAvueCrud,
  },
  data() {
    return {};
  },
  computed: {},
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    queryAfter(data) {
      if (data) {
        data.forEach((element) => {
          element.type1 = element.type;
        });
      }
    },
    beforeOpen(type, form, option) {
      if (type == "view") {
        option.viewTitle = "查看记录 - " + form.projectName;
      }
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#record {
}
</style>
