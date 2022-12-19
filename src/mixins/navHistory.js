/**
 * @Description: 顶部历史导航  混入函数
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-18 08:44:04
 * @LastEditors: xcl
 * @LastEditTime: 2022-11-23 10:21:12
 * @FilePath: \web\src\mixins\navHistory.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
import Vue from "vue";

export default {
  // inject: ['reload'],// 如果在其它地方使用刷新功能，需要先注入reload
  data: function () {
    return {
      navHistoryActive: "",
      navHistory: [
      ],
    };
  },
  watch: {
    $route: {
      handler: function (newV, oldV) {
        this.$store.commit("setNewMenuName", "");// 切换菜单时，清空副标题
        // console.log(newV, oldV);
        this.pushNavHistory(newV);
      },
      // 深度观察监听
      deep: true,
    },
  },
  created() {
    this.navHistoryActive = this.$route.fullPath;
    this.navHistory = [this.$route];
  },
  mounted() { },
  methods: {
    // 最近添加 或者 替换为最新的
    pushNavHistory(data) {
      if (data.name == 'Login' || data.name == 'Error') {
        return;
      }
      this.navHistoryActive = data.fullPath;
      let names = this.navHistory.map((item) => {
        return item.name;
      });
      if (names.indexOf(data.name) === -1) {
        // 添加
        this.navHistory.push(data)
      } else {
        // 替换
        this.navHistory.forEach((ele, i) => {
          if (ele.name == data.name) {
            this.navHistory.splice(i, 1, data)
            return;
          }
        });
      }
      // console.log(this.navHistory)
    },
    // 移除
    removeTab(target) {
      // 获取下标，并从数组navHistory中删除
      this.navHistory.forEach((ele, i) => {
        if (ele.fullPath == target) {
          this.navHistory.splice(i, 1);
          return;
        }
      });
      // 判断移除的目标是否为当前激活项
      if (target === this.navHistoryActive) {
        // 是
        if (this.navHistory.length > 0) {
          this.navHistoryActive = this.navHistory[this.navHistory.length - 1].fullPath;
          this.clickNavHistory({ name: this.navHistoryActive });
        } else {
          this.navHistory = [
            {
              name: "Home",
              fullPath: "/home/home",
              path: "/home/home",
              meta: { menuName: "首页", showNav: true },
              params: {},
              query: {},
            },
          ];
          this.clickNavHistory({ name: '/home/home' })
        }
      } else {
        // 否
      }
    },
    // 点击跳转路由
    clickNavHistory(tab) {
      let res = this.navHistory.filter((ele) => {
        return ele.fullPath == tab.name;
      });
      if (res && res.length > 0) {
        let e = res[0];
        this.$router.push({
          path: e.fullPath
        });
      }
    },
    // 下拉菜单
    handleCommand(command) {
      if (command == 'refresh') {
        this.reload();
        // 解决刷新死循环
        // if (this.$route.meta.reload.indexOf('one') == -1) {
        //   this.$route.meta.reload = 'one'
        //   this.reload()
        // }
      }
      if (command == 'else') {
        if (this.navHistory.length > 1) {
          let res = this.navHistory.filter((ele) => {
            return ele.fullPath == this.navHistoryActive;
          });
          if (res && res.length > 0) {
            this.navHistory = res
          };
        }
      }
      if (command == 'left') {
        if (this.navHistory.length > 1) {
          // 获取下标，并从数组navHistory中删除
          this.navHistory.forEach((ele, i) => {
            if (ele.fullPath == this.navHistoryActive) {
              if (i > 0) {
                this.navHistory.splice(0, i);
              } else {
                console.log('No more # Left')
              }
              return;
            }
          });
        } else {
          console.log('No # Left')
        }
      }
      if (command == 'right') {
        if (this.navHistory.length > 1) {
          // 获取下标，并从数组navHistory中删除
          this.navHistory.forEach((ele, i) => {
            if (ele.fullPath == this.navHistoryActive) {
              if (i < this.navHistory.length - 1) {
                this.navHistory.splice(i + 1, this.navHistory.length - i - 1);
              } else {
                console.log('No more # Right')
              }
              return;
            }
          });
        } else {
          console.log('No # Right')
        }
      }
      if (command == 'all') {
        if (!(this.navHistory.length == 1 && this.navHistoryActive == 'Home')) {
          this.navHistory = [
            {
              name: "Home",
              fullPath: "/home/home",
              path: "/home/home",
              meta: { menuName: "首页", showNav: true },
              params: {},
              query: {},
            },
          ];
          this.clickNavHistory({ name: '/home/home' })
        }
      }
    }
  },
};