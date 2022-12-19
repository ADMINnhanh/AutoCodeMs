<!--
 * @Description: 项目列表 -> 项目详情 -> 左侧 树
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 08:35:32
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-15 08:55:17
 * @FilePath: \web\src\components\modules\projectDetails\LeftTree.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div>
    <avue-tree
      ref="tree"
      :permission="getPermission"
      :loading="loading"
      :option="option"
      :data="data"
      v-model="form"
      @update="update"
      @save="save"
      @del="del"
      @node-click="nodeClick"
      @check-change="checkChange"
      :filter-node-method="filterNodeMethod"
      @mouseleave="float = null"
    >
      <span
        class="el-tree-node__label"
        slot-scope="{ node, data }"
        :class="[active && active == data[option.props.value] ? 'active' : '']"
        @mouseenter="float = data[option.props.value]"
        @mouseleave="float = null"
      >
        <span
          class="ellipsis"
          style="float: left; width: 120px; font-size: 16px"
        >
          {{ (node || {}).label }}
          {{
            option.props.subLabel && data[option.props.subLabel]
              ? "（" + data[option.props.subLabel] + ")"
              : ""
          }}
        </span>
        &nbsp;&nbsp;
        <span
          style="float: left; margin-left: 6px"
          v-show="float == data[option.props.value]"
          class="icon iconfont icon-bianji"
          @click.stop="
            dialogType = 'edit';
            $refs.tree.node = $refs.tree.deepClone(data);
            option.formOption.column[3].display = false;
            $refs.tree.rowEdit();
          "
        >
        </span>
        &nbsp;
        <span
          style="float: left; margin-left: 6px"
          v-show="float == data[option.props.value]"
          class="icon iconfont icon-fuzhi"
          @click.stop="copy(node, data)"
        >
        </span>
        &nbsp;
        <span
          style="float: left; margin-left: 6px"
          v-show="float == data[option.props.value]"
          class="icon iconfont icon-shanchu"
          @click.stop="
            $refs.tree.node = $refs.tree.deepClone(data);
            $refs.tree.rowRemove();
          "
        >
        </span>
      </span>
      <template slot-scope="{ node, data }" slot="menu">
        <div class="avue-tree__item" @click.stop="copy(node, data)">复制</div>
      </template>
      <template slot="addBtn">
        <i class="el-icon-search" @click.stop="$refs.tree.filterNode()"></i>
      </template>
    </avue-tree>
    <copy-table
      v-if="isCopy"
      @closure="isCopy = false"
      @submit="copysubmit"
      :copyData="copyData"
    >
      <template v-slot:title>
        复制表 - {{ copyData[option.props.label] }}</template
      >
    </copy-table>
  </div>
</template>

