<!--
 * @Description: 生成代码(单表)
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-11 14:49:02
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-08 10:35:26
 * @FilePath: \web\src\components\modules\projectDetails\GenerateCode.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <my-form-dialog
    @close="handleClose"
    v-if="isShow"
    :height="720"
    width="832px"
  >
    <template v-slot:title> 生成代码</template>
    <template v-slot:content>
      <avue-form
        ref="form"
        :key="'form-' + reload"
        :option="option"
        v-model="form"
        @submit="handleSubmit"
        @reset-change="handleReset"
      >
        <template slot-scope="{}" slot="tableIdsLabel">
          <span>已选表：</span>
          <el-popover
            placement="top"
            transition="zoom-in-bottom"
            :visible-arrow="true"
            width="500"
            trigger="hover"
          >
            <div style="display: flex; flex-wrap: wrap; gap: 20px">
              <el-checkbox-group v-model="tableIds" class="mycheckboxgroup">
                <el-checkbox
                  style="margin-right: 0px; width: 33.3%; margin-bottom: 16px"
                  class="ellipsis"
                  v-for="item in tableData"
                  :key="item.id"
                  :label="item.id"
                  >{{ item.name
                  }}{{ item.notes ? "（" + item.notes + ")" : "" }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <el-button
              slot="reference"
              style="position: absolute; right: 10px"
              type="text"
              icon="el-icon-circle-plus-outline"
            >
              添加表
            </el-button>
          </el-popover>
        </template>
        <template slot="tableIds">
          <div class="mytag" style="display: flex; flex-wrap: wrap; gap: 8px">
            <el-tag
              v-for="tag in selectTableData"
              :key="tag.id"
              closable
              class="ellipsis"
              @close="handleCloseTag(tag)"
            >
              {{ tag.name }}{{ tag.notes ? "（" + tag.notes + ")" : "" }}
            </el-tag>
          </div>
        </template>
      </avue-form>
    </template>
    <template v-slot:footer>
      <div>
        <el-button type="primary" size="medium " @click="$refs.form.submit()">
          <i class="icon iconfont icon-xiazai"></i>
          生成代码
        </el-button>
        <el-button plain size="medium " @click="$refs.form.resetForm()">
          <i class="icon iconfont icon-fanhui"></i>
          取消
        </el-button>
      </div>
    </template>
  </my-form-dialog>
</template>

<script>
import MyFormDialog from "@/components/common/MyFormDialog.vue";
export default {
  name: "GenerateCode",
  components: {
    "my-form-dialog": MyFormDialog,
  },
  props: {
    // crudRefs: {
    //   type: Object,
    //   default: null,
    // },
  },
  data() {
    return {
      crudRefs: this.$parent.$refs.crud,

      isShow: false,
      reload: Math.random(),
      form: {
        tableIds: [],
      },
    };
  },
  computed: {
    option() {
      return require(`@/assets/js/option/GenerateCode`).default(this);
    },
    selectTableData() {
      return this.crudRefs ? this.crudRefs.selectData : [];
    },
    tableData() {
      return this.crudRefs ? this.crudRefs.data : [];
    },
    tableIds: {
      get() {
        return this.crudRefs ? this.crudRefs.ids : [];
      },
      set(ids) {
        this.setTableIds(ids);
      },
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.form.tableIds = this.tableIds; // 数据双向绑定
  },
  methods: {
    /**
     * 提交
     */
    handleSubmit(form, done) {
      // this.$emit("save", form, function () {
      //   done();
      //   this.clear();
      // });
      form.tableIds = this.tableIds;
      if (form.tableIds.length <= 0) {
        done();
        return this.$message.warning("您没有选择表！");
      }
      let self = this;
      let config = {
        url: `${self.$common.basePath}/table/generateCode`,
        method: "post",
        data: form,
        hideLoading: true,
        responseType: "blob", // 1.首先设置responseType对象格式为 blob: // 二进制流
      };
      self
        .axios(config)
        .then(function (res) {
          if (res.data) {
            // 下载附件
            self.$common._fileBold_octet(res);
            // done
            done();
            self.clear();
            // 提示
            self.$message.success(res.msg || "成功！");
          } else {
            // 提示
            self.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(function (error) {
          self.clear();
          // 提示
          self.$message.error(error);
        });
    },
    handleReset() {
      this.clear();
      // this.$emit("cancel");
    },
    handleClose() {
      this.clear();
      // this.$emit("cancel");
    },
    clear() {
      // 清空
      this.crudRefs &&
        this.crudRefs.$refs["crud-SingleTable"] &&
        this.crudRefs.$refs["crud-SingleTable"].toggleSelection();
      // 关闭
      this.isShow = false;
    },

    handleOpen() {
      this.isShow = true;
    },

    setTableIds(ids) {
      const crud = this.crudRefs.$refs["crud-SingleTable"];
      // 清空
      crud.toggleSelection();
      // 通过 toggleSelection 设置
      let rows = this.tableData.filter((ele) => {
        return ids.indexOf(ele.id) !== -1;
      });
      crud.toggleSelection(rows);
    },

    handleCloseTag(tag) {
      const crud = this.crudRefs.$refs["crud-SingleTable"];
      const array = this.selectTableData;
      // 清空
      crud.toggleSelection();
      // 通过 toggleSelection 设置
      let rows = array.filter((row) => {
        return tag.id != row.id;
      });
      crud.toggleSelection(rows);
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.mytag {
  /deep/ .el-tag {
    background-color: #fff;
    border-color: #0079fe;
    height: 36px;
    padding: 0 24px 0 24px;
    line-height: 36px;
    font-size: 16px;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    box-sizing: border-box;
    white-space: nowrap;
    width: 380px;
    color: #0079fe;
    position: relative;
    .el-icon-close {
      border-radius: 0;
      text-align: center;
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      height: 36px;
      width: 36px;
      line-height: 16px;
      vertical-align: middle;
      top: 0px;
      right: 0px;
      border-left: 1px solid #0079fe;
      box-sizing: border-box;
      color: #0079fe;
    }
    .el-icon-close::before {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .el-tag__close:hover {
      color: #fff;
      background-color: #409eff;
    }
  }
}
.mycheckboxgroup {
  /deep/.el-checkbox__input {
    float: left;
  }
  /deep/.el-checkbox__label {
    float: left;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
    word-break: break-all;
    text-overflow: ellipsis;
    width: calc(100% - 24px);
  }
}
</style>