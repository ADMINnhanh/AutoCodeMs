<!--
 * @Description: 菜单导航组件
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-10-31 11:00:31
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-09 11:19:03
 * @FilePath: \web\src\components\common\MenuNav.vue
 * Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
-->
<template>
  <div id="menu-nav">
    <el-menu
      :default-active="activeMenu"
      @select="handleSelect"
      :background-color="
        $store.state.navMode == 'vertical' ? 'rgba(47, 56, 70, 1)' : ''
      "
      :text-color="$store.state.navMode == 'vertical' ? '#CCCCCC' : ''"
      :active-text-color="$store.state.navMode == 'vertical' ? '#ffffff' : ''"
      :mode="$store.state.navMode"
    >
      <div v-for="item in menu" :key="'menu-' + item.name">
        <!-- 一级菜单 -->
        <div v-if="item.children && item.children.length == 1">
          <el-menu-item
            v-show="!item.children[0].meta.hideSlide"
            :key="'one-level-menu-' + item.children[0].name"
            :index="item.children[0].name"
          >
            <span
              style="width: 16px"
              :class="'icon iconfont ' + item.meta.iconClass"
            >
            </span>
            {{ item.children[0].meta.menuName }}
          </el-menu-item>
        </div>
        <!-- 二级菜单 -->
        <div v-if="item.children && item.children.length > 1">
          <el-submenu :index="item.name" :key="'one-level-menu-' + item.name">
            <template slot="title">
              <span
                style="width: 16px"
                :class="'icon iconfont ' + item.meta.iconClass"
              >
              </span>
              <span>{{ item.meta.menuName }}</span>
            </template>
            <el-menu-item
              v-for="itemChild in item.children"
              v-show="!itemChild.meta.hideSlide"
              :key="'two-level-menu-' + itemChild.name"
              :index="itemChild.name"
            >
              {{ itemChild.meta.menuName }}
            </el-menu-item>
          </el-submenu>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import routes from "@/router/routes";
export default {
  name: "MenuNav",
  components: {},
  data() {
    return {
      activeMenu: "Home",
      menu: [],

      option: () => ({
        submitBtn: false,
        span: 24,
        labelPosition: "top",
        emptyBtn: false,
        column: [
          {
            label: "请选择要恢复的项目",
            prop: "id",
            type: "select",
            dicData: [],
            rules: [
              {
                required: true,
                message: "请选择要恢复的项目",
              },
            ],
          },
          {
            type: "password",
            autocomplete: "new-password",
            label: "验证当前账号登录密码",
            prop: "password",
            type: "password",
            placeholder: "请填写登录密码",
            required: true,
            rules: [
              {
                required: true,
                message: "请填写登录密码",
              },
            ],
          },
        ],
      }),
    };
  },
  watch: {
    "$route.name": {
      deep: true,
      handler: function (newV, oldV) {
        // 防止activeMenu不及时更新
        if (newV) {
          // console.log(newV);
          if (newV != "Home" && newV != "List")
            window.upDataByProject = undefined;

          this.activeMenu = newV;
        }
      },
      immediate: true,
    },
  },
  created() {
    // 初始化菜单
    let menu = [];
    routes.forEach((element) => {
      if (
        element.path != "/login" &&
        element.path != "/error" &&
        element.path != "*"
      ) {
        if (element.children && element.children.length > 0) {
          menu.push(element);
        }
      }
    });
    this.menu = menu;
  },
  mounted() {
    // console.log(this.$route, this.menu);
    this.activeMenu = this.$router.history.current.name;
  },
  methods: {
    /**
     * 菜单激活回调
     * @param {*} key
     * @param {*} keyPath
     */
    handleSelect(key, keyPath) {
      // console.log(key);
      if (key == "DataRecovery") {
        this.dataRecovery();
      } else {
        this.activeMenu = key;
        this.$router.push({
          name: key,
        });
      }
    },

    // 数据恢复
    async dataRecovery() {
      let option = this.option();

      let data = await this.api.dataRecoveryByProject(this);
      if (data) {
        option.column[0].dicData = data.map((e) => ({
          label: e.name,
          desc: e.description,
          value: e.id,
        }));
        this.DialogForm({
          title: "数据恢复",
          width: "500px",
          height: 220,
          option,
          callback: async (res) => {
            // console.log(res.data);
            let data = await this.api.updateDataByProject(this, res.data);
            if (data) {
              this.$message.success(data.msg);
              window.upDataByProject && window.upDataByProject();
              res.close();
            }
          },
        });
      }
    },
  },
};
</script>

<style lang="less">
body {
  > .el-select-dropdown.el-popper {
    max-width: 600px;
    ul {
      li {
        span {
          white-space: initial;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
#menu-nav {
  /deep/.el-menu.el-menu--horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-bottom: 0;
    background-color: rgba(47, 56, 70, 1);
  }

  /deep/.el-submenu__title i {
    color: #eee !important;
  }
  /deep/.el-submenu__title span {
    color: #eee !important;
  }
  /deep/.el-menu-item i {
    color: #eee !important;
  }
  /deep/.el-menu--horizontal .el-submenu__icon-arrow {
    right: 10px;
    margin-top: -4px;
  }

  /deep/.el-menu-item {
    display: flex;
    color: #eee;
    span {
      margin-right: 6px;
    }
  }
  /deep/ .el-submenu__title,
  .el-menu-item {
    height: 60px;
    line-height: 60px;
    padding: 0 36px !important;
  }
  /deep/ .el-menu-item {
    padding-right: 20px !important;
  }

  .iconfont {
    position: absolute;
    top: 1px;
    left: 10px;
  }
  .el-icon {
    position: absolute;
    top: 22px;
    left: 10px;
  }

  /deep/.el-menu-item.is-active {
    background-color: rgba(0, 121, 254, 1) !important;
  }
  /deep/.el-menu-item.is-active i {
    color: #fff !important;
  }
  /deep/.el-submenu.is-active {
    background-color: rgba(0, 121, 254, 1) !important;
  }
  /deep/.el-submenu.is-active .el-submenu__title i {
    color: #fff !important;
  }
  /deep/.el-submenu.is-active .el-submenu__title span {
    color: #fff !important;
  }

  /deep/.el-submenu__title.is-active {
    color: #fff !important;
    background-color: rgba(0, 121, 254, 1) !important;
    border-bottom-color: rgba(0, 121, 254, 1) !important;
  }
  /deep/.el-submenu__title:not(.is-disabled):focus,
  /deep/.el-submenu__title:not(.is-disabled):hover {
    color: #fff !important;
    background-color: rgba(0, 121, 254, 1) !important;
    border-bottom-color: rgba(0, 121, 254, 1) !important;
  }

  /deep/.el-menu-item.is-active {
    color: #fff !important;
    background-color: rgba(0, 121, 254, 1) !important;
    border-bottom-color: rgba(0, 121, 254, 1) !important;
  }
  /deep/.el-menu-item:not(.is-disabled):focus,
  /deep/.el-menu-item:not(.is-disabled):hover {
    color: #fff !important;
    background-color: rgba(0, 121, 254, 1) !important;
    border-bottom-color: rgba(0, 121, 254, 1) !important;
  }
}

.el-menu--horizontal .el-menu-item.is-active {
  color: #fff !important;
  background-color: rgba(0, 121, 254, 1) !important;
  border-bottom-color: rgba(0, 121, 254, 1) !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #fff !important;
  background-color: rgba(0, 121, 254, 1) !important;
  border-bottom-color: rgba(0, 121, 254, 1) !important;
}
</style>
