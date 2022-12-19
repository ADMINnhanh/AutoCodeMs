<!--
 * @Description: 生成代码(联表)
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-11 14:49:02
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-14 15:57:38
 * @FilePath: \web\src\components\modules\projectDetails\GenerateCodeLink.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <my-form-dialog
    @close="handleClose"
    v-if="isShow"
    :height="660"
    width="832px"
  >
    <template v-slot:title> 生成代码</template>
    <template v-slot:content>
      <el-row :gutter="20" class="GenerateCodeLink">
        <el-col :span="11">
          <avue-form
            ref="form"
            :key="'form-' + reload"
            :option="option"
            v-model="form"
            @submit="handleSubmit"
            @reset-change="handleReset"
          >
          </avue-form>
        </el-col>
        <el-col :span="2">
          <div class="line">
            <img src="../../../assets/images/u704.svg" alt="" />
          </div>
        </el-col>
        <el-col :span="11" class="SelectedAssociationSet">
          <div class="header">已选关联集：</div>
          <el-tree
            style="height: 460px; overflow: auto"
            ref="tree"
            v-loading="loading"
            :data="treeData"
            v-model="form"
            :check-on-click-node="true"
            :node-key="treeOption.props.value"
            :show-checkbox="treeOption.multiple"
            :props="treeOption.props"
            :highlight-current="!treeOption.multiple"
            @check-change="checkChange"
            :default-checked-keys="treeOption.defaultCheckedKeys"
            :default-expand-all="treeOption.defaultExpandAll"
            :accordion="treeOption.accordion"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span v-if="!data.fatherId">
                {{ node.label }}
              </span>
              <span v-else>
                {{ node.label.split(",")[0] }} （ {{ node.label.split(",")[1]
                }}<i class="iconfont icon-guanlian"></i>
                {{ node.label.split(",")[2] }}）
              </span>
            </span>
          </el-tree>
        </el-col>
      </el-row>
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
    // 数据
    treeData: {
      default: function () {
        return [];
      },
      type: Array,
    },
    // 左侧树 选中的节点
    treeCheckedNodes: {
      default: function () {
        return [];
      },
      type: Array,
    },
  },
  data() {
    return {
      isShow: false,
      reload: Math.random(),
      form: {},
      // 树
      form: {},
      loading: false,
    };
  },
  computed: {
    option() {
      return require(`@/assets/js/option/GenerateCodeLink`).default(this);
    },
    treeOption() {
      let opt = require(`@/assets/js/option/LinkTree`).default(this);
      let ids = this.treeCheckedNodes.map((item) => {
        return item[opt.props.value];
      });
      opt.defaultCheckedKeys = ids;
      return opt;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSubmit(form, done) {
      form.tables = []; // 父子关系表
      this.$refs.tree.getCheckedNodes().forEach((element) => {
        if (!element.children) {
          form.tables.push({
            father: element.fatherId,
            son: element.id,
          });
        }
      });
      if (form.tables.length <= 0) {
        done();
        return this.$message.warning("您没有选择关联集！");
      }
      let self = this;
      this.$emit("save", form, function () {
        done();
        self.isShow = false;
      });
    },
    handleReset() {
      this.isShow = false;
      this.$emit("cancel");
    },
    handleClose() {
      this.isShow = false;
      this.$emit("cancel");
    },
    handleOpen() {
      this.isShow = true;
    },

    // 已选关联集【树】
    checkChange(data) {
      // console.log(this.$refs.tree.getCheckedNodes(), this.treeCheckedNodes);
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.GenerateCodeLink {
  .line {
    height: 500px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 100%;
    }
  }
  .SelectedAssociationSet {
    .header {
      width: 100%;
      height: 40px;
      display: flex;
      font-family: "微软雅黑", sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #666666;
      text-align: left;
      line-height: 40px;
    }
    /deep/.el-collapse-item__header {
      display: block;
      position: relative;
      background-color: #eef6ff;
      box-sizing: border-box;
      margin-bottom: 6px;
      // border-bottom: 1px solid #d7d7d7;
      box-sizing: border-box;
      padding: 0 0 0 12px;
    }
    .title {
      width: auto;
      font-family: "微软雅黑", sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 12px;
      text-align: left;
      color: #0079fe;
    }
    .total {
      width: auto;
      font-family: "微软雅黑", sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 12px;
      text-align: left;
      color: #0079fe;
      position: absolute;
      right: 36px;
    }
    /deep/.el-collapse-item__arrow {
      color: #0079fe;
      float: right;
      position: absolute;
      right: 12px;
      top: calc(50% - 6px);
    }
    /deep/.el-collapse-item__content {
      .content {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        overflow: auto;
        max-height: 260px;
        background-color: rgba(255, 254, 254, 0.8470588235294118);
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(215, 215, 215, 1);
        padding: 12px;
        box-sizing: border-box;
        .el-checkbox-group {
          width: 100%;
        }
      }
    }
  }
}
</style>