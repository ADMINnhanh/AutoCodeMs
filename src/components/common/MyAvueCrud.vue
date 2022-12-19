<!--
 * @Description: 自定义 avue-crud 增删改查通用组件（仅适用于公司项目的常规业务逻辑）
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-10 08:35:34
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-16 11:41:30
 * @FilePath: \web\src\components\common\MyAvueCrud.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <avue-crud
    class="myCrud"
    :ref="'crud-' + module"
    v-model="editorFormObj"
    :class="[hideTopMenu ? 'hideTopMenu' : '']"
    :key="'crud-' + reload"
    :search.sync="editSearchObj"
    :data="data"
    :option="option"
    :page.sync="page"
    :table-loading="loading"
    @on-load="onLoad"
    @size-change="sizeChange"
    @current-change="currentChange"
    @search-change="searchChange"
    @search-reset="resetChange"
    @selection-change="selectionChange"
    @row-save="rowSave"
    @row-update="rowUpdate"
    @row-del="rowDel"
    @refresh-change="refreshChange"
    :before-open="beforeOpen"
    :before-close="beforeClose"
    @row-click="rowClick"
    @row-contextmenu="rowContextmenu"
    @sortable-change="sortableChange"
    @sort-change="sortChange"
  >
    <!-- 自定义搜索的菜单栏 -->
    <template slot="searchMenu" slot-scope="{ row, size }">
      <slot name="searchMenu" v-bind="{ row, size }"></slot>
    </template>
    <!-- 自定义搜索的内容 -->
    <template slot="search" slot-scope="{ row, size }">
      <slot name="search" v-bind="{ row, size }"></slot>
    </template>

    <!-- 自定义 表格 左上角的菜单栏 -->
    <template slot="menuLeft" slot-scope="{ size }">
      <slot name="menuLeft" v-bind="{ size }"></slot>
      <el-button
        v-if="isBatchDelBtn"
        :disabled="ids && ids.length > 0 ? false : true"
        :size="size"
        @click="batchDel(ids)"
      >
        <i class="icon iconfont icon-shanchu"></i>
        批量删除
      </el-button>
    </template>
    <!-- 自定义 表格 右上角的菜单栏 -->
    <template slot="menuRight" slot-scope="{ size }">
      <slot name="menuRight" v-bind="{ size }"></slot>
    </template>
    <!-- 自定义 表格 每一行的菜单栏 -->
    <template slot="menu" slot-scope="{ type, size, row }">
      <slot name="menu" v-bind="{ type, size, row }"></slot>
    </template>
    <!-- 自定义 表格 弹窗内的按钮 -->
    <template slot="menuForm" slot-scope="">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        plain
        v-if="dialogType == 'add'"
        @click="handleNext()"
        >继续新增</el-button
      >
      <slot
        name="menuForm"
        v-bind="{ data: editorFormObj, type: dialogType }"
      ></slot>
    </template>

    <!-- 自定义 prop 的插槽内容 -->
    <template
      v-for="col in propslot('slot')"
      slot-scope="scope"
      :slot="col.prop"
    >
      <slot :name="col.prop" v-bind="scope"></slot>
    </template>
    <template
      v-for="col in propslot('headerslot')"
      slot-scope="scope"
      :slot="col.prop + 'Header'"
    >
      <slot :name="col.prop + 'Header'" v-bind="scope"></slot>
    </template>
    <template
      v-for="col in propslot('labelslot')"
      slot-scope="scope"
      :slot="col.prop + 'Label'"
    >
      <slot :name="col.prop + 'Label'" v-bind="scope"></slot>
    </template>
    <template
      v-for="col in propslot('formslot')"
      slot-scope="scope"
      :slot="col.prop + 'Form'"
    >
      <slot :name="col.prop + 'Form'" v-bind="scope"></slot>
    </template>
  </avue-crud>
</template>

