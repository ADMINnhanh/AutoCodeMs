<!--
 * @Author: xcl 
 * @Description: 创建项目 -> 弹窗
 * avue-crud行编辑：https://avuejs.com/crud/crud-cell/
-->
<template>
  <PopUpsFrame :height="446" width="50%" @submit="submit" @closure="closure">
    <template v-slot:title> 创建项目</template>
    <template v-slot:content>
      <avue-form :option="formOption" v-model="form"></avue-form
    ></template>
  </PopUpsFrame>
</template>

<script>
import PopUpsFrame from "../../common/popUpsFrame.vue";
export default {
  components: {
    PopUpsFrame,
  },
  data() {
    return {
      form: {},
      formOption: {
        size: "medium",
        gutter: 12,
        labelWidth: 80,
        labelPosition: "top",
        align: "center",
        menuAlign: "center",
        detail: false,
        printBtn: false,
        menuBtn: false,
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
            label: "项目路径",
            prop: "path",
            span: 24,
            display: true,
            required: true,
            rules: [
              {
                required: true,
                message: "请填写项目路径",
              },
            ],
          },
          {
            label: "表前缀",
            prop: "tablePrefix",
            span: 24,
            display: true,
            required: true,
            rules: [
              {
                required: true,
                message: "请填写表前缀",
              },
            ],
          },
          {
            label: "项目描述",
            prop: "describe",
            span: 24,
            display: true,
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      console.log("提交的表单：", this.form);
    },
    closure() {
      this.$store.commit("common_store_fun", (e) => {
        e.pop_ups_view = false;
        e.created_project_view = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>