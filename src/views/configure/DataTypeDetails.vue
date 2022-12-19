<!--
 * @Description: 字典数据管理 -> 字典数据详情
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-14 10:54:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-12 11:24:43
 * @FilePath: \web\src\views\configure\DataTypeDetails.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div id="dataTypeDetails">
    <div class="headerT-commonStyle" style="height: 30px; padding: 0px">
      <span style="display: none"></span>
      <span style="font-size: 14px">字典列表</span>
    </div>
    <my-avue-crud
      module="DataTypeDetails"
      :hideTopMenu="false"
      :deleteProps="['deleted']"
      :extraForm="{
        dictTypeId: parseInt($route.query.id),
      }"
      :extraParams="{
        dictTypeId: parseInt($route.query.id),
      }"
      @beforeOpen="beforeOpen"
    >
    </my-avue-crud>
  </div>
</template>

<script>
import MyAvueCrud from "@/components/common/MyAvueCrud.vue";
export default {
  name: "DataTypeDetails",
  components: {
    "my-avue-crud": MyAvueCrud,
  },
  data() {
    return {};
  },
  computed: {},
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    beforeOpen(type, form, option, isCopy) {
      if (isCopy && type == "add") {
        form.dictLabel = form.dictLabel + "_copy";
        form.dictValue = form.dictValue + "_copy";
      }
      if (type == "edit") {
        option.editTitle = "编辑字典项 - " + form.dictLabel;
      }
      if (type == "view") {
        option.viewTitle = "查看字典项 - " + form.dictLabel;
      }
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#dataTypeDetails {
}
</style>
