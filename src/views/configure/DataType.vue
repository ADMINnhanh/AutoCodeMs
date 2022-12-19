<!--
 * @Author: xcl
 * @Date: 2022-04-20 18:05:17
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-16 10:04:18
 * @Description: 默认数据类型管理
-->
<template>
  <div id="dataType">
    <header>
      <span>字典类型列表</span>
      <div class="select">
        <el-input
          v-model="keyword"
          class="select_input"
          placeholder="字典名称/创建人"
          @change="getPageByDicttype"
          clearable
        >
          <el-button
            @click="getPageByDicttype"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-select
          @change="getPageByDicttype"
          v-model="type"
          placeholder="字典分类"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </header>

    <article>
      <div class="new_project" @click="created_dictionaryType">
        <img src="../../assets/images/home/add.png" alt="" />
        <span>新增字典类型</span>
      </div>
      <DataTypeCard
        v-for="(e, i) in dataType_data"
        :class="
          i >=
          dataType_data.length -
            ((dataType_data.length + 1) % ($store.state.VW >= 1620 ? 4 : 3) == 0
              ? $store.state.VW >= 1620
                ? 4
                : 3
              : (dataType_data.length + 1) % ($store.state.VW >= 1620 ? 4 : 3))
            ? 'end-box'
            : ''
        "
        :key="e.id"
        :e="e"
        :i="i + 1"
        @delete="dataType_card_delete(e)"
        @view="dataType_card_view(e)"
        @edit="dataType_card_edit(e)"
      ></DataTypeCard>
      <template
        v-if="dataType_data.length % ($store.state.VW >= 1620 ? 4 : 3) > 0"
      >
        <div
          v-for="(e, i) in ($store.state.VW >= 1620 ? 4 : 3) -
          ((dataType_data.length % ($store.state.VW >= 1620 ? 4 : 3)) + 1)"
          :key="i + 'Auxiliary'"
        ></div>
      </template>
      <el-empty v-if="dataType_data.length == 0"></el-empty>
    </article>

    <footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8, 16, 32, 64]"
        :page-size="8"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </footer>

    <DeleteProject
      v-if="DeleteProject_view"
      @closure="DeleteProject_view = false"
      @submit="dataType_delete"
    >
      <template v-slot:title>
        删除 - {{ DeleteProject_data.dictName }}</template
      >
    </DeleteProject>
  </div>
</template>

<script>
import DataTypeCard from "@/components/modules/dataType/DataTypeCard.vue";

import DeleteProject from "@/components/modules/project/deleteProject.vue";
import CreatedDictionaryType from "@/assets/js/option/CreatedDictionaryType.js";

export default {
  name: "DataType",
  components: {
    DataTypeCard,
    DeleteProject,
  },
  data() {
    return {
      dataType_data: [],

      DeleteProject_view: false,
      DeleteProject_data: null,

      options: [
        {
          value: -1,
          label: "字典分类",
        },
        {
          value: 0,
          label: "数据库类型",
        },
        {
          value: 1,
          label: "业务类型",
        },
      ],
      keyword: "",
      type: -1,

      currentPage: 1,
      pageSize: 8,
      total: 0,
    };
  },
  computed: {},
  props: {},
  watch: {},
  created() {},
  mounted() {
    this.getPageByDicttype();
  },
  methods: {
    async getPageByDicttype() {
      let data = await this.api.getPageByDicttype(
        this,
        {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          sortField: "createTime",
          sortOrder: 1,
          keyword: this.keyword,
          type: this.type,
        },
        {
          showLoading: true,
        }
      );
      if (data) {
        // console.log(data);
        if (data.rows.length == 0 && data.total > 0 && this.currentPage > 1) {
          this.currentPage = 1;
          this.getPageByDicttype();
          return;
        }
        this.total = data.total;
        this.dataType_data = data.rows;
      }
    },

    // 新增字典类型
    created_dictionaryType() {
      let self = this;
      this.DialogForm({
        title: "新增字典类型",
        width: "672px",
        height: 525,
        option: CreatedDictionaryType(),
        btn: [
          {
            text: "新增字典项",
            type: "primary",
            icon: "el-icon-plus",
            click: async function (e_this) {
              let data = await self.api.getPageByDicttype(self, {
                currentPage: 1,
                pageSize: 500,
                sortField: "createTime",
                sortOrder: 1,
                keyword: e_this.data.dictName,
                type: -1,
              });
              if (data) {
                data = data.rows.filter(
                  (e) =>
                    e.dictName == e_this.data.dictName &&
                    e.dictType == e_this.data.dictType
                )[0];
                if (data) {
                  e_this.closure();
                  self.$router.push({
                    name: "DataTypeDetails",
                    query: {
                      id: data.id, // 字典类型ID
                      popups: true, // 字典类型ID
                    },
                  });
                } else {
                  self.$message.warning("请提交确认");
                }
              }
            },
            disabled: true,
          },
        ],
        callback: async (res) => {
          let data = await this.api.addByDicttype(this, res.data);
          if (data) {
            this.$message.success(data.msg);
            this.getPageByDicttype();
            res.self.btn[0].disabled = false;
            // res.close();
          }
        },
      });
    },

    async dataType_delete({ password }) {
      if (password) {
        let data = await this.api.deleteByDicttype(this, {
          id: this.DeleteProject_data.id,
          password,
        });
        if (data) {
          this.DeleteProject_view = false;
          this.getPageByDicttype();
          this.$message.success(data.msg);
        }
      } else {
        this.$message.warning("请输入密码");
      }
    },
    dataType_card_delete(e) {
      this.DeleteProject_view = true;
      this.DeleteProject_data = e;
    },
    dataType_card_view(e) {
      this.$router.push({
        name: "DataTypeDetails",
        query: {
          id: e.id, // 字典类型ID
        },
      });
    },
    dataType_card_edit(e) {
      let self = this;
      this.DialogForm({
        title: "编辑字典类型",
        width: "672px",
        height: 525,
        data: e,
        option: CreatedDictionaryType(),
        btn: [
          {
            text: "编辑字典项",
            type: "primary",
            icon: "el-icon-edit",
            click: function (e_this) {
              e_this.closure();
              self.$router.push({
                name: "DataTypeDetails",
                query: {
                  id: e_this.data.id, // 字典类型ID
                  popups: false, // 字典类型ID
                },
              });
            },
          },
        ],
        callback: async (res) => {
          res.data.id = e.id;
          let data = await this.api.updateByDicttype(this, res.data);
          if (data) {
            this.$message.success(data.msg);
            this.getPageByDicttype();
            // res.close();
          }
        },
      });
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPageByDicttype();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPageByDicttype();
    },
  },
  beforeDestroy() {},
};
</script>
 
<style lang="less" scoped>
#dataType {
  box-sizing: border-box;
  padding: 20px !important;
  position: relative;
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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
      .el-select {
        margin-left: 10px;
      }
      .el-select {
        width: 150px;
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

    .new_project {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #cccccca8;
      height: 186px;
      cursor: pointer;
      span {
        font-weight: 900;
        font-size: 20px;
        margin-top: 10px;
      }
    }
    .end-box {
      margin-bottom: 0;
    }
  }

  footer {
    margin-right: 20px;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
