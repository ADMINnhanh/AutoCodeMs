<!--
 * @Description: 项目列表 -> 项目详情
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-02 14:28:58
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-15 10:46:15
 * @FilePath: \web\src\views\project\ProjectDetails.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div id="projectDetails">
    <div style="width: 100%; overflow: hidden">
      <div style="width: 260px; float: left">
        <div
          class="headerT-commonStyle"
          style="height: 40px; padding: 0px; padding-top: 10px"
        >
          <span style="display: block"></span>
          <span style="font-size: 14px">表信息</span>
        </div>
        <!-- 左侧 树 -->
        <div style="width: 100%; margin-bottom: 10px; text-align: center">
          <el-button size="small" @click="addTable" type="primary">
            <i class="el-icon-circle-plus-outline"></i>
            新增表
          </el-button>
          <el-button style="margin-left: 16px" size="small" v-copy="upData">
            <i class="icon iconfont icon-tianjia"></i>
            从已有项目复制表
          </el-button>
        </div>
        <left-tree ref="tree" @changeName="changeName"></left-tree>
      </div>
      <div
        style="
          width: calc(100% - 260px);
          float: left;
          box-sizing: border-box;
          padding: 20px 0 20px 20px;
        "
      >
        <div class="headerT-commonStyle" style="height: 50px">
          <span></span>
          <span style="font-size: 14px">{{
            $refs.tree ? $refs.tree.returnActiveName : name ? name : ""
          }}</span>
        </div>
        <!-- 分页表格 选项卡切换 -->
        <avue-tabs
          ref="tabs"
          :option="tabsOption"
          @change="handleChange"
        ></avue-tabs>
        <!-- 右侧 分页表格-字段信息 -->
        <my-avue-crud
          ref="FieldInfo"
          v-show="tabType.prop === 'tab1'"
          module="FieldInfo"
          :isInit="false"
          :hideTopMenu="false"
          :extraParams="{
            tableId: $refs.tree
              ? $refs.tree.active
              : $route.query.tableId
              ? $route.query.tableId
              : null,
          }"
          :deleteProps="[
            'condition',
            'meaning',
            'functionList',
            'sort',
            'type',
            'dictName',
          ]"
          :extraForm="{
            tableId: $refs.tree
              ? $refs.tree.active
              : $route.query.tableId
              ? $route.query.tableId
              : null,
          }"
          @beforeOpen="beforeOpen"
          @queryAfter="queryAfter"
          @addBefore="addBefore"
          @updateBefore="addBefore"
          @addAfter="refreshData"
          @updateAfter="refreshData"
          @delAfter="refreshData"
          @batchDelAfter="refreshData"
        >
          <template slot-scope="{ size }" slot="menuLeft">
            <div class="commonField">
              <span class="label">常用字段：</span>
              <div class="commonField-tags">
                <scrolXDiv :height="32">
                  <el-tag
                    v-for="item in commonFieldList"
                    :type="item.checked ? 'primary' : 'info'"
                    :key="item.id"
                    :size="size"
                    :class="item.checked ? 'primary' : 'info'"
                    @click="addCommon(item)"
                    >{{ item.name }}</el-tag
                  >
                </scrolXDiv>
              </div>
            </div>
          </template>
        </my-avue-crud>
        <!-- 右侧 分页表格-功能信息 -->
        <my-avue-crud
          ref="FunctionInfo"
          v-show="tabType.prop === 'tab2'"
          module="FunctionInfo"
          :isInit="false"
          :hideTopMenu="true"
          :isBatchDelBtn="false"
          :extraParams="{
            tableId: $refs.tree
              ? $refs.tree.active
              : $route.query.tableId
              ? $route.query.tableId
              : null,
          }"
          @queryAfter="queryAfter2"
          @beforeOpen="beforeOpen2"
        >
          <template slot-scope="{ type, size, row }" slot="menu">
            <el-button
              :size="size"
              :type="type"
              icon="el-icon-edit"
              @click.stop="editfield(row)"
              >编辑字段</el-button
            >
            <el-popover
              placement="bottom"
              transition="zoom-in-top"
              :visible-arrow="false"
              :width="row.fields && row.fields.length > 0 ? '500' : '100'"
              trigger="hover"
            >
              <div
                style="display: flex; flex-wrap: wrap; gap: 8px"
                v-if="row.fields && row.fields.length > 0"
              >
                <el-tag v-for="item in row.fields" :key="item.id" type="info">{{
                  item.name
                }}</el-tag>
              </div>
              <div v-else style="text-align: center">暂无数据</div>
              <el-button
                slot="reference"
                style="margin-left: 10px"
                :size="size"
                :type="type"
                icon="el-icon-arrow-down"
                >字段详情</el-button
              >
            </el-popover>
          </template>
        </my-avue-crud>
      </div>
    </div>
    <!-- 编辑字段 - 穿梭框 -->
    <transfer
      v-if="Transfer_view"
      :Transfer_data="Transfer_data"
      @submit="upDataFunctionInfo"
      @closure="Transfer_view = false"
    ></transfer>
  </div>
</template>

