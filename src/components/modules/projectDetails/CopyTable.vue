<!--
 * @Description: 
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-01 15:58:03
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-07 16:21:31
 * @FilePath: \web\src\components\modules\projectDetails\CopyTable.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box">
    <PopUpsFrame
      :height="300"
      width="30%"
      @submit="submit('ruleForm')"
      @closure="closure('ruleForm')"
    >
      <template v-slot:title>
        <slot name="title"></slot>
      </template>
      <template v-slot:content>
        <div class="warn">!</div>
        <p>复制表【{{ copyData.name }}】的所有字段信息。</p>
        <p>如需复制，请重命名（表名不能重复！）</p>
        <el-form
          :model="ruleForm"
          label-width="0px"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item
            label=""
            prop="name"
            style="margin-bottom: 20px; margin-top: 20px"
          >
            <el-input
              v-model="ruleForm.name"
              class="pre-wrap-placeholder"
              placeholder="格式：以小写英文字母开头，字符可由数字、小写英文字母组成，可使用下划线隔开；eg：user、t_user、t_user1、v1_user"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="notes" style="margin-bottom: 0px">
            <el-input
              type="textarea"
              v-model="ruleForm.notes"
              placeholder="请填写表备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
    </PopUpsFrame>
  </div>
</template>

<script>
import PopUpsFrame from "../../common/popUpsFrame.vue";
import rulesUtils from "@/utils/rules";
export default {
  name: "CopyTable",
  components: {
    PopUpsFrame,
  },
  props: {
    copyData: {
      default: {},
      type: Object,
    },
  },
  data() {
    let that = this;
    return {
      ruleForm: {
        name: this.copyData.name + "_copy",
        notes: this.copyData.notes,
      },
      rules: {
        name: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              rulesUtils.tableNameStandard(rule, value, callback);
            },
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              rulesUtils.byAPIDuplicationName(
                rule,
                value,
                callback,
                Object.assign(that, {
                  dialogType: "add",
                  dialogDataId: that.copyData.id,
                }),
                {
                  url: `${that.$common.basePath}/table/getList`,
                  method: "post",
                  data: {
                    keyword: "",
                    projectId: parseInt(that.$route.query.id),
                  },
                  hideLoading: true,
                }
              );
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      let self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("submit", this.ruleForm, function () {
            self.ruleForm.name = "";
            self.ruleForm.notes = "";
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closure(formName) {
      this.$refs[formName].resetFields();
      this.$emit("closure");
    },
  },
};
</script>

<style lang="less" scoped>
.pop_ups_box {
  position: fixed;
  top: 60px;
  height: calc(100% - 60px);
  background-color: rgba(0, 0, 0, 0.397);
  z-index: 10;
}
.warn {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 55px;
  background-color: #266ef5;
  font-weight: 700;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
p {
  text-align: center;
  line-height: 22px;
}
.el-input,
.el-textarea {
  width: 70%;
  margin: 0 auto;
  display: block;
}
/deep/.el-form-item__error {
  left: 15% !important;
}
</style>