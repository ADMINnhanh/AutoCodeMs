<!--
 * @Description: 项目详情/编辑页 -- 编辑功能字段
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-10 10:23:36
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-13 16:02:25
 * @FilePath: \web\src\components\modules\projectDetails\copyTableByHave.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box copyTableByHave" v-if="visible">
    <PopUpsFrame
      :height="685"
      width="1350px"
      @submit="submit"
      @closure="closure"
    >
      <template v-slot:title>从已有项目复制表</template>
      <template v-slot:content>
        <article>
          <aside>
            <el-input clearable placeholder="请输入项目名称" v-model="input">
              <el-button
                slot="append"
                @click="getListByProject"
                icon="el-icon-search"
              ></el-button>
            </el-input>
            <div class="project_box">
              <template v-for="e in project_arr">
                <div
                  :key="e.id + 'project'"
                  :class="e.id == now_project.id ? 'now_project' : ''"
                  @click="
                    now_project = e;
                    getPageByTable(e.id);
                  "
                  v-if="e.name.includes(input)"
                >
                  {{ e.name }}
                </div>
              </template>
            </div>
          </aside>
          <section class="list_box">
            <div class="headerT-commonStyle" style="height: 50px">
              <span></span>
              <span style="font-size: 14px">选择表</span>
              <el-input
                placeholder="表名称/表备注"
                v-model="keyword"
                clearable
                size="medium"
                @change="getPageByTable"
              >
                <el-button
                  @click="getPageByTable"
                  slot="append"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </div>
            <avue-crud
              class="list_box"
              ref="crud"
              :data="data"
              :option="option"
              :page.sync="page"
              @selection-change="selectionChange"
              @size-change="getPageByTable"
              @current-change="getPageByTable"
            >
            </avue-crud>
          </section>
          <section class="select_box">
            <div class="headerT-commonStyle" style="height: 50px">
              <span></span>
              <span style="font-size: 14px">已选表</span>
              <el-tooltip content="表名 <- 切换 -> 表备注" placement="bottom">
                <img
                  @click="
                    edit_type == 'name'
                      ? (edit_type = 'notes')
                      : (edit_type = 'name')
                  "
                  src="@/assets/images/toggle.png"
                  alt=""
                />
              </el-tooltip>
            </div>
            <div class="prefix">
              <span>前缀</span>
              <el-input v-model="prefix" placeholder="选填前缀"></el-input>
            </div>
            <div class="list_content">
              <template v-if="select_list_view">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="e.tooltip"
                  placement="top"
                  v-for="e in select_list"
                  :key="e.id"
                >
                  <div :class="e.repeat ? 'repeat' : ''">
                    <input
                      v-show="edit_type == 'name'"
                      class="clear_default_input"
                      type="text"
                      v-model="e.newName"
                      @change="selectionChange(false)"
                    />
                    <input
                      v-show="edit_type == 'notes'"
                      class="clear_default_input"
                      type="text"
                      v-model="e.newNotes"
                    />
                    <i @click="toggleSelection(e)" class="el-icon-close"></i>
                  </div>
                </el-tooltip>
              </template>
            </div>
          </section>
        </article>
      </template>
    </PopUpsFrame>
  </div>
</template>