<script>
import LeftTree from "@/components/modules/projectDetails/LeftTree.vue";
import MyAvueCrud from "@/components/common/MyAvueCrud.vue";
import Transfer from "@/components/modules/projectDetails/Transfer.vue";
import scrolXDiv from "@/components/common/scrolXDiv.vue";
export default {
  name: "ProjectDetails",
  components: {
    "left-tree": LeftTree,
    "my-avue-crud": MyAvueCrud,
    transfer: Transfer,
    scrolXDiv,
  },
  data() {
    return {
      name: "",
      // 分页表格 选项卡切换
      tabType: {},
      tabsOption: {
        position: "top",
        type: "",
        column: [
          {
            icon: "",
            label: "字段信息",
            prop: "tab1",
            disabled: false,
          },
          {
            icon: "",
            label: "功能信息",
            prop: "tab2",
            disabled: false,
          },
        ],
      },

      // 穿梭框
      Transfer_view: false,
      Transfer_data: null,

      // 常用字段列表
      commonFieldList: [],
      // 某一激活表的所有
      oneTableFieldList: [],
    };
  },
  computed: {
    api() {
      return require(`@/api/FieldInfo`).default(this);
    },
  },
  props: {},
  watch: {},
  created() {
    this.tabType = this.tabsOption.column[0];
  },
  mounted() {
    this.$store.commit(
      "setNewMenuName",
      this.$route.query.name + " - 项目详情"
    );
  },
  methods: {
    upData() {
      this.$refs.tree.getList();
    },
    upDataFunctionInfo() {
      this.$refs.FunctionInfo.getList();
      this.Transfer_view = false;
    },

    // ======================= 左侧 树 ======================= //
    addTable() {
      // console.log(this.$refs.tree.$refs.tree);
      this.$refs.tree.$refs.tree.form = {};
      this.$refs.tree.dialogType = "add";
      this.$refs.tree.option.formOption.column[3].display = true;
      this.$refs.tree.$refs.tree.rowAdd();
    },
    changeName(name) {
      this.name = name;
    },

    // ======================= 表格顶部 选项卡切换 ======================= //
    handleChange(column) {
      this.tabType = column;
    },

    // ======================= 右侧 分页表格-字段信息 ======================= //
    beforeOpen(type, form, option, isCopy) {
      if (isCopy && type == "add") {
        form.name = form.name + "_copy";
      }
      if (type == "add") {
        option.addTitle =
          "新增字段 - " +
          (this.$refs.tree ? this.$refs.tree.returnActiveName : "");
      }
      if (type == "edit") {
        option.editTitle =
          "编辑字段 - " +
          (this.$refs.tree ? this.$refs.tree.returnActiveName : "") +
          " - " +
          form.name;
      }
      if (type == "view") {
        option.viewTitle =
          "查看字段 - " +
          (this.$refs.tree ? this.$refs.tree.returnActiveName : "") +
          " - " +
          form.name;
      }
    },
    queryAfter(data) {
      if (data) {
        data.forEach((ele) => {
          const functionList = ele.functionList;
          ele.functionIds = []; // 1, 2, 3, 4, 5, 6
          ele.condition = 0; // 7 8
          ele.meaning = 0; // 9 10 11
          if (functionList && functionList.length > 0) {
            functionList.forEach((element) => {
              if ([1, 2, 3, 4, 5, 6].indexOf(element.id) != -1) {
                ele.functionIds.push(element.id);
              }
              if ([7, 8].indexOf(element.id) != -1) {
                ele.condition = element.id;
              }
              if ([9, 10, 11].indexOf(element.id) != -1) {
                ele.meaning = element.id;
              }
            });
          }
        });
      }
    },
    addBefore(form, row) {
      const data = row ? row : form;
      // 新增编辑，不选字典我传0
      if (!form.dictTypeId) {
        form.dictTypeId = 0;
      }
      // 字段功能处理
      if (!form.functionIds) {
        form.functionIds = [];
      }
      if (form.condition) {
        form.functionIds.push(data.condition);
      }
      if (form.meaning) {
        form.functionIds.push(data.meaning);
      }
    },
    refreshData() {
      // 刷新常用字段的状态
      let tableId = this.$refs.tree
        ? this.$refs.tree.active
        : this.$route.query.tableId
        ? this.$route.query.tableId
        : null;
      this.getFieldByTableId(tableId, this.commonFieldList);
      // 刷新功能信息列表
      this.$refs.FunctionInfo && this.$refs.FunctionInfo.getList();
    },
    addCommon(item) {
      // console.log(item);
      let self = this;
      let tableName = this.$refs.tree
        ? "【" + this.$refs.tree.returnActiveName + "】"
        : "";
      if (item.checked) {
        // self.$message({
        //   type: "info",
        //   message: `已添加到该字段表${tableName}中了`,
        // });
        this.$confirm(
          `该操作将把常用字段【${item.name}】从该字段表${tableName}中移除，是否继续?`,
          "提示",
          {
            confirmButtonText: "移除",
            cancelButtonText: "取消",
            type: "warning",
            customClass: "myDelMsg",
          }
        )
          .then(() => {
            let id = self.oneTableFieldList.filter((ele) => {
              return ele.name == item.name;
            })[0].id;
            self.api
              .del(id)
              .then(function (res) {
                if (res.code == 200) {
                  // 刷新常用字段的状态
                  self.getFieldByTableId(item.tableId, self.commonFieldList);
                  // 刷新列表
                  self.$refs.FieldInfo && self.$refs.FieldInfo.getList();
                  // 提示
                  self.$message.success(res.msg || "移除成功！");
                } else {
                  // 提示
                  self.$message.error(res.msg || res.error || "错误！");
                }
              })
              .catch(function (error) {
                // 提示
                self.$message.error(error);
              });
          })
          .catch(() => {
            self.$message({
              type: "info",
              message: "已取消移除",
            });
          });
      } else {
        this.$confirm(
          `该操作将把常用字段【${item.name}】添加到该字段表${tableName}中，是否继续?`,
          "提示",
          {
            confirmButtonText: "添加",
            cancelButtonText: "取消",
            type: "warning",
            customClass: "myDelMsg",
          }
        )
          .then(() => {
            let config = {
              url: `${self.$common.basePath}/defaultfield/addById`,
              method: "post",
              data: {
                id: item.id,
                tableId: item.tableId,
              },
              hideLoading: true,
            };
            self
              .axios(config)
              .then(function (res) {
                if (res.code == 200) {
                  // 刷新常用字段的状态
                  self.getFieldByTableId(item.tableId, self.commonFieldList);
                  // 刷新列表
                  self.$refs.FieldInfo && self.$refs.FieldInfo.getList();
                  // 提示
                  self.$message.success(res.msg || "添加成功！");
                } else {
                  // 提示
                  self.$message.error(res.msg || res.error || "错误！");
                }
              })
              .catch(function (error) {
                // 提示
                self.$message.error(error);
              });
          })
          .catch(() => {
            self.$message({
              type: "info",
              message: "已取消添加",
            });
          });
      }
    },
    // 获取所有常用字段
    getCommonFieldList(active) {
      let self = this;
      let config = {
        url: `${self.$common.basePath}/defaultfield/getList`,
        method: "post",
        data: {
          dictTypeId: parseInt(self.$route.query.datasourceType), //数据库类型id
          type: 0, // 分类 -1查所有 0.数据库类型 1.业务类型
        },
        hideLoading: true,
      };
      self
        .axios(config)
        .then(function (res) {
          if (res.code == 200) {
            self.commonFieldList = res.data;
          } else {
            self.commonFieldList = [];
            // 提示
            self.$message.error(res.msg || res.error || "错误！");
          }
          self.getFieldByTableId(active, self.commonFieldList);
        })
        .catch(function (error) {
          // 提示
          self.$message.error(error);
        });
    },
    // 根据TableId获取所有字段
    getFieldByTableId(active, list) {
      let self = this;
      let config = {
        url: `${self.$common.basePath}/field/getFieldByTableId`,
        params: {
          tableId: active ? active : self.$route.query.tableId,
        },
        method: "get",
        hideLoading: true,
      };
      self
        .axios(config)
        .then(function (res) {
          if (res.code == 200) {
            self.oneTableFieldList = res.data;
            // 检测常用字段是否已经存在字段列表中 && 把tableId加进去
            let names = self.oneTableFieldList.map((item) => {
              return item.name;
            });
            if (list.length > 0) {
              list.forEach((item) => {
                names.indexOf(item.name) != -1
                  ? (item.checked = true)
                  : (item.checked = false);
                item.tableId = active ? active : self.$route.query.tableId;
              });
            }
            // 解决 vue 数据未更新的bug
            self.$set(self, "commonFieldList", list);
            self.$forceUpdate();
          } else {
            self.oneTableFieldList = [];
            // 提示
            self.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(function (error) {
          // 提示
          self.$message.error(error);
        });
    },

    // ======================= 右侧 分页表格-功能信息 ======================= //
    queryAfter2(data) {
      if (data) {
        data.forEach((element) => {
          element.new_fields = "";
          if (element.fields && element.fields.length > 0) {
            element.fields.forEach((item, i) => {
              element.new_fields += (i > 0 ? "," : "") + item.name;
            });
          }
        });
      }
    },
    beforeOpen2(type, form, option) {
      if (type == "view") {
        option.viewTitle = "查看 - " + form.name;
      }
    },
    editfield(row) {
      // let form = {
      //   tableId: 1, // this.$refs.tree.active
      //   functionId: 1, // row.id
      //   fields: [1, 2, 3], // 穿梭框选中的值
      // };
      this.Transfer_view = true;
      row.tableId = this.$refs.tree.active;
      this.Transfer_data = row;
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#projectDetails {
  .commonField {
    position: absolute;
    left: 224px;
    top: 3px;
    width: calc(100% - 320px);
    height: 32px;
    overflow: hidden;
    .label {
      float: left;
      margin-right: 10px;
      font-size: 14px;
      color: #999;
      height: 32px;
      line-height: 32px;
    }
    .el-tag {
      display: inline-block;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .commonField-tags {
    float: left;
    width: calc(100% - 80px);
    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    line-height: 32px;
  }
}
</style>