<script>
export default {
  name: "MyAvueCrud",
  props: {
    // 表单
    formObj: {
      default: function () {
        return {};
      },
      type: Object,
    },
    // 搜索表单
    searchObj: {
      default: function () {
        return {};
      },
      type: Object,
    },
    // 是否初始化加载完成后，进行分页查询
    isInit: {
      type: Boolean,
      default: true,
    },
    // 模块
    module: {
      type: String,
      required: true,
    },
    // 是否显示表格顶部菜单
    hideTopMenu: {
      type: Boolean,
      default: false,
    },
    // 是否显示批量删除
    isBatchDelBtn: {
      type: Boolean,
      default: true,
    },
    // 分页查询时的排序字段
    sortField: {
      default: "createTime",
      type: String,
    },
    // 分页查询时的排序类型: 0:升序 1:降序
    sortOrder: {
      default: 1,
      type: Number,
    },
    // 分页查询时的额外参数
    extraParams: {
      default: function () {
        return {};
      },
      type: Object,
    },
    // 新增、编辑表单时的额外参数
    extraForm: {
      default: function () {
        return {};
      },
      type: Object,
    },
    // 新增、编辑表单时的需要删除的参数
    deleteProps: {
      default: function () {
        return [];
      },
      type: Array,
    },
    deleteCommonProps: {
      default: function () {
        return [
          "",
          "undefined",
          "createBy",
          "createTime",
          "createId",
          "updateBy",
          "updateTime",
          "updateId",
        ];
      },
      type: Array,
    },
    // 每页显示条目个数
    pageSize: {
      default: 20,
      type: Number,
    },
    // 分页组件布局，子组件名用逗号分隔
    layout: {
      default: "total, sizes, prev, pager, next, jumper",
      type: String,
    },
    // 是否为分页按钮添加背景色
    background: {
      default: true,
      type: Boolean,
    },
    // 页码按钮的数量，大于等于 5 且小于等于 21 的奇数
    pagerCount: {
      default: 7,
      type: Number,
    },
    // 是否打开详情弹窗
    isOpenView: {
      type: Boolean,
      default: true,
    },
    // 是否前往下一步
    isToNext: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      reload: Math.random(),
      flag: false,
      isCopy: false,
      dialogType: "",
      editorFormObj: this.formObj || {},
      editSearchObj: this.searchObj || {},
      // https://avuejs.com/crud/crud-cell/ 行内编辑
      // data: [{ id: 1, $cellEdit: true }],
      data: [],
      page: {
        background: this.background || true,
        pagerCount: this.pagerCount || 7,
        total: 1,
        currentPage: 1,
        pageSize: this.pageSize || 20,
        layout: this.layout || "total, sizes, prev, pager, next, jumper",
      },
      ids: [],
      selectData: [],
    };
  },
  computed: {
    option() {
      return require(`@/assets/js/option/${this.module}`).default(this);
    },
    api() {
      return require(`@/api/${this.module}`).default(this);
    },

    // option中表单/表格的 所有column集合
    column() {
      let newArray = [];
      if (this.option && this.option.group) {
        let array = this.option.group;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (element.column) {
            element.column.forEach((item) => {
              newArray.push(item);
            });
          }
        }
      }
      if (this.option && this.option.column) {
        let array = this.option.column;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          newArray.push(element);
        }
      }
      return newArray;
    },
    // option中子表单的 所有column集合
    dynamicColumn() {
      let newArray = this.column;
      let childNewArray = [];
      if (newArray) {
        newArray.forEach((element) => {
          if (
            element.type == "dynamic" &&
            element.children &&
            element.children.column &&
            element.children.column.length > 0
          ) {
            element.children.column.forEach((ele) => {
              childNewArray.push(ele);
            });
          }
        });
      }
      return childNewArray;
    },

    /** 自定义 prop【在卡槽中指定列的prop加上Header/Search/Form/Label/Error作为卡槽的名称】 */
    propslot() {
      return function (type) {
        let column = [];
        let newArray = this.column.concat(this.dynamicColumn);
        if (newArray) {
          column = newArray.filter((col) => {
            return col[type];
            // return col.slot;// 自定义列: propName
            // return col.headerslot;// 自定义列表头: propName+'Header'
            // return col.search;// 自定义列搜索: propName+'Search'
            // return col.formslot;// 自定义表单: propName+'Form'
            // return col.labelslot;// 自定义表单标题: propName+'Label'
            // return col.errorslot;// 自定义表单错误提示: propName+'Error'
          });
        }
        return column;
      };
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.init();

    // 自动打开新增弹窗
    const popupsModule = this.$route.query.popupsModule;
    setTimeout(() => {
      const refName = "crud-" + (popupsModule ? popupsModule : this.module);
      this.$route.query.popups == "true" || this.$route.query.popups
        ? this.$refs[refName] && this.$refs[refName].rowAdd()
        : "";
    }, 500);
  },
  methods: {
    // ======================== 【初始化】======================== //
    init() {
      this.doLayout();
      this.refreshTable();
      this.initConfig();
    },
    initConfig() {
      // 字典
      for (const key in this.api) {
        if (Object.hasOwnProperty.call(this.api, key)) {
          const done = this.api[key];
          if (key.includes("$dic_")) {
            this.getDicData(done).then((res) => {
              this.$emit(
                "getDicAfter",
                key,
                res,
                this.oneCol(key.split("$dic_")[1])
              ); // 获取字典后的处理逻辑 key是属性值，res请求数据，某一列col
              if (this.oneCol(key.split("$dic_")[1])) {
                if (this.oneCol(key.split("$dic_")[1]).dicData) {
                  this.oneCol(key.split("$dic_")[1]).dicData = this.oneCol(
                    key.split("$dic_")[1]
                  ).dicData.concat(res);
                } else {
                  this.oneCol(key.split("$dic_")[1]).dicData = res;
                }
              }
            });
          }
        }
      }
    },
    /**
     * 进行重新初始化渲染
     */
    refreshTable() {
      this.$refs["crud-" + this.module] &&
        this.$refs["crud-" + this.module].refreshTable();
    },
    /**
     * 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
     */
    doLayout() {
      this.$refs["crud-" + this.module] &&
        this.$refs["crud-" + this.module].doLayout();
    },
    refresh() {
      this.reload = Math.random();
    },

    // ======================== 【通用方法】======================== //
    /**
     * 获取网络字典数据
     */
    async getDicData(done) {
      this.$emit("getDicBefore");
      const res = await done();
      if (res.code === 200) {
        return res.data;
      } else {
        // 提示
        this.$message.error(res.msg || res.error || "错误！");
        return [];
      }
    },
    /**
     * 根据属性名获取当前属性配置
     */
    oneCol(propName) {
      let one =
        this.column.filter((col) => {
          return col.prop == propName;
        })[0] || null;
      return one;
    },
    /**
     * 根据属性名获取当前属性配置在option.column中的index
     */
    getColIndex(propName) {
      let index;
      let props = this.option.column.map((item) => {
        return item.prop;
      });
      index = props.indexOf(propName);
      return index;
    },
    /**
     * 1. search: true && suffixIcon: 'el-icon-search'/'my-icon-search'
     * 2. display: false && hide: false/undefined,
     * 3. type: 'title'
     * 满足以上三个条件之一
     * */
    deleteProps_filter() {
      let deleteProps_filter = [];
      let columns = this.column.filter((col) => {
        return (
          (col.search === true &&
            (col.suffixIcon === "el-icon-search" ||
              col.suffixIcon === "my-icon-search")) ||
          (col.display === false &&
            (col.hide === false || col.hide === undefined)) ||
          col.type === "title"
        );
      });
      deleteProps_filter = columns.map((item) => {
        return item.prop;
      });
      // console.log(deleteProps_filter);
      return deleteProps_filter;
    },

    // ======================== 【查询】======================== //
    onLoad(page) {
      if (this.isInit) {
        this.getList();
      }
    },
    getList() {
      let self = this;
      this.$emit("queryBefore"); // 查询前操作方法
      this.loading = true;

      let data = {};
      // 额外参数：
      let object = this.$common.deepClone(this.extraParams);
      // 搜索/筛选参数
      data = Object.assign(this.editSearchObj, object);
      // 分页参数
      /* this.option.page === undefined || this.option.page <====> 代表分页查询，反之代表列表查询 */
      if (this.option.page === undefined || this.option.page) {
        data.currentPage = this.page.currentPage;
        data.pageSize = this.page.pageSize;
      }
      // 排序参数
      this.sortField ? (data.sortField = this.sortField) : "";
      this.sortOrder || this.sortOrder === 0
        ? (data.sortOrder = this.sortOrder)
        : "";
      this.$nextTick(() => {
        // data 更新了
        // console.log(data);

        this.data = [];
        this.page.total = 0;
        this.api
          .list(data)
          .then((res) => {
            this.loading = false;
            if (res.code === 200) {
              if (this.option.page === undefined || this.option.page) {
                const data = res.data;
                this.page.total = data.total;
                const result = data.rows;
                this.data = result;
              } else {
                const data = res.data;
                this.data = data;
              }
            } else {
              // 提示
              this.$message.error(res.msg || res.error || "错误！");
              if (this.option.page === undefined || this.option.page) {
                const data = { rows: [], total: 0 };
                this.page.total = data.total;
                const result = data.rows;
                this.data = result;
              } else {
                this.data = [];
              }
            }
            this.$emit("queryAfter", this.data); // 查询后操作方法 this.data列表数据
          })
          .catch(function (error) {
            self.loading = false;
            self.$message.error(error);
          });
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getList();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
    resetChange(params) {
      this.editSearchObj = params;
      this.initList();
    },
    searchChange(params, done) {
      this.editSearchObj = params;
      if (done) done();
      this.initList();
    },
    refreshChange(params) {
      this.getList();
    },
    initList() {
      this.page.currentPage = 1;
      this.getList();
    },

    // ======================== 【新增】======================== //
    rowSave(form, done, loading) {
      let self = this;
      // console.log(form);
      this.$emit("addBefore", form); // 新增前操作方法 form表单
      let props = this.deleteCommonProps.concat(this.deleteProps);
      props = props.concat(this.deleteProps_filter());
      for (const key in form) {
        if (props.indexOf(key) != -1) {
          delete form[key];
        }
      }
      let object = this.$common.deepClone(this.extraForm);
      // form = Object.assign(form, object);
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const element = object[key];
          form[key] = element;
        }
      }
      // console.log(form);
      // return;
      this.$nextTick(() => {
        this.api
          .add(form)
          .then((res) => {
            this.$emit("addAfter", res); // 新增后操作方法 res请求数据
            if (res.code == 200) {
              this.runingAdd(loading, done);
              // 提示
              this.$message.success(res.msg || "新增成功");
              // 刷新
              this.getList();
            } else {
              // loading
              loading();
              // 提示
              this.$message.error(res.msg || res.error || "错误！");
            }
          })
          .catch((error) => {
            self.runingAdd(loading);
            // 提示
            self.$message.error(error);
          });
      });
    },
    runingAdd(loading, done) {
      if (this.flag) {
        this.flag = false;
        // loading
        loading();
        // 清空表单数据
        const object = JSON.parse(JSON.stringify(this.editorFormObj));
        let columns = this.column.filter((col) => {
          return col.display === undefined || col.display;
        });
        let props = [];
        props = columns.map((item) => {
          return item.prop;
        });
        // console.log(props, this.editorFormObj);
        for (const key in this.editorFormObj) {
          if (
            Object.hasOwnProperty.call(object, key) &&
            props.indexOf(key) != -1
          ) {
            object[key] = this.oneCol(key)
              ? this.oneCol(key).value || this.oneCol(key).value === 0
                ? this.oneCol(key).value
                : null
              : null;
          }
        }
        this.editorFormObj = object;
        return;
      }
      // done
      done && !this.isToNext ? done() : "";
    },

    // ======================== 【继续添加】======================== //
    handleNext() {
      this.flag = true;
      this.$refs["crud-" + this.module].rowSave();
    },
    beforeClose(done) {
      this.option.labelPosition = "top"; // 编辑、新增 top；查看 right
      this.flag = false;
      this.$emit("beforeClose", this.option); // 关闭弹窗前 this.option配置项
      done();
    },
    beforeOpen(done, type, l) {
      this.dialogType = type;
      if (type == "add") {
        if (Object.entries(this.editorFormObj).length === 0) {
          // 新增
          this.isCopy = false;
        } else {
          // 复制&新增
          this.isCopy = true;
        }
      }
      this.$emit(
        "beforeOpen",
        type,
        this.editorFormObj,
        this.option,
        this.isCopy,
        this.editSearchObj
      ); // 打开弹窗前 type类型，this.editorFormObj表单，this.option配置项，this.isCopy是否复制，this.editSearchObj搜索数据
      done();
    },

    // ======================== 【编辑】======================== //
    rowUpdate(row, index, done, loading) {
      let self = this;
      // let formData = row;
      let formData = this.$common.deepClone(this.editorFormObj);
      let props = this.deleteCommonProps.concat(this.deleteProps);
      props = props.concat(this.deleteProps_filter());
      for (const key in formData) {
        if (props.indexOf(key) != -1) {
          delete formData[key];
        }
      }
      let object = this.$common.deepClone(this.extraForm);
      // formData = Object.assign(formData, object);
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const element = object[key];
          formData[key] = element;
        }
      }
      this.$emit("updateBefore", formData, row); // 编辑前操作方法 formData是表单；row是数据
      // console.log(formData);
      // return;
      this.$nextTick(() => {
        this.api
          .update(formData)
          .then((res) => {
            this.$emit("updateAfter", res); // 编辑后操作方法 res请求数据
            // loading
            loading();
            if (res.code == 200) {
              // 提示
              this.$message.success(res.msg || "编辑成功");
              // done
              !this.isToNext ? done() : "";
              // 刷新
              this.getList();
            } else {
              // loading
              loading();
              // 提示
              this.$message.error(res.msg || res.error || "错误！");
            }
          })
          .catch((error) => {
            // loading
            loading();
            // 提示
            self.$message.error(error);
          });
      });
    },

    // ======================== 【多选】======================== //
    selectionChange(list) {
      // 选中的数据
      const keyName = this.option.rowKey || "id";
      let ids = list.map((item) => {
        return item[keyName];
      });
      this.ids = ids;
      this.selectData = list;
    },

    // ======================== 【删除】======================== //
    rowDel(row) {
      let self = this;
      this.$emit("batchDelBefore"); // 删除前操作方法
      this.$confirm("该操作将删除此条数据，是否继续?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "myDelMsg",
      })
        .then(() => {
          return this.api.del(row.id);
        })
        .then((res) => {
          this.$emit("delAfter", res); // 删除后操作方法 res请求数据
          if (res.code === 200) {
            // 提示
            this.$message.success(res.msg || "删除成功");
            // 刷新
            this.getList();
          } else {
            // 提示
            this.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    batchDel(ids) {
      let self = this;
      this.$emit("delBefore"); // 删除前操作方法
      this.$confirm(
        `该操作将删除选中的${ids.length}条数据，是否继续?`,
        "提示",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "myDelMsg",
        }
      )
        .then(() => {
          return this.api.batchDel(ids);
        })
        .then((res) => {
          this.$emit("batchDelAfter", res); // 删除后操作方法 res请求数据
          if (res.code === 200) {
            // 清空已选
            this.$refs["crud-" + this.module].toggleSelection();
            // 提示
            this.$message.success(res.msg || "删除成功");
            // 刷新
            this.getList();
          } else {
            // 提示
            this.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // ======================== 【单行鼠标事件 - 左键单击、右键单击】======================== //
    rowClick(row, column, event) {
      // 单击查看详情
      let columns = this.column.filter((col) => {
        return col.display === undefined || col.display;
      });
      let props = columns.map((item) => {
        return item.prop;
      });
      props.forEach((prop) => {
        if (row[prop] === undefined || row[prop] === null || row[prop] === "") {
          row[prop] = undefined;
        }
      });
      this.$emit("rowClick", row); // 自定义鼠标左键单击事件 row数据
      if (this.isOpenView) {
        this.option.labelPosition = "right"; // 编辑、新增 top；查看 right
        this.$refs["crud-" + this.module].rowView(row);
      }
    },
    rowContextmenu(row, column, event) {
      event.preventDefault();
      // return;
      this.$Clipboard({
        text: row[column.property],
        // text: JSON.stringify(row),
      })
        .then(() => {
          this.$message.success(`复制成功`);
        })
        .catch(() => {
          this.$message.error(`复制失败`);
        });
    },

    // ======================== 【表格的排序】======================== //
    /** 注意：拖拽排序和快捷字段排序是冲突的，两者只能存在一个 */
    // 拖拽排序
    sortableChange(oldIndex, newIndex) {
      // console.log(oldIndex, newIndex, this.data);
      this.$emit("sortableChange", oldIndex, newIndex, this.data);
    },
    // 快捷字段排序
    sortChange(val) {
      // console.log(val);
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
// 隐藏crud的顶部操作栏
.hideTopMenu {
  /deep/ .avue-crud__menu {
    display: none;
  }
}
.myCrud {
  /deep/.avue-crud__pagination {
    padding: 15px 0px 0px 20px !important;
  }
}
</style>