<script>
import merge from "webpack-merge";
import CopyTable from "@/components/modules/projectDetails/CopyTable.vue";
export default {
  name: "LeftTree",
  components: {
    "copy-table": CopyTable,
  },
  props: {},
  data() {
    return {
      loading: false,
      active: parseInt(this.$route.query.tableId),
      float: null,

      form: {},
      data: [],

      ids: [],
      selectData: [],

      // 复制
      isCopy: false,
      copyData: null,

      dialogType: "",
    };
  },
  computed: {
    option() {
      return require(`@/assets/js/option/LeftTree`).default(this);
    },
    api() {
      return require(`@/api/SingleTable`).default(this);
    },

    /**
     * 根据active取当前表名+备注
     */
    returnActiveName() {
      return this.getActiveName();
    },
  },
  watch: {
    active(newV, oldV) {
      this.$emit("changeName", this.returnActiveName);
      if (newV) {
        this.getRightLists();
      }
    },
  },
  created() {
    this.getDefaultfieldDicData();
  },
  mounted() {
    this.getList();
  },
  methods: {
    getActiveName(id) {
      let result = "";
      let active = id
        ? id
        : this.active
        ? this.active
        : this.$route.query.tableId
        ? this.$route.query.tableId
        : null;
      if (active) {
        let data = this.data.filter((item) => {
          return item[this.option.props.value] == active;
        })[0];
        if (data) {
          result =
            (data[this.option.props.label]
              ? data[this.option.props.label]
              : "") +
            (data[this.option.props.subLabel]
              ? "（" + data[this.option.props.subLabel] + ")"
              : "");
        }
      }
      return result;
    },

    /**
     * 获取右侧字段信息和功能信息列表数据
     */
    getRightLists() {
      // 延迟100ms，防止refs实例未获取到
      setTimeout(() => {
        // 请求数据
        this.$parent.getCommonFieldList(this.active);
        this.$parent.$refs.FieldInfo && this.$parent.$refs.FieldInfo.getList();
        this.$parent.$refs.FunctionInfo &&
          this.$parent.$refs.FunctionInfo.getList();
      }, 100);
    },

    /**
     * 查询 defaultfield - dicData
     */
    getDefaultfieldDicData() {
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
          if (res.code === 200) {
            self.option.formOption.column[3].dicData = res.data;
            let ids = res.data.map((item) => {
              return item.id;
            });
            self.option.formOption.column[3].value = ids;
          } else {
            // 提示
            self.$message.error(res.msg || res.error || "错误！");
            self.option.formOption.column[3].dicData = [];
            self.option.formOption.column[3].value = [];
          }
        })
        .catch(function (error) {
          self.$message.error(error);
        });
    },

    /**
     * 查询
     */
    getList() {
      let self = this;
      self.loading = true;
      let config = {
        url: `${self.$common.basePath}/table/getList`,
        method: "post",
        data: {
          keyword: "",
          projectId: parseInt(self.$route.query.id),
        },
        hideLoading: true,
      };
      self
        .axios(config)
        .then(function (res) {
          self.loading = false;
          if (res.code === 200) {
            self.data = res.data;

            let filter = self.data.filter((item) => {
              return item[self.option.props.value] == self.$route.query.tableId;
            });
            // filter.length === 0 表示没有在列表数据中找到与$route.query.tableId匹配的值
            // 满足条件时，active取值：列表数据第一个/null
            if (filter.length === 0) {
              self.active = res.data
                ? res.data[0][self.option.props.value]
                : null;
            }
          } else {
            // 提示
            self.$message.error(res.msg || res.error || "错误！");
            self.data = [];
            self.active = null;
          }
          if (self.active) {
            self.$router.push({
              query: merge(self.$route.query, { tableId: self.active }),
            });
          }
          if (
            self.active &&
            self.$parent.$refs.FieldInfo &&
            self.$parent.$refs.FunctionInfo
          ) {
            self.getRightLists();
          }
          if (self.active) {
            self.$emit("changeName", self.getActiveName(self.active));
          }
        })
        .catch(function (error) {
          self.loading = false;
          self.$message.error(error);
        });
    },

    // ======================= 左侧 树 ======================= //
    getPermission(key, data) {
      return true;
    },
    nodeClick(data) {
      this.active = data[this.option.props.value];
      this.$router.push({
        query: merge(this.$route.query, { tableId: this.active }),
      });
    },
    checkChange(data) {
      this.ids = this.$refs.tree.getCheckedKeys();
      this.selectData = this.$refs.tree.getCheckedNodes();
    },
    copy(node, data) {
      this.isCopy = true;
      this.copyData = data;
    },
    copysubmit(data, done) {
      // this.$message.info("暂无 API / Mock");
      // return;
      let self = this;
      let config = {
        url: `${self.$common.basePath}/table/copy`,
        method: "post",
        data: {
          projectId: parseInt(self.$route.query.id),
          tables: [
            {
              id: self.copyData.id,
              newName: data.name,
              newNotes: data.notes,
            },
          ],
        },
        hideLoading: true,
      };
      self
        .axios(config)
        .then(function (res) {
          if (res.code == 200) {
            // done
            done();
            self.isCopy = false;
            // 刷新
            self.getList();
            // 提示
            self.$message.success(res.msg);
          } else {
            // 提示
            self.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(function (error) {
          self.isCopy = false;
          // 提示
          self.$message.error(error);
        });
    },
    del(data, done) {
      let self = this;
      this.$confirm("该操作将删除此条数据，是否继续??", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          self.api
            .del(data.id)
            .then(function (res) {
              if (res.code == 200) {
                // done
                done();
                // 刷新
                self.getList();
                // 提示
                self.$message.success(res.msg);
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
        .catch(() => {});
    },
    update(node, data, done, loading) {
      let self = this;
      self.api
        .update(
          Object.assign(
            {},
            {
              id: data.id,
              name: data.name,
              notes: data.notes,
            }
          )
        )
        .then(function (res) {
          loading();
          if (res.code == 200) {
            // 清空表单
            self.form.name = "";
            self.form.notes = "";
            // done
            done();
            // 刷新
            self.getList();
            // 提示
            self.$message.success(res.msg);
          } else {
            // 提示
            self.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(function (error) {
          loading();
          // 清空表单
          self.form.name = "";
          self.form.notes = "";
          // 提示
          self.$message.error(error);
        });
    },
    save(node, data, done, loading) {
      let self = this;
      self.api
        .add(Object.assign({}, data))
        .then(function (res) {
          loading();
          if (res.code == 200) {
            // 清空表单
            self.form.name = "";
            self.form.notes = "";
            // done
            done();
            // 刷新
            self.getList();
            // 提示
            self.$message.success(res.msg);
          } else {
            // 提示
            self.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(function (error) {
          loading();
          // 清空表单
          self.form.name = "";
          self.form.notes = "";
          // 提示
          self.$message.error(error);
        });
    },
    filterNodeMethod(value, data) {
      if (!value) return true;
      return (
        (data[this.option.props.label] &&
          data[this.option.props.label].indexOf(value) !== -1) ||
        (data[this.option.props.subLabel] &&
          data[this.option.props.subLabel].indexOf(value) !== -1)
      );
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
/deep/ .avue-tree__filter {
  .el-input-group__append {
    background: #fff;
  }
  .el-input__inner {
    border-right: none;
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #dcdfe6;
  }
}

/deep/ .el-tree-node__label {
  width: 100%;
}
/deep/ .el-tree-node__label.active {
  color: #0079fe;
}
// CSS伪类 :has() 就有这个功能，还处于草案阶段
/deep/ .el-tree-node__content:has(> .el-tree-node__label.active.active) {
  background-color: #0079fe14;
}
</style>
