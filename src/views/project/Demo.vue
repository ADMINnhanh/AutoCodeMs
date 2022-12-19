<!--
 * @Author: xcl
 * @Date: 2022-04-20 18:05:17
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-11 15:45:19
 * @Description: Avue 演示
-->
<template>
  <div id="demo">
    <avue-form
      :key="'form-' + reload"
      :option="formOption"
      v-model="form"
      @submit="handleSubmit"
      @reset-change="handleReset"
    ></avue-form>
    <el-button type="primary" @click="showDialog"> 弹窗表单</el-button>
    <avue-crud
      :key="'crud-' + reload"
      :search.sync="search"
      :data="tableData"
      :option="tableOption"
      :page.sync="page"
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
    ></avue-crud>
  </div>
</template>

<script>
export default {
  name: "Demo",
  components: {},
  data() {
    return {
      reload: Math.random(),

      // 表单
      form: {},
      formOption: {
        size: "medium",
        gutter: 12,
        labelWidth: 80,
        labelPosition: "left",
        align: "center",
        menuAlign: "center",
        border: true,
        detail: false,
        submitBtn: true,
        emptyBtn: true,
        submitText: "确定",
        emptyText: "取消",
        menuPosition: "right",
        column: [
          {
            label: "姓名",
            prop: "name",
            span: 12,
            display: true,
            rules: [
              {
                required: true,
                message: "请选择省份",
                trigger: "blur",
              },
            ],
          },
          {
            label: "性别",
            prop: "sex",
            span: 12,
            display: true,
          },
          {
            label: "年龄",
            prop: "number",
            type: "number",
            span: 12,
            display: true,
          },
          {
            label: "权限",
            prop: "grade",
            type: "select",filterable: true,
            dataType: "number",
            props: {
              label: "name",
              value: "code",
            },
            dicData: [
              {
                name: "有权限",
                code: 1,
              },
              {
                name: "无权限",
                code: 0,
              },
              {
                name: "禁止项",
                code: -1,
              },
            ],
            change: ({ value, column }) => {
              this.$message.success("change事件查看控制台");
              console.log("值改变", value, column);
            },
          },
          {
            label: "描述",
            prop: "desc",
            type: "textarea",
            span: 24,
            display: true,
          },
        ],
      },

      // 分页表格
      search: {},
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      tableOption: {
        rowKey: "id",
        height: 500,
        stripe: true,
        border: true,
        header: true,
        selection: true,
        reserveSelection: true,
        tip: true,
        index: true,
        indexLabel: "序号",
        align: "center",
        menuAlign: "center",
        searchBtnText: "查询",
        searchBtnIcon: "el-icon-search",
        emptyBtnText: "重置",
        emptyBtnIcon: "el-icon-brush",
        searchLabelWidth: 80,
        searchFilterDic: true,
        searchFilterNull: true,
        searchIndex: 2,
        searchShowBtn: true,
        searchIcon: true,
        dateBtn: true,
        menu: true,
        menuWidth: 200,
        menuAlign: "center",
        menuHeaderAlign: "center",
        addBtn: true,
        addBtnText: "新增",
        addBtnIcon: "el-icon-plus",
        viewBtn: true,
        viewBtnText: "查看",
        viewBtnIcon: "el-icon-view",
        editBtn: true,
        editBtnText: "修改",
        editBtnIcon: "el-icon-edit",
        delBtn: true,
        delBtnText: "删除",
        delBtnIcon: "el-icon-delete",
        columnBtn: false,
        dialogDrag: true,
        column: [
          {
            label: "姓名",
            prop: "name",
            width: 200,
            overHidden: true,
            search: true,
            searchSpan: 8,
            hide: false,
          },
          {
            label: "性别",
            prop: "sex",
            search: true,
            searchSpan: 8,
            formatter: (val, value, label) => {
              return val == 1 ? "男" : "女";
            },
          },
          {
            label: "关键字",
            prop: "keyword",
            search: true,
            searchSpan: 8,
          },
          {
            label: "级别",
            prop: "cascader",
            type: "cascader",
            search: true,
            searchSpan: 8,
            dicData: [
              {
                label: "一级",
                value: 0,
                children: [
                  {
                    label: "一级1",
                    value: 1,
                  },
                  {
                    label: "一级2",
                    value: 2,
                  },
                ],
              },
            ],
          },
          {
            label: "多选框",
            prop: "selects",
            type: "select",filterable: true,
            multiple: true,
            search: true,
            searchType: "checkbox",
            searchSpan: 8,
            dicData: [
              {
                label: "选项1",
                value: 1,
              },
              {
                label: "选项2",
                value: 2,
              },
            ],
          },
          {
            label: "单选框",
            prop: "select",
            type: "select",filterable: true,
            search: true,
            searchType: "radio",
            searchSpan: 8,
            dicData: [
              {
                label: "选项1",
                value: 1,
              },
              {
                label: "选项2",
                value: 2,
              },
            ],
          },
        ],
      },
      page: {
        background: true,
        pagerCount: 5,
        total: 100,
        currentPage: 1,
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
      },
    };
  },
  computed: {},
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSubmit(form, done) {
      this.$message.success("3s后关闭");
      setTimeout(() => {
        done();
        console.log("提交的表单：", form);
      }, 3000);
    },
    handleReset() {
      this.$message.success("清空成功回调");
    },

    showDialog() {
      this.$DialogForm.show({
        title: "编辑项目",
        width: "60%",
        type: "",
        menuPosition: "right",
        option: this.formOption,
        beforeClose: (done) => {
          this.$message.success("关闭前方法");
          done();
        },
        callback: (res) => {
          console.log("提交的表单：", res.data);
          this.$message.success("关闭等待框");
          setTimeout(() => {
            res.done();
            setTimeout(() => {
              this.$message.success("关闭弹窗");
              res.close();
            }, 1000);
          }, 1000);
        },
      });
    },

    onLoad(page) {
      console.log("表格onLoad", page);
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getList();
      this.$message.success("行数" + val);
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getList();
      this.$message.success("页码" + val);
    },
    getList() {},
    resetChange(item) {
      this.$message.success("清空回调");
    },
    searchChange(params, done) {
      this.$message.success("2s后关闭锁定");
      setTimeout(() => {
        done();
        this.$message.success(JSON.stringify(params));
      }, 2000);
    },
    selectionChange(list) {
      this.$message.success("选中的数据" + JSON.stringify(list));
    },
    rowSave(form, done, loading) {
      this.$message.success("模拟网络请求");
      setTimeout(() => {
        this.$message.success("关闭按钮等待");
        loading();
      }, 1000);
      setTimeout(() => {
        this.$message.success("新增数据" + JSON.stringify(form));
        done(form);
      }, 2000);
    },
    rowUpdate(form, index, done, loading) {
      this.$message.success("模拟网络请求");
      setTimeout(() => {
        this.$message.success("关闭按钮等待");
        loading();
      }, 1000);
      setTimeout(() => {
        this.$message.success(
          "编辑数据" + JSON.stringify(form) + "数据序号" + index
        );
        done(form);
      }, 2000);
    },
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
    refreshChange() {
      this.$message.success("刷新回调");
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#demo {
}
</style>
