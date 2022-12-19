<template>
  <div class="log_box">
    <avue-tabs :option="option" @change="handleChange"></avue-tabs>
    <section>
      <div class="select_box" v-if="type.prop === 'login'">
        <el-input
          placeholder="用户名/IP"
          clearable
          v-model="input"
          @change="log(false)"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="log(false)"
          ></el-button>
        </el-input>
        <el-select
          v-model="user_action_value"
          placeholder="用户操作"
          @change="log(true)"
        >
          <el-option
            v-for="item in user_action"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="user_state_value"
          placeholder="状态"
          @change="log(true)"
        >
          <el-option
            v-for="item in user_state"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="time_limit"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="log(true)"
        >
        </el-date-picker>
      </div>
      <div class="select_box" v-else-if="type.prop === 'operation'">
        <el-input
          placeholder="用户名/IP/用户操作/请求方式"
          v-model="input"
          @change="log(false)"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="log(false)"
          ></el-button>
        </el-input>
        <el-select
          v-model="user_state_value"
          placeholder="状态"
          @change="log(true)"
        >
          <el-option
            v-for="item in user_state"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-date-picker
          v-model="time_limit"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="log(true)"
        >
        </el-date-picker>
      </div>
      <div class="select_box" v-else-if="type.prop === 'error'">
        <el-input
          placeholder="用户名/IP/异常信息/请求方式"
          v-model="input"
          @change="log(false)"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="log(false)"
          ></el-button>
        </el-input>

        <el-date-picker
          v-model="time_limit"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="log(true)"
        >
        </el-date-picker>
      </div>
      <avue-crud
        class="list_box"
        :data="data"
        v-if="updataByHeight"
        :key="reload"
        :option="
          type.prop == 'login'
            ? login_crud_option
            : type.prop == 'operation'
            ? operate_crud_option
            : errer_crud_option
        "
        :page.sync="page"
        @size-change="log(false)"
        @current-change="log(false)"
        @row-click="handleRowClick"
      >
      </avue-crud>
    </section>
  </div>
</template>

<script>
import loginCrud from "@/assets/js/option/loginCrud.js";
import operateCrud from "@/assets/js/option/operateCrud.js";
import errerCrud from "@/assets/js/option/errerCrud.js";

export default {
  data() {
    return {
      input: "",

      type: {},
      option: {
        column: [
          {
            label: "登录日志",
            prop: "login",
          },
          {
            label: "操作日志",
            prop: "operation",
          },
          {
            label: "异常日志",
            prop: "error",
          },
        ],
      },

      reload: Math.random(),
      data: [],
      login_crud_option: loginCrud(),
      operate_crud_option: operateCrud(),
      errer_crud_option: errerCrud(),
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },

      user_action: [
        {
          value: -1,
          label: "用户操作",
        },
        {
          value: 0,
          label: "用户登录",
        },
        {
          value: 1,
          label: "用户登出",
        },
      ],
      user_action_value: -1,

      user_state: [
        {
          value: -1,
          label: "状态",
        },
        {
          value: 0,
          label: "失败",
        },
        {
          value: 1,
          label: "成功",
        },
        {
          value: 2,
          label: "账号已锁定",
        },
      ],
      user_state_value: -1,

      updataByHeight: true,

      time_limit: "",
    };
  },
  created() {
    this.type = this.option.column[0];
  },
  mounted() {
    this.loginByLog();
    this.window_resize();
  },
  methods: {
    log(bool) {
      if (bool) this.page.currentPage = 1;
      this[this.type.prop + "ByLog"]();
    },
    handleRowClick() {
      if (window.event.target.innerText.length > 100) {
        let text = document.createElement("textarea");
        text.innerText = window.event.target.innerText;
        document.body.appendChild(text);
        text.select();
        document.execCommand("Copy");
        document.body.removeChild(text);
        this.$message.success("已复制");
      }
    },

    async loginByLog() {
      let data = await this.api.loginByLog(this, {
        currentPage: this.page.currentPage,
        keyword: this.input,
        pageSize: this.page.pageSize,
        sortField: "createTime",
        sortOrder: 1,
        operation: this.user_action_value,
        status: this.user_state_value,
        ...(this.time_limit
          ? {
              begin: this.time_limit[0],
              end: this.time_limit[1],
            }
          : {}),
      });
      if (data) {
        // console.log(data);
        if (
          data.rows.length == 0 &&
          data.total > 0 &&
          this.page.currentPage > 1
        ) {
          this.page.currentPage = 1;
          this.loginByLog();
          return;
        }

        this.page.total = data.total;
        this.data = data.rows;
      }
    },
    async operationByLog() {
      let data = await this.api.operationByLog(this, {
        currentPage: this.page.currentPage,
        keyword: this.input,
        pageSize: this.page.pageSize,
        sortField: "createTime",
        sortOrder: 1,
        status: this.user_state_value,
        ...(this.time_limit
          ? {
              begin: this.time_limit[0],
              end: this.time_limit[1],
            }
          : {}),
      });
      if (data) {
        // console.log(data);
        if (
          data.rows.length == 0 &&
          data.total > 0 &&
          this.page.currentPage > 1
        ) {
          this.page.currentPage = 1;
          this.operationByLog();
          return;
        }
        this.page.total = data.total;
        this.data = data.rows;
      }
    },
    async errorByLog() {
      let data = await this.api.errorByLog(this, {
        currentPage: this.page.currentPage,
        keyword: this.input,
        pageSize: this.page.pageSize,
        sortField: "createTime",
        sortOrder: 1,
        ...(this.time_limit
          ? {
              begin: this.time_limit[0],
              end: this.time_limit[1],
            }
          : {}),
      });
      if (data) {
        // console.log(data);
        if (
          data.rows.length == 0 &&
          data.total > 0 &&
          this.page.currentPage > 1
        ) {
          this.page.currentPage = 1;
          this.errorByLog();
          return;
        }
        this.page.total = data.total;
        this.data = data.rows;
      }
    },

    window_resize() {
      let self = this;
      function windowSize() {
        let height = 590 + window.innerHeight - 969;
        self.login_crud_option.height = height;
        self.operate_crud_option.height = height;
        self.errer_crud_option.height = height;
        self.updataByHeight = false;
        self.$nextTick(() => (self.updataByHeight = true));
      }
      windowSize();
      window.addEventListener("resize", windowSize);
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("resize", windowSize);
      });
    },

    handleChange(column) {
      this.reload = Math.random();

      this.type = column;
      this.input = "";
      this.page = {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      };
      this.user_action_value = -1;
      this.user_state_value = -1;
      this.data = [];
      this.time_limit = "";
      this[this.type.prop + "ByLog"]();
    },
  },
};
</script>

<style lang="less">
.list_box .el-table__body-wrapper tbody .el-table__row td div span {
  text-overflow: ellipsis;
  display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
  -webkit-line-clamp: 5; // 将对象作为弹性伸缩盒子模型显示。
  -webkit-box-orient: vertical; // 从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
  overflow: hidden;
}
.log_box {
  section {
    .avue-crud__menu {
      display: none;
    }
    .select_box {
      display: flex;
      justify-content: right;
      align-items: center;
      margin: 5px 0 20px;
      > .el-input {
        width: 500px;
        height: 40px;
      }
      .el-select {
        width: 200px;
        margin-left: 10px;
      }
      .el-date-editor {
        margin-left: 10px;
      }
    }
  }
  .list_box {
    .el-card.is-never-shadow.avue-crud__pagination {
      padding: 18px 10px 0 0;
    }
  }
}
</style>