<script>
import PopUpsFrame from "../../common/popUpsFrame.vue";
export default {
  components: {
    PopUpsFrame,
  },
  data() {
    return {
      visible: false,
      input: "",
      keyword: "",
      prefix: "",

      project_arr: [],

      now_project: undefined,

      data: [],
      option: {
        selection: true,
        selectionFixed: false,
        align: "center",
        reserveSelection: true,
        menu: false,
        height: 500,
        column: [
          {
            label: "表名称",
            prop: "name",
          },
          {
            label: "表备注",
            prop: "notes",
          },
          {
            label: "创建时间",
            prop: "createTime",
          },
          {
            label: "更新时间",
            prop: "updateTime",
          },
        ],
      },
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },

      select_list: [],
      select_list_view: true,

      edit_type: "name", // name / notes

      current_project: [],
    };
  },
  mounted() {},
  watch: {
    visible(now, old) {
      if (now) {
        let self = this;
        (async function () {
          await self.getListByProject();
          await self.getOneByProject();
          await self.getPageByTable();
          self.upDataByCurrentProject();
        })();
      } else {
        this.project_arr = [];
        this.select_list = [];
        this.input = "";
        this.keyword = "";
        this.edit_type = "name";
      }
    },
    prefix(now, old) {
      this.select_list = this.select_list.map((e) => {
        e.newName = e.newName.replace(new RegExp("^" + old), now);
        return e;
      });
    },
  },
  methods: {
    async getOneByProject() {
      let data = await this.api.getOneByProject(this, this.$route.query.id);
      if (data) {
        this.prefix = data.prefix;
      }
    },

    async upDataByCurrentProject() {
      let data = await this.api.getPageByTable(this, {
        currentPage: 1,
        keyword: "",
        pageSize: 500,
        sortField: "",
        sortOrder: "",
        projectId: this.$route.query.id,
      });
      if (data) {
        this.current_project = data.rows;
      }
    },
    async getPageByTable() {
      let data = await this.api.getPageByTable(this, {
        currentPage: this.page.currentPage,
        keyword: this.keyword,
        pageSize: this.page.pageSize,
        sortField: "",
        sortOrder: "",
        projectId: this.now_project.id,
      });
      if (data) {
        this.data = data.rows.map((e) => {
          e.newName = this.prefix + e.name;
          e.newNotes = e.notes;
          e.tooltip = this.now_project.name + " : " + e.name;
          return e;
        });
        this.page.total = data.total;
      }
    },

    async getListByProject() {
      let data = await this.api.getListByProject(this);
      if (data) {
        this.project_arr = data;
        this.now_project = data[0];
      }
    },

    selectionChange(list) {
      if (!list) {
        list = this.select_list;
        this.select_list_view = false;
        this.$nextTick(() => (this.select_list_view = true));
      }
      // console.log(list);
      // console.log(this.current_project);
      let nameArr = new Set(),
        set = new Set();
      list.forEach((e) => {
        if (set.has(e.newName)) {
          nameArr.add(e.newName);
        } else set.add(e.newName);
      });
      nameArr.forEach((e) => {
        let repeatArr = [];
        let index = list.map((e) => e.newName).indexOf(e);
        while (index != -1) {
          repeatArr.push(list.splice(index, 1)[0]);
          index = list.map((e) => e.newName).indexOf(e);
        }
        list.splice(0, 0, ...repeatArr);
      });
      list.forEach((e) => {
        if (
          nameArr.has(e.newName) ||
          this.current_project.some((ele) => ele.name == e.newName)
        )
          e.repeat = true;
        else e.repeat = false;
      });

      this.select_list = list;
    },
    toggleSelection(val) {
      this.$refs.crud.toggleSelection([val]);
    },

    async submit() {
      if (!this.select_list.length) {
        this.$message.warning("未勾选需复制表");
        return;
      }
      if (this.select_list.some((e) => e.repeat)) {
        this.$message.warning("表名重复");
        return;
      }
      let select_list = this.select_list.map((e) => {
        return {
          id: e.id,
          newName: e.newName,
          newNotes: e.newNotes,
        };
      });
      // console.log("删除项目", select_list);
      // console.log(this.$route);
      let data = await this.api.copyByTable(this, {
        projectId: this.$route.query.id,
        tables: select_list,
      });
      if (data) {
        this.$message.success(data.msg);
        this.upData();
        this.visible = false; // 关闭
        // this.$emit("submit");
      }
    },
    closure() {
      this.visible = false; // 关闭
      // this.$emit("closure");
    },
  },
};
</script>
 
 <style lang="less">
.copyTableByHave {
  section {
    .list_box {
      .avue-crud__menu {
        display: none;
      }
      .avue-crud__pagination {
        padding: 10px;
      }
      .headerT-commonStyle {
        .el-input__suffix-inner {
          background-color: transparent;
          margin-top: 0;
        }
      }
    }
    .prefix {
      span {
        font-weight: 700;
      }
      .el-input {
        width: 70%;
        input {
          border: none;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.pop_ups_box {
  position: fixed;
  top: 60px;
  height: calc(100% - 60px);
  background-color: rgba(0, 0, 0, 0.397);
  z-index: 10;
  article {
    display: flex;
    justify-content: space-between;
    height: 660px;
    aside {
      width: 270px;
      height: 96%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      padding: 5px;
      .project_box {
        box-sizing: border-box;
        height: calc(100% - 50px);
        margin-top: 10px;
        overflow-y: auto;
        div {
          padding: 15px;
          color: #2f3846;
          &:hover {
            background-color: rgba(204, 204, 204, 0.322);
          }
        }
        .now_project {
          background-color: rgba(240, 247, 255, 1);
          color: #0079fe;
        }
      }
    }
    section {
      height: 96%;
      .headerT-commonStyle {
        .el-input {
          float: right;
          width: 350px;
        }
      }
    }
    .list_box {
      width: 800px;
      .headerT-commonStyle {
        padding: 10px 1px !important;
      }
    }
    .select_box {
      width: 200px;
      box-sizing: border-box;
      .headerT-commonStyle {
        padding: 10px 1px !important;
        img {
          float: right;
          width: 25px;
          height: 25px;
          margin-top: 4px;
          cursor: pointer;
        }
      }
      .list_content {
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 0 5px 5px;
        overflow-y: auto;
        height: calc(100% - 90px);
        div {
          margin-top: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          display: flex;
          i,
          input {
            line-height: 25px !important;
            font-size: 15px;
            color: #999;
          }
          i {
            padding: 0 10px;
            border-left: 1px solid #ccc;
            cursor: pointer;
          }
          input {
            width: calc(100% - 42px);
            padding-left: 5px;
          }
        }
        .repeat {
          border-color: red;
          i {
            border-left-color: red;
            color: red;
          }
        }
      }
    }
  }
}
</style>