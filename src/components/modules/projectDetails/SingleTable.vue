<!--
 * @Description: 单表管理
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-16 11:27:09
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-15 08:46:55
 * @FilePath: \web\src\components\modules\projectDetails\SingleTable.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div id="singleTable">
    <div class="headerT-commonStyle" style="height: 30px; padding: 0px">
      <span style="display: none"></span>
      <span style="font-size: 14px">单表列表</span>
    </div>
    <my-avue-crud
      ref="crud"
      module="SingleTable"
      :hideTopMenu="false"
      :extraParams="{ projectId: parseInt($route.query.id) }"
      :extraForm="{ projectId: parseInt($route.query.id) }"
      @beforeOpen="beforeOpen"
      @getDicAfter="getDicAfter"
      @rowClick="rowClick"
      @addAfter="addAfter"
      @beforeClose="beforeClose"
      @queryAfter="queryAfter"
      :isOpenView="false"
      :pageSize="100"
      layout="total, prev, pager, next, jumper"
      :isToNext="false"
    >
      <template slot="menuLeft" slot-scope="{ size }">
        <el-button size="small" v-copy="upData">
          <i class="icon iconfont icon-tianjia"></i>
          从已有项目复制表
        </el-button>
        <el-button
          :size="size"
          :disabled="
            $refs.crud && $refs.crud.ids && $refs.crud.ids.length > 0
              ? false
              : true
          "
          @click="generateCode"
        >
          <i class="icon iconfont icon-xiazai"></i>
          生成代码
        </el-button>
      </template>
      <!-- <template slot-scope="{ type, size, row }" slot="menu">
        <el-button
          :size="size"
          :type="type"
          icon="el-icon-view"
          @click.stop="view(row)"
          >查看</el-button
        >
      </template> -->
      <!-- <template slot-scope="{ data, type }" slot="menuForm">
        <el-button
          type="primary"
          icon="el-icon-right"
          size="small"
          v-if="type == 'edit' || (type == 'add' && isAddSuccess)"
          plain
          @click="to(data, type)"
          >新增字段</el-button
        >
      </template> -->
    </my-avue-crud>

    <!-- 生成代码 -->
    <generate-code ref="generateCode"></generate-code>
  </div>
</template>

<script>
import MyAvueCrud from "@/components/common/MyAvueCrud.vue";
import GenerateCode from "@/components/modules/projectDetails/GenerateCode.vue";
export default {
  name: "SingleTable",
  components: { "my-avue-crud": MyAvueCrud, generateCode: GenerateCode },
  data() {
    return {
      isAddSuccess: false,
      isToNext_id: null,
    };
  },
  computed: {},
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    upData() {
      this.$refs.crud.getList();
    },
    beforeOpen(type, form, option, isCopy) {
      this.type = type;
      if (isCopy && type == "add") {
        form.name = form.name + "_copy";
      }
      if (type == "edit") {
        option.editTitle = "编辑表 - " + form.name;
      }
      if (type == "view") {
        option.viewTitle = "查看表 - " + form.name;
      }
    },
    getDicAfter(prop, res, col) {
      if (prop == "$dic_defaultFieldIds") {
        let value = res.map((item) => {
          return item.id;
        });
        col.value = value;
      }
    },
    rowClick(row) {
      this.view(row);
    },
    addAfter(res) {
      if (res.code == 200) {
        this.isAddSuccess = true;
      } else {
        this.isAddSuccess = false;
      }
    },
    queryAfter(data) {
      if (data && data.length > 0) {
        this.isToNext_id = data[0].id;
      }
    },
    beforeClose() {
      this.isAddSuccess = false;
    },
    to(data, type) {
      // console.log(type, data);
      if (this.type == "add") {
        data = Object.assign(data, { id: this.isToNext_id });
        this.view(data, true);
      }
      if (this.type == "edit") {
        this.view(data, true);
      }
    },

    // ======================= 【查看】按钮 ======================= //
    view(e, popups) {
      this.$router.push({
        name: "ProjectDetails",
        query: {
          id: e.projectId, // 项目id
          datasourceType: this.$route.query.datasourceType, // 数据库类型
          name: this.$route.query.name, // 项目名称
          prefix: this.$route.query.prefix, // 项目的表的统一前缀
          tableId: e.id, // 表id
          popups: popups ? popups : null, // 是否自动打开新增弹窗
          popupsModule: "FieldInfo", // 指定自动打开新增弹窗是哪个，非必传
        },
      });
    },

    // ======================= 【生成代码】按钮 ======================= //
    generateCode() {
      this.$refs.generateCode.handleOpen();
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" >
#singleTable {
  .avue-crud__left {
    button:nth-child(1) {
      i {
        font-size: 16px;
      }
    }
  }
}
</style>
