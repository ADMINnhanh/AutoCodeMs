<!--
 * @Description: 项目详情/编辑页 -- 编辑功能字段
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-10 10:23:36
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-05 16:26:56
 * @FilePath: \web\src\components\modules\projectDetails\Transfer.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box Transfer">
    <PopUpsFrame
      :height="480"
      width="824px"
      @submit="submit"
      @closure="closure"
    >
      <template v-slot:title> 编辑功能字段</template>
      <template v-slot:content>
        <p>功能名称：{{ Transfer_data.name }}</p>
        <p>功能描述：{{ Transfer_data.description }}</p>
        <el-transfer
          :titles="['待选列表', '已选列表']"
          v-model="value"
          :data="data"
        ></el-transfer>
      </template>
    </PopUpsFrame>
  </div>
</template>

<script>
import PopUpsFrame from "../../common/popUpsFrame.vue";
export default {
  components: {
    PopUpsFrame,
  },
  props: ["Transfer_data"],
  data() {
    return {
      data: [],
      value: [],
    };
  },
  mounted() {
    // console.log(this.Transfer_data);
    this.getFieldByField();
    this.value = this.Transfer_data.fields.map((e) => e.id);
  },
  methods: {
    async getFieldByField() {
      let data = await this.api.getFieldByField(this, {
        tableId: this.Transfer_data.tableId,
      });
      if (data) {
        this.data = data.map((e) => ({
          key: e.id,
          label: e.name,
        }));
      }
    },

    async submit() {
      let data = await this.api.updateFiledByFunction(this, {
        functionId: this.Transfer_data.id,
        fieldIds: this.value,
      });
      if (data) {
        this.$message.success(data.msg);
        this.$emit("submit");
      }
    },
    closure() {
      this.$emit("closure");
    },
  },
};
</script>

<style lang="less">
.Transfer {
  .el-transfer {
    .el-checkbox__label {
      color: #999999 !important;
    }
    .el-transfer-panel {
      width: 300px !important;
    }
    .el-transfer-panel__body {
      height: 320px !important;
    }
    .el-transfer-panel__list {
      height: 320px !important;
    }
  }
}
</style>
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
  margin-bottom: 20px;
  font-size: 15px;
}
</style>