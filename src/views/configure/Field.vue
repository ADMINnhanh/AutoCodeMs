<!--
 * @Description: 默认字段列表
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 13:57:31
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-16 11:29:35
 * @FilePath: \web\src\views\configure\Field.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div id="field">
    <div class="headerT-commonStyle" style="height: 30px; padding: 0px">
      <span style="display: none"></span>
      <span style="font-size: 14px">默认字段列表</span>
    </div>
    <my-avue-crud
      ref="crud"
      module="Field"
      :hideTopMenu="false"
      :deleteProps="[
        'condition',
        'meaning',
        'sort',
        'defaultFunction',
        'dictName',
        'dictType',
        'dictTypeType',
      ]"
      :searchObj="{ type: -1 }"
      @queryAfter="queryAfter"
      @addBefore="addBefore"
      @updateBefore="addBefore"
      @beforeOpen="beforeOpen"
    >
    </my-avue-crud>
  </div>
</template>

<script>
import MyAvueCrud from "@/components/common/MyAvueCrud.vue";
export default {
  name: "Field",
  components: { "my-avue-crud": MyAvueCrud },
  data() {
    return {};
  },
  computed: {
    option() {
      return require(`@/assets/js/option/Field`).default(this);
    },
    api() {
      return require(`@/api/Field`).default(this);
    },
  },
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    queryAfter(data) {
      let self = this;
      if (data) {
        data.forEach((ele) => {
          ele.length =
            ele.length || ele.length === 0 ? Number(ele.length) : undefined;

          const functionList = ele.defaultFunction
            ? ele.defaultFunction.split(",")
            : [];
          ele.functionIds = []; // 1, 2, 3, 4, 5, 6
          ele.condition = 0; // 7 8
          ele.meaning = 0; // 9 10 11
          if (functionList && functionList.length > 0) {
            functionList.forEach((element) => {
              if (["1", "2", "3", "4", "5", "6"].indexOf(element) != -1) {
                ele.functionIds.push(Number(element));
              }
              if (["7", "8"].indexOf(element) != -1) {
                ele.condition = Number(element);
              }
              if (["9", "10", "11"].indexOf(element) != -1) {
                ele.meaning = Number(element);
              }
            });
          }
        });
      }
    },
    addBefore(form, row) {
      const data = row ? row : form;
      if (!form.functionIds) {
        form.functionIds = [];
      }
      if (form.condition) {
        form.functionIds.push(data.condition);
      }
      if (form.meaning) {
        form.functionIds.push(data.meaning);
      }
    },
    beforeOpen(type, form, option, isCopy, search) {
      // console.log(type, form, option, isCopy, search);
      if (type == "add") {
        !search.type || search.type == -1
          ? ""
          : (form.dictTypeId = search.type);
      }
      if (isCopy && type == "add") {
        form.name = form.name + "_copy";
      }
      if (type == "edit") {
        option.editTitle = "编辑默认字段 - " + form.name;
      }
      if (type == "view") {
        option.viewTitle = "查看默认字段 - " + form.name;
      }
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#field {
}
</style>
