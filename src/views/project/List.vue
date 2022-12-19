<!--
 * @Author: xcl
 * @Date: 2022-04-20 18:05:17
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-16 10:04:37
 * @Description: 项目列表
-->
<template>
  <div id="list">
    <header>
      <span>项目列表</span>
      <div class="select">
        <el-input
          class="select_input"
          v-model="keyWord"
          placeholder="项目名称/项目描述/负责人"
          @change="getPageByProject"
          clearable
        >
          <el-button
            @click="getPageByProject"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-select
          v-model="value"
          @change="getPageByProject"
          placeholder="项目状态"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button @click="created_project" type="primary" icon="el-icon-plus"
          >创建项目</el-button
        >
        <!-- <el-button @click="import_project" type="" icon="el-icon-upload"
          >导入</el-button
        > -->
      </div>
    </header>

    <article>
      <ProjectCard
        v-for="(e, i) in project_data"
        :key="e.id"
        :e="e"
        :i="i + 1"
        :dicttype="dicttype"
        @delete="project_card_delete(e, getPageByProject)"
        @view="project_card_view(e)"
        @edit="project_card_edit(e, getPageByProject)"
      ></ProjectCard>
      <template
        v-if="project_data.length % ($store.state.VW >= 1620 ? 4 : 3) > 0"
      >
        <div
          v-for="(e, i) in ($store.state.VW >= 1620 ? 4 : 3) -
          (project_data.length % ($store.state.VW >= 1620 ? 4 : 3))"
          :key="i + 'Auxiliary'"
        ></div>
      </template>
      <el-empty v-if="project_data.length == 0"></el-empty>
    </article>

    <footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8, 16, 32, 64]"
        :page-size="8"
        layout="total, sizes, prev, pager, next, jumper"
        :total="project_data_total"
        background
      >
      </el-pagination>
    </footer>

    <DeleteProject
      v-if="delete_project_view"
      @closure="delete_project_view = false"
      @submit="deleteProject"
      upData="getPageByProject"
    >
      <template v-slot:title>
        删除项目 - {{ delete_project_data.name }}</template
      >
    </DeleteProject>
  </div>
</template>

<script>
import ProjectCard from "../../components/modules/project/projectCard.vue";
import projectMixin from "@/mixins/projectMixin.js";

export default {
  name: "List",
  mixins: [projectMixin],
  components: { ProjectCard },
  data() {
    return {
      currentPage: 1,

      // 项目中心
      project_data: [],
      project_data_total: 0,

      options: [
        {
          value: -1,
          label: "项目状态",
        },
        {
          value: 0,
          label: "进行中",
        },
        {
          value: 1,
          label: "已完成",
        },
      ],
      value: -1,
      keyWord: "",
      pageSize: 8,

      // 导入项目
      import_project_option: {
        submitText: "完成",
        span: 24,
        labelPosition: "top",
        align: "center",
        menuAlign: "center",
        detail: false,
        printBtn: false,
        column: [
          {
            label: "项目名称",
            prop: "name",
            span: 24,
            display: true,
            required: true,
            rules: [
              {
                required: true,
                message: "请填写项目名称",
              },
            ],
          },
          {
            label: "项目根路径",
            prop: "path",
            span: 24,
            display: true,
            required: true,
            rules: [
              {
                required: true,
                message: "请填写项目根路径",
              },
            ],
          },
          {
            label: "项目描述",
            prop: "describe",
            span: 24,
            display: true,
          },
          {
            label: "拖拽上传",
            prop: "imgUrl5",
            type: "upload",
            span: 24,
            dragFile: true,
            propsHttp: {
              url: "url",
              name: "name",
              res: "data",
            },
            tip: "只能上传jpg/png文件，且不超过500kb",
            action: "https://api.avuejs.com/imgupload",
          },
        ],
      },
    };
  },
  computed: {},
  props: {},
  watch: {},
  created() {},
  mounted() {
    this.getPageByProject();
    window.upDataByProject = this.getPageByProject;
  },
  methods: {
    async getPageByProject() {
      let data = await this.api.getPageByProject(
        this,
        {
          currentPage: this.currentPage,
          keyword: this.keyWord,
          pageSize: this.pageSize,
          sortField: "createTime",
          sortOrder: 1,
          state: this.value,
        },
        {
          showLoading: true,
        }
      );
      if (data) {
        // console.log(data);

        if (data.rows.length == 0 && data.total > 0 && this.currentPage > 1) {
          this.currentPage = 1;
          this.getPageByProject();
          return;
        }
        this.project_data = data.rows;
        this.project_data_total = data.total;
      }
    },

    // 导入项目
    import_project(type) {
      this.$DialogForm.show({
        title: "导入项目",
        width: "40%",
        type,
        menuPosition: "right",
        option: this.import_project_option,
        callback: (res) => {
          console.log(res.data);
          this.$message.success("导入成功");
          res.close();
        },
      });
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPageByProject();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPageByProject();
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less">
.select_input {
  .el-input-group__append {
    background-color: transparent !important;
  }
}
</style>
<style lang="less" scoped>
#list {
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  header {
    display: flex;
    justify-content: space-between;
    > span {
      font-weight: 600;
    }
    .select {
      display: flex;
      justify-content: space-between;
      .select_input {
        width: 450px;
        .el-input-group__append {
          background-color: transparent !important;
          border: none !important;
        }
      }
      > button,
      .el-select {
        margin-left: 10px;
      }
      .el-select {
        width: 140px;
      }
    }
  }
  article {
    width: 100%;
    margin-top: 10px;
    height: 86%;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow: hidden;
    overflow-y: auto;
    @media (min-width: 1620px) {
      > div {
        width: 23.5%;
      }
    }
    @media (max-width: 1619px) {
      > div {
        width: 32%;
      }
    }
    .el-empty {
      width: 100%;
    }
  }
  footer {
    height: 50px;
    margin-right: 20px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
