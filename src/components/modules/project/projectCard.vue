<!--
 * @Description: 项目展示卡片
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-02 17:07:54
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-13 14:54:55
 * @FilePath: \web\src\components\modules\project\projectCard.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
--> 
<template>
  <div class="project">
    <div class="content">
      <div class="title" @click="$emit('view', e)">
        <div class="number">{{ i }}</div>
        <div class="text">
          <h4>{{ e.name }}</h4>
          <el-tooltip
            :disabled="curOverflow"
            :content="e.description"
            placement="bottom"
          >
            <p ref="projectCard_p">{{ e.description || "暂无简介" }}</p>
          </el-tooltip>
        </div>
      </div>
      <section>
        <p>负责人 &nbsp; {{ e.commander }}</p>
        <p>
          数据库类型 &nbsp;
          {{
            dicttype?.filter((ele) => ele.id == e.datasourceType)[0]?.dictType
          }}
        </p>
        <p>表前缀 &nbsp; {{ e.prefix }}</p>
        <p>项目根路径 &nbsp; {{ e.path }}</p>
        <p>创建人 &nbsp; {{ e.createBy }}</p>
        <p>创建时间 &nbsp; {{ e.createTime }}</p>
        <p>更新人 &nbsp; {{ e.updateBy }}</p>
        <p>更新时间 &nbsp; {{ e.updateTime }}</p>
      </section>
    </div>
    <footer>
      <span @click="$emit('view', e)"><i class="el-icon-view"></i>查看</span>
      <div></div>
      <span @click="$emit('edit', e)"><i class="el-icon-edit"></i>编辑</span>
      <div></div>
      <span @click="$emit('delete', e)"
        ><i class="el-icon-delete"></i>删除</span
      >
      <!-- <div></div>
      <span @click="$emit('download', e)"
        ><i class="el-icon-download"></i>导出</span
      > -->
    </footer>
    <div class="state">
      <template v-if="e.state">
        <div class="lamp1"></div>
        已完成
      </template>

      <template v-else
        ><div class="lamp2"></div>
        进行中
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ["e", "i", "dicttype"],
  data() {
    return {
      curOverflow: true,
    };
  },
  mounted() {
    let curOverflow = this.$refs.projectCard_p;
    this.curOverflow = curOverflow.clientWidth == curOverflow.scrollWidth;
  },
};
</script>

<style lang="less" scoped>
.project {
  margin-bottom: 20px;
  border: 1px solid #cccccca8;
  height: 255px;
  position: relative;
  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    p,
    h4 {
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      white-space: nowrap; //文本不会换行
    }
    .title {
      display: flex;
      align-items: center;
      cursor: pointer;
      .number {
        border-radius: 50%;
        background-color: #0079fe;
        margin-right: 25px;
        width: 54px;
        height: 54px;
        color: white;
        font-size: 31px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
      }
      .text {
        width: calc(100% - 89px);
        h4 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
          color: rgb(139, 134, 134);
        }
      }
    }
    section {
      margin-top: 10px;
      p {
        line-height: 25px;
        font-size: 15px;

        display: inline-block;
        &:nth-child(odd) {
          width: 38%;
        }
        &:nth-child(even) {
          box-sizing: border-box;
          padding-left: 10px;
          width: 62%;
        }
      }
    }
  }

  footer {
    border-top: 1px solid #cccccca8;
    display: flex;
    height: 53px;
    align-items: center;
    color: #0079fe;
    span {
      text-align: center;
      cursor: pointer;
      flex-grow: 1;
      line-height: 53px;
      i {
        margin: 0 5px 0 0;
      }
    }
    div {
      width: 1px;
      height: 40%;
      background-color: #cccccca8;
    }
  }

  .state {
    position: absolute;
    top: 5px;
    right: 7px;
    color: rgb(158, 158, 158);
    display: flex;
    align-items: center;
    font-size: 14px;
    div {
      border-radius: 50%;
      width: 9px;
      height: 9px;
      margin-right: 5px;
    }
    .lamp1 {
      background-color: rgb(0, 255, 0);
    }
    .lamp2 {
      background-color: rgb(255, 157, 0);
    }
  }
}
</style>