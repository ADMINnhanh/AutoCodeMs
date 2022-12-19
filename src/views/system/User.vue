<!--
 * @Description: 用户列表
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-14 10:54:01
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-13 11:10:12
 * @FilePath: \web\src\views\system\User.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div id="user">
    <div class="headerT-commonStyle" style="height: 30px; padding: 0px">
      <span style="display: none"></span>
      <span style="font-size: 14px">用户列表</span>
    </div>
    <my-avue-crud
      ref="crud"
      module="User"
      :isBatchDelBtn="false"
      :hideTopMenu="false"
      :deleteProps="['state1', 'deleted']"
      :searchObj="{ state: -1 }"
      @queryAfter="queryAfter"
      @addBefore="addBefore"
      @updateBefore="addBefore"
      @beforeOpen="beforeOpen"
    >
      <template slot="menuLeft" slot-scope="{ size }">
        <el-button
          :disabled="
            $refs.crud && $refs.crud.ids && $refs.crud.ids.length > 0
              ? false
              : true
          "
          :size="size"
          @click="batchDel($refs.crud.ids)"
        >
          <i class="icon iconfont icon-shanchu"></i>
          批量删除
        </el-button>
      </template>
      <template slot-scope="{ type, size, row }" slot="menu">
        <el-button
          :size="size"
          :type="type"
          icon="el-icon-refresh-right"
          @click.stop="reset(row)"
          >重置密码</el-button
        >
        <el-button
          :size="size"
          :type="type"
          icon="el-icon-delete"
          @click.stop="del(row)"
          >删除</el-button
        >
      </template>
    </my-avue-crud>

    <DelBox
      v-if="DelBox_view"
      @submit="delUser"
      :user="user_data"
      @closure="DelBox_view = false"
    ></DelBox>

    <ResetPassword
      v-if="ResetPassword_view"
      @submit="resetPwd"
      :user="user_data"
      @closure="ResetPassword_view = false"
    ></ResetPassword>
  </div>
</template>

<script>
import MyAvueCrud from "@/components/common/MyAvueCrud.vue";

import ResetPassword from "@/components/modules/user/resetPassword.vue";
import DelBox from "@/components/modules/user/delBox.vue";

export default {
  name: "User",
  components: {
    "my-avue-crud": MyAvueCrud,
    ResetPassword,
    DelBox,
  },
  data() {
    return {
      user_data: null,
      DelBox_view: false,
      ResetPassword_view: false,
    };
  },
  computed: {
    api() {
      return require(`@/api/User`).default(this);
    },
  },
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    queryAfter(data) {
      if (data) {
        data.forEach((element) => {
          element.state1 = element.state;
        });
      }
    },
    addBefore(form, row) {
      // console.log(form, row);
      const data = row ? row : form;
      form.state = data.state1;
    },
    beforeOpen(type, form, option) {
      if (type == "add") {
        form.password =
          "wjt" +
          new Date().getFullYear() +
          (new Date().getMonth() + 1) +
          new Date().getDate() +
          +Math.floor(Math.random() * 99);
      }
      if (type == "edit") {
        option.editTitle = "编辑用户 - " + form.username;
      }
      if (type == "view") {
        option.viewTitle = "查看用户 - " + form.username;
      }
    },

    reset(row) {
      this.user_data = row;
      this.ResetPassword_view = true;
    },
    resetPwd(form, done) {
      let self = this;
      let data = {
        newPassword: form.newPassword,
        password: form.password,
        id: this.user_data.id,
      };
      this.api
        .resetPwd(data)
        .then((res) => {
          done();
          if (res.code === 200) {
            this.ResetPassword_view = false;
            // 提示
            this.$message.success(res.msg || "重置成功");
            // 刷新
            // this.$refs.crud.getList();
          } else {
            // 提示
            this.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(function (error) {
          done();
          self.ResetPassword_view = false;
          self.$message.error(error);
        });
    },

    del(row) {
      this.user_data = row;
      this.user_data.batch = false;
      this.user_data.ids = undefined;
      this.DelBox_view = true;
    },
    batchDel(ids) {
      this.user_data = {};
      this.user_data.batch = true;
      this.user_data.ids = ids;
      this.DelBox_view = true;
    },
    delUser(form, done) {
      let self = this;
      let fun = this.user_data.batch ? "batchDel" : "del";
      let data = this.user_data.batch ? this.user_data.ids : this.user_data.id;
      this.api[fun](data, form.password)
        .then((res) => {
          done();
          if (res.code === 200) {
            // 清空已选
            this.$refs.crud &&
              this.$refs.crud.$refs["crud-User"].toggleSelection();
            this.DelBox_view = false;
            // 提示
            this.$message.success(res.msg || "删除成功");
            // 刷新
            this.$refs.crud.getList();
          } else {
            // 提示
            this.$message.error(res.msg || res.error || "错误！");
          }
        })
        .catch(function (error) {
          done();
          self.DelBox_view = false;
          self.$message.error(error);
        });
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#user {
}
</style>
