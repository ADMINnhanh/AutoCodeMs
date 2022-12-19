<!--
 * @Description: 联表管理
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-14 17:45:04
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-14 15:54:33
 * @FilePath: \web\src\components\modules\projectDetails\LinkTable.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div id="linktable">
    <div class="headerT-commonStyle" style="height: 30px; padding: 0px">
      <span style="display: none"></span>
      <span style="font-size: 14px">关联集列表</span>
    </div>
    <my-avue-crud
      ref="crud"
      module="LinkTable"
      :hideTopMenu="false"
      :extraParams="{ projectId: projectId }"
      :pageSize="100"
      layout="total, prev, pager, next, jumper"
      @queryAfter="queryAfter"
      @beforeOpen="beforeOpen"
    >
      <template slot-scope="{ size }" slot="menuLeft">
        <el-button type="primary" :size="size" @click="addTable">
          <i class="icon iconfont icon-tianjia"></i>
          新增关联集
        </el-button>
        <el-button
          :disabled="
            $refs.crud && $refs.crud.ids && $refs.crud.ids.length > 0
              ? false
              : true
          "
          :size="size"
          @click="generateCode"
        >
          <i class="icon iconfont icon-xiazai"></i>
          生成代码
        </el-button>
      </template>
      <template slot-scope="{ type, size, row }" slot="menu">
        <el-button
          :size="size"
          :type="type"
          icon="el-icon-edit"
          @click.stop="editTable(row)"
          >编辑</el-button
        >
      </template>
      <!-- sonName -->
      <template slot-scope="" slot="sonNameHeader">
        子表（子表字段<i class="iconfont icon-guanlian"></i>父表字段）
      </template>
      <template slot-scope="" slot="sonName1Label">
        <p style="text-align: center">
          子表（子表字段<i class="iconfont icon-guanlian"></i>父表字段）
        </p>
      </template>
      <template slot-scope="scope" slot="sonName">
        <div
          style="display: flex; flex-wrap: wrap; gap: 8px; margin-left: 10px"
          v-if="scope.row.sonName && scope.row.sonName.split(';').length <= 1"
        >
          <el-tag
            v-for="(item, index) in scope.row.sonName
              ? scope.row.sonName.split(';')
              : []"
            :key="item + index"
            type="info"
          >
            {{ item.split(",")[0] }} （ {{ item.split(",")[1]
            }}<i class="iconfont icon-guanlian"></i> {{ item.split(",")[2] }}）
          </el-tag>
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
              v-for="(item, index) in scope.row.sonName
                ? scope.row.sonName.split(';')
                : []"
              :key="item + index"
              type="info"
            >
              {{ item.split(",")[0] }} （ {{ item.split(",")[1]
              }}<i class="iconfont icon-guanlian"></i>
              {{ item.split(",")[2] }}）
            </el-tag>
          </div>
          <el-button slot="reference" size="small" type="text">
            <div style="display: flex; flex-wrap: wrap; gap: 8px">
              <el-tag
                v-for="(item, index) in scope.row.sonName
                  ? scope.row.sonName.split(';').slice(0, 1)
                  : []"
                style="width: 132px"
                class="ellipsis"
                :key="item + index"
                type="info"
              >
                {{ item.split(",")[0] }} （ {{ item.split(",")[1]
                }}<i class="iconfont icon-guanlian"></i>
                {{ item.split(",")[2] }}）
              </el-tag>
              <el-tag
                key="99999999999999"
                type="info"
                v-if="
                  scope.row.sonName && scope.row.sonName.split(';').length > 1
                "
                >+{{ scope.row.sonName.split(";").length - 1 }}</el-tag
              >
              <i
                v-if="
                  scope.row.sonName && scope.row.sonName.split(';').length > 1
                "
                class="el-icon-arrow-down"
                style="margin-top: 8px; font-weight: 600; font-size: 20px"
              ></i>
            </div>
          </el-button>
        </el-popover>
      </template>
      <template slot-scope="scope" slot="sonNameForm">
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-left: 10px;
            padding: 12px;
          "
        >
          <el-tag
            v-for="(item, index) in scope.value ? scope.value.split(';') : []"
            :key="item + index"
            type="info"
          >
            {{ item.split(",")[0] }} （ {{ item.split(",")[1]
            }}<i class="iconfont icon-guanlian"></i> {{ item.split(",")[2] }}）
          </el-tag>
        </div>
      </template>
    </my-avue-crud>
    <!-- 关联集新增/编辑 -->
    <LinkTableTransfer
      v-if="Transfer_view"
      :Transfer_data="Transfer_data"
      @submit="upData"
      @closure="Transfer_view = false"
    ></LinkTableTransfer>
    <!-- 生成代码 -->
    <generate-code
      ref="generateCode"
      :treeData="treeData"
      :treeCheckedNodes="return_treeCheckedNodes()"
      @save="savecode"
      @cancel="cancel"
    ></generate-code>
  </div>
