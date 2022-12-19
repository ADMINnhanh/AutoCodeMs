<!--
 * @Description: 项目详情/编辑页 -- 编辑功能字段
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-10 10:23:36
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-06 09:55:17
 * @FilePath: \web\src\components\modules\project\linkTableTransfer.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box linkTableTransfer">
    <PopUpsFrame
      :height="540"
      width="924px"
      @submit="submit"
      @closure="closure"
    >
      <template v-slot:title
        >{{ Transfer_data ? "编辑" : "新增" }}关联集
        {{ Transfer_data ? " - " + Transfer_data.name : "" }}</template
      >
      <template v-slot:content>
        <div class="select_box">
          <div>
            <p><span>* </span> 关联集名称:</p>
            <h5 v-show="show.name">(必填)</h5>
            <el-input v-model="name" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <p><span>* </span> 选择父表:</p>
            <h5 v-show="show.father">(必填)</h5>
            <el-select
              @change="dataRedress"
              v-model="father"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <p><span>* </span> 选择子表:</p>
        <h5 v-show="show.son">(必填)</h5>
        <el-transfer
          :titles="['待选列表', '已选列表']"
          v-model="value"
          filterable
          :data="data"
          @left-check-change="leftCheckChange"
          @change="handleChange"
        >
          <span slot-scope="{ option }">
            {{ option.label }}
            &nbsp; &nbsp; &nbsp;
            {{ option.sonFieldId ? `子 : ${option.sonFieldName}` : "" }}
            &nbsp;
            {{ option.sonFieldId ? "---" : "" }}
            &nbsp;
            {{ option.sonFieldId ? `父 : ${option.fatherFieldName} ` : "" }}
          </span></el-transfer
        >
      </template>
    </PopUpsFrame>

    <article v-if="selectField.view" class="selectField">
      <div
        class="box"
        :style="{ top: selectField.top + 'px', left: selectField.left + 'px' }"
      >
        <avue-form
          ref="form"
          v-model="selectFieldForm"
          :option="selectFieldOption"
          @submit="handleSubmit"
          @reset-change="handleReset"
        >
          <template slot-scope="{ size }" slot="menuForm">
            <el-button
              type="primary"
              icon="el-icon-check"
              :size="size"
              @click="$refs.form.submit()"
              >完成</el-button
            >
            <el-button
              :size="size"
              icon="el-icon-close"
              @click="$refs.form.resetForm()"
              >取消</el-button
            >
          </template></avue-form
        >
      </div>
    </article>
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
      value: this.Transfer_data?.son.split(",") || [],

      options: [],

      name: this.Transfer_data?.name || "",
      father: this.Transfer_data?.father || "",

      show: {
        name: false,
        son: false,
        father: false,
      },

      // 关联字段弹窗 显示/定位
      selectField: {
        view: false,
        top: undefined,
        left: undefined,
      },
      // 表单配置
      selectFieldOption: {
        submitBtn: false,
        emptyBtn: false,
        span: 24,
        gutter: 42,
        align: "center",
        menuAlign: "center",
        detail: false,
        printBtn: false,
        column: [
          {
            label: "父表字段",
            prop: "father",
            type: "select",
            allowCreate: true,
            filterable: true,
            dicData: [],
            rules: [
              {
                required: true,
                message: "请填写字典类型名称",
              },
            ],
          },
          {
            label: "子表字段",
            prop: "son",
            type: "select",
            allowCreate: true,
            filterable: true,
            dicData: [],
            rules: [
              {
                required: true,
                message: "请填写字典类型名称",
              },
            ],
          },
        ],
      },
      // 表单数据
      selectFieldForm: {},
      // 当前正在操作的表
      selectFieldElement: undefined,
      // 当前正在操作的表名所在的元素 用于定位弹窗
      selectFieldTarget: undefined,
    };
  },
  mounted() {
    this.getListByTable();
    // console.log(this.Transfer_data);
  },
  methods: {
    // 选择字段弹窗  提交
    handleSubmit(form, done) {
      this.selectField.view = false;
      this.selectFieldForm = {};
      this.data.some((e) => {
        if (e.id == this.selectFieldElement) {
          e.sonFieldId = form.son.split("&$$&")[0];
          e.sonFieldName = form.son.split("&$$&")[1];
          e.fatherFieldId = form.father.split("&$$&")[0];
          e.fatherFieldName = form.father.split("&$$&")[1];
          return true;
        }
        return false;
      });
      done();
    },
    // 选择字段弹窗  取消
    handleReset() {
      if (!this.selectField.view) return;
      this.selectField.view = false;
      this.selectFieldForm = {};
      this.selectFieldTarget.click();
    },
    // 穿梭框  左右元素交换
    handleChange(value, direction, movedKeys) {
      if (direction == "left") {
        this.data.some((e) => {
          if (e.id == movedKeys[0]) {
            e.sonFieldId = "";
            e.sonFieldName = "";
            e.fatherFieldId = "";
            e.fatherFieldName = "";
            return true;
          }
          return false;
        });
      }
    },
    // 穿梭框  左侧元素勾选回调
    async leftCheckChange(list, e) {
      if (!list.some((ele) => ele == e)) {
        this.data.some((ele) => {
          if (ele.id == e[0]) {
            ele.sonFieldId = "";
            ele.sonFieldName = "";
            ele.fatherFieldId = "";
            ele.fatherFieldName = "";
            return true;
          }
          return false;
        });
        return;
      }

      let target = window.event.target;

      if (!this.father) {
        this.$message.warning("请先选择父表");
        setTimeout(() => {
          target.click();
        }, 50);
        return;
      }

      let son = this.data.filter((ele) => ele.key == e[0])[0];
      let father = this.data.filter((ele) => ele.name == this.father)[0];
      let bool = await this.getFieldByField(1, son.id, son.name);
      if (!bool) {
        setTimeout(() => {
          target.click();
        }, 50);
        return;
      }
      bool = await this.getFieldByField(0, father.id, father.name);
      if (!bool) {
        setTimeout(() => {
          target.click();
        }, 50);
        return;
      }

      this.selectFieldElement = e[0];
      this.selectFieldTarget = target;
      this.selectField = {
        view: true,
        top: target.getBoundingClientRect().top - 30,
        left: target.getBoundingClientRect().left + 10,
      };
    },
    // 获取父子表字段
    async getFieldByField(index, id, name) {
      let data = await this.api.getFieldByField(this, { tableId: id });
      if (data) {
        if (data.length > 0) {
          // console.log(data);
          this.selectFieldOption.column[index].dicData = data.map((e) => {
            e.label = e.name;
            e.value = e.id + "&$$&" + e.name;
            return e;
          });
          return true;
        } else {
          this.$message.warning(name + " ：没有字段可用于关联表");
          return false;
        }
      } else {
        this.$message.error("服务器异常");
        return false;
      }
    },

    dataRedress() {
      this.data.forEach((e) => {
        e.name == this.father ? (e.disabled = true) : (e.disabled = false);
      });
      if (this.value.indexOf(this.father) != -1)
        this.value.splice(this.value.indexOf(this.father != -1), 1);
    },

    async getListByTable() {
      let data = await this.api.getListByTable(this, {
        projectId: this.$route.query.id,
        keyword: "",
      });
      if (data) {
        // console.log(data);
        this.data = data.map((e) => {
          e.key = e.id;
          e.label = e.name;
          e.name == this.father ? (e.disabled = true) : "";

          e.sonFieldId = "";
          e.sonFieldName = "";
          e.fatherFieldId = "";
          e.fatherFieldName = "";
          return e;
        });
        this.options = data.map((e) => {
          e.value = e.name;
          e.label = e.name;
          return e;
        });
      }
    },

    async submit() {
      this.show = {
        name: !this.name,
        son: !this.value.length,
        father: !this.father,
      };
      if (!this.name || !this.value.length || !this.father) {
        this.$message.warning("请填写完整信息");
        return;
      }

      let son = this.data.filter((e) => this.value.includes(e.id));
      son = son.map((e) => `${e.id},${e.sonFieldId},${e.fatherFieldId}`);
      son = son.join(";");

      let data = await this.api[
        this.Transfer_data ? "updateByTableRelation" : "addByTableRelation"
      ](this, {
        [this.Transfer_data ? "id" : "projectId"]: this.Transfer_data
          ? this.Transfer_data.id
          : this.$route.query.id,
        name: this.name,
        father: this.father,
        son,
        type: 0,
      });
      if (data) {
        // console.log(data);
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
.el-transfer {
  .el-checkbox__label {
    color: #999999 !important;
  }
  .el-transfer-panel {
    width: 350px !important;
  }
  .el-transfer-panel__body {
    height: 320px !important;
  }
  .el-transfer-panel__list {
    height: 273px !important;
  }
}
.linkTableTransfer {
  .box {
    padding-top: 10px;
    background-color: white;
    overflow: hidden;
    border-radius: 8px;
    width: 350px;
    .el-form-item.el-form-item--small {
      margin-bottom: 10px;
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
  .selectField {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    .box {
      position: absolute;
    }
  }
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
.select_box {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  > div {
    width: 45%;
    .el-select {
      width: 100%;
    }
  }
}
p {
  font-size: 15px;
  span {
    color: red;
  }
}
h5 {
  padding-left: 10px;
  font-size: 14px;
  color: red;
}
.el-input,
.el-transfer,
.el-select {
  margin-top: 10px;
}
</style>