<!--
 * @Description: 项目详情/编辑页 -- 编辑功能字段
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-10 10:23:36
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-14 14:11:31
 * @FilePath: \web\src\components\modules\project\linkTableTransfer.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
-->
<template>
  <div class="pop_ups_box linkTableTransfer">
    <PopUpsFrame
      :height="540"
      width="1024px"
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
            <el-select v-model="father" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <p>选择父表字段:</p>
            <el-select
              @change="selectField"
              v-model="fatherField"
              placeholder="请选择"
              :disabled="!father"
            >
              <el-option
                v-for="item in fatherFieldArr"
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
        <div class="select-list-box">
          <el-transfer
            id="el-transfer"
            :titles="['待选列表']"
            filterable
            :data="data"
            @left-check-change="leftCheckChange"
          >
          </el-transfer>
          <article class="select-list">
            <header>
              <span>已选子表</span>
              <span>子表字段</span>
              <span>父表字段</span>
            </header>
            <section class="list">
              <div v-for="e in sonFieldArr" :key="e.id">
                <span>{{ e.name }}</span>
                <el-select v-model="e.sonFieldId" placeholder="请选择">
                  <el-option
                    v-for="item in e.fieldArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <i class="iconfont icon-guanlian"></i>
                <el-select v-model="e.fatherFieldId" placeholder="请选择">
                  <el-option
                    v-for="item in fatherFieldArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <i class="el-icon-delete" @click="e.target.click()"></i>
              </div>
            </section>
          </article>
        </div>
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

      options: [],

      name: this.Transfer_data?.name || "",
      father: this.Transfer_data?.father || "",
      father_backup: this.Transfer_data?.father || "",

      show: {
        name: false,
        son: false,
        father: false,
      },

      fatherField: "",
      fatherFieldArr: [],
      sonFieldArr: [],

      init_time: false,
    };
  },
  watch: {
    async father(now, old) {
      if (!now || now == this.father_backup) return;
      now = this.data.filter((e) => e.id == now)[0];
      let data = await this.getFieldByField(now.id, now.name);
      if (data) {
        // console.log(data);
        this.father_backup = now.id;

        this.data.some((e) => {
          if (e.disabled) {
            e.disabled = false;
            return true;
          } else return false;
        });
        this.sonFieldArr.forEach((e, i) => {
          setTimeout(() => {
            e.target.click();
          }, i * 20);
          if (i == this.sonFieldArr.length - 1)
            setTimeout(() => {
              this.data.some((e) => {
                if (e.id == now.id) e.disabled = true;
                return e.id == now.id;
              });
            }, i * 20 + 20);
        });
        if (!this.sonFieldArr.length)
          this.data.some((e) => {
            if (e.id == now.id) e.disabled = true;
            return e.id == now.id;
          });

        this.fatherFieldArr = data.map((e) => ({
          label: e.name,
          value: e.id,
        }));
        this.fatherField = "";
        this.sonFieldArr = [];
      } else {
        this.father = old;
      }
    },
  },
  mounted() {
    this.getListByTable();
    // console.log(this.Transfer_data);
  },
  methods: {
    selectField() {
      this.sonFieldArr.forEach((e) => (e.fatherFieldId = this.fatherField));
    },
    getTarget(id) {
      let name = this.data.filter((e) => e.id == id)[0].name;
      let e = document.querySelectorAll(
        `#el-transfer .el-checkbox-group.el-transfer-panel__list.is-filterable label`
      );
      e = Array.prototype.slice.call(e).filter((e) => e.textContent == name)[0];
      return e;
    },
    // 穿梭框  左侧元素勾选回调
    async leftCheckChange(list, e) {
      // console.log(e);
      if (this.init_time) return;

      if (e.length > 1) {
        if (list.length == 0) {
          this.sonFieldArr = [];
        } else {
          if (!this.father) {
            this.$message.warning("请先选择父表");
            let target = document.querySelector(
              `#el-transfer  .el-transfer-panel .el-transfer-panel__header label`
            );
            setTimeout(() => {
              target.click();
            }, 50);
            return;
          } else {
            let id = this.father;
            e.forEach((ele) => {
              if (id == ele) {
                this.data.some((e) => {
                  if (e.id == id) e.disabled = false;
                  return e.id == id;
                });
                setTimeout(() => {
                  this.getTarget(ele).click();
                  this.data.some((e) => {
                    if (e.id == id) e.disabled = true;
                    return e.id == id;
                  });
                }, 50);
              } else this.leftCheckChange("select all", [ele]);
            });
          }
          return;
        }
      }
      if (list != "select all" && !list.some((ele) => ele == e[0])) {
        this.sonFieldArr = this.sonFieldArr.filter((ele) => ele.id != e[0]);
        // console.log(this.sonFieldArr);
        return;
      }

      let target =
        list == "select all" ? this.getTarget(e[0]) : window.event.target;

      if (!this.father) {
        this.$message.warning("请先选择父表");
        setTimeout(() => {
          target.click();
        }, 50);
        return;
      }

      let son = this.data.filter((ele) => ele.key == e[0])[0];
      let data = await this.getFieldByField(son.id, son.name);
      if (data) {
        son.fieldArr = data.map((e) => ({
          label: e.name,
          value: e.id,
        }));
        son.fatherFieldId = this.fatherField;
        son = JSON.parse(JSON.stringify(son));
        son.target = target;
        this.sonFieldArr.push(son);
        // console.log(this.sonFieldArr);
      } else {
        setTimeout(() => {
          target.click();
        }, 50);
        return;
      }
    },
    // 获取表字段
    async getFieldByField(id, name) {
      let data = await this.api.getFieldByField(this, { tableId: id });
      if (data) {
        if (data.length > 0) {
          return data;
        } else {
          this.$message.warning(name + " ：没有字段可用于关联表");
          return false;
        }
      } else {
        this.$message.error("服务器异常");
        return false;
      }
    },

    async getListByTable() {
      let data = await this.api.getListByTable(this, {
        projectId: this.$route.query.id,
        keyword: "",
      });
      if (data) {
        // console.log(data);
        let father;
        this.data = data.map((e) => {
          e.key = e.id;
          e.label = e.name;
          // e.name == this.father ? (e.disabled = true) : "";
          if (e.id == this.father) father = e;
          e.disabled = e.id == this.father;
          return e;
        });
        this.options = data.map((e) => {
          e.value = e.id + "";
          e.label = e.name;
          return e;
        });

        if (this.Transfer_data)
          this.init(this.Transfer_data.son.split(";"), father);
      }
    },
    init(table, father) {
      if (!father) {
        this.$message.error("name为" + this.father + "的表不存在");
        console.error("name为" + this.father + "的表不存在");
        return;
      }

      this.init_time = true;
      this.$nextTick(async () => {
        table.forEach((e, i) => {
          let data = e.split(",");
          setTimeout(() => {
            this.getTarget(data[0]).click();
          }, 20 * i);

          if (i == table.length - 1)
            setTimeout(() => {
              this.init_time = false;
            }, 20 * i + 20);
        });

        let data = await this.getFieldByField(father.id, father.name);
        this.fatherFieldArr = data.map((e) => ({
          label: e.name,
          value: e.id,
        }));

        table.forEach(async (e) => {
          e = e.split(",");
          let son = JSON.parse(
            JSON.stringify(this.data.filter((ele) => ele.id == e[0])[0] || "")
          );
          if (!son) {
            this.$message.error("id为" + e[0] + "的表不存在");
            console.error("id为" + e[0] + "的表不存在");
            return;
          }
          son.sonFieldId = Number(e[1]);
          son.fatherFieldId = Number(e[2]);

          let bool;
          son.fieldArr = (await this.getFieldByField(son.id, son.name)) || [];
          son.fieldArr.forEach((ele) => {
            ele.label = ele.name;
            ele.value = ele.id;
            if (ele.id == son.sonFieldId) bool = true;
          });
          if (!bool) {
            this.$message.error("id为" + son.sonFieldId + "的字段不存在");
            console.error("id为" + son.sonFieldId + "的字段不存在");
          }

          son.target = this.getTarget(son.id);
          this.sonFieldArr.push(son);
        });
      });
    },

    async submit() {
      this.show = {
        name: !this.name,
        son: !this.sonFieldArr.length,
        father: !this.father,
      };
      if (!this.name || !this.sonFieldArr.length || !this.father) {
        this.$message.warning("请填写完整信息");
        return;
      }

      let son = [];
      let bool = this.sonFieldArr.every((e) => {
        son.push(`${e.id},${e.sonFieldId},${e.fatherFieldId}`);
        return (
          (e.id || e.id == 0) &&
          (e.sonFieldId || e.sonFieldId == 0) &&
          (e.fatherFieldId || e.fatherFieldId == 0)
        );
      });
      if (!bool) {
        this.$message.warning("关联字段未选择完毕");
        return;
      }
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
.linkTableTransfer {
  .el-transfer {
    width: 250px !important;
    margin-right: 40px;
    display: inline-block;
    > div {
      display: none;
    }
    > div:nth-child(1) {
      display: inline-block;
    }
    .el-checkbox__label {
      color: #999999 !important;
    }
    .el-transfer-panel {
      width: 250px !important;
    }
    .el-transfer-panel__body {
      height: 320px !important;
    }
    .el-transfer-panel__list {
      height: 273px !important;
    }
  }
  .select-list-box {
    display: flex;
    .select-list {
      display: inline-block;
      margin-top: 10px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      height: 377px;
      width: calc(100% - 290px);
      color: #999999;
      header {
        background: #f5f7fa;
        border-bottom: 1px solid #ebeef5;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 15px;
        > span {
          display: inline-block;
          &:nth-child(1) {
            width: 30%;
          }
          &:nth-child(2) {
            width: 35%;
          }
          &:nth-child(3) {
            width: 30%;
          }
        }
      }
      .list {
        width: 100%;
        height: calc(100% - 40px);
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0 15px 10px;
        > div {
          margin-top: 10px;
          display: flex;
          align-items: center;
          > .el-select {
            width: 29%;
            margin-top: 0;
            input {
              padding-right: 0px;
            }
          }
          > span {
            width: 30%;
            display: inline-block;
          }
          .icon-guanlian {
            font-size: 18px;
            margin: 0 10px;
          }
          .el-icon-delete {
            font-size: 18px;
            margin-left: 15px;
            cursor: pointer;
            &:hover {
              color: #266ef5;
            }
          }
        }
      }
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
.select_box {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  > div {
    width: 32%;
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