</template>

<script>
import MyAvueCrud from "@/components/common/MyAvueCrud.vue";
import GenerateCode from "@/components/modules/projectDetails/GenerateCodeLink.vue";

import LinkTableTransfer from "@/components/modules/project/linkTableTransfer.vue";

export default {
  name: "LinkTable",
  components: {
    "my-avue-crud": MyAvueCrud,
    generateCode: GenerateCode,
    LinkTableTransfer,
  },
  data() {
    return {
      projectId: parseInt(this.$route.query.id),
      // 顶部 选项卡切换
      tabType: {},
      tabsOption: {
        position: "top",
        type: "card",
        column: [
          {
            icon: "el-icon-info",
            label: "项目1",
            prop: "tab1",
            disabled: false,
          },
          {
            icon: "el-icon-info",
            label: "项目2",
            prop: "tab2",
            disabled: false,
          },
          {
            icon: "el-icon-info",
            label: "项目3",
            prop: "tab3",
            disabled: false,
          },
        ],
      },

      // 穿梭框
      Transfer_view: false,
      Transfer_data: null,

      treeData: [],
    };
  },
  computed: {
    api() {
      return require(`@/api/LinkTable`).default(this);
    },
  },
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    upData() {
      this.Transfer_view = false;
      this.$refs.crud.getList();
    },

    // ======================= 按钮 生成代码 ======================= //
    return_treeCheckedNodes() {
      let selectData = this.$refs.crud ? this.$refs.crud.selectData : [];
      let result = [];
      selectData.forEach((ele, eleIndex) => {
        if (ele.son && ele.son.split(";").length > 0) {
          const sons = ele.son.split(";");
          const sonNames = ele.sonName.split(";");
          sons.forEach((item, itemIndex) => {
            result.push({
              name: sonNames[itemIndex],
              id: item,
              fatherId: ele.father,
            });
          });
        }
      });
      return result;
    },
    queryAfter(data) {
      if (data) {
        let treeData = [];
        data.forEach((ele, eleIndex) => {
          let obj = {
            name: ele.name + "（" + ele.fatherName + "）",
            id: ele.father,
            fatherId: null,
          };
          obj.children = [];
          if (ele.son && ele.son.split(";").length > 0) {
            const sons = ele.son.split(";");
            const sonNames = ele.sonName.split(";");
            sons.forEach((item, itemIndex) => {
              obj.children.push({
                name: sonNames[itemIndex],
                id: item,
                fatherId: ele.father,
              });
            });
          }
          treeData.push(obj);
        });
        this.treeData = treeData;
        // console.log(data, treeData);
      }
    },
    beforeOpen(type, form, option) {
      if (type == "view") {
        option.viewTitle = "查看关联集 - " + form.name;
      }
    },
    generateCode() {
      this.$refs.generateCode.handleOpen();
    },
    savecode(form, done) {
      let self = this;
      this.api
        .generateCode(form)
        .then((res) => {
          if (res.data) {
            // 下载附件
            this.$common._fileBold_octet(res);
            // 用于多选表格，清空用户的选择
            this.$refs.crud.$refs["crud-LinkTable"].toggleSelection();
            // 提示
            this.$message.success(res.msg || "成功");
            done();
          } else {
            // 提示
            this.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(function (error) {
          self.$message.error(error);
        });
    },
    cancel() {
      // 清空
      this.$refs.crud.$refs["crud-LinkTable"].toggleSelection();
    },

    // ======================= 表格 自定义新增、编辑 ======================= //
    addTable(row) {
      // console.log(row);
      this.Transfer_view = true;
      this.Transfer_data = null;
    },
    editTable(row) {
      // console.log(row);
      this.Transfer_view = true;
      this.Transfer_data = row;
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#linktable {
}
</style>
