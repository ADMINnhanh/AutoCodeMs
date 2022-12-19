<!--
 * @Description: 项目展示卡片
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-02 17:07:54
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-13 15:48:12
 * @FilePath: \web\src\components\modules\dataType\DataTypeCard.vue
 * Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
--> 
<template>
  <div class="project">
    <div class="content">
      <div class="title" @click="$emit('view', e)">
        <div class="number">{{ i }}</div>
        <div class="text">
          <h4>{{ e.dictName }}</h4>
          <el-tooltip
            :disabled="curOverflow"
            :content="e.remark"
            placement="bottom"
          >
            <p ref="projectCard_p">{{ e.remark || "暂无简介" }}</p>
          </el-tooltip>
          <span>{{ e.type == 0 ? "数据库类型" : "业务类型" }}</span>
        </div>
      </div>
      <section>
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
    </footer>
  </div>
</template>

<script>
export default {
  props: ["e", "i"],
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
  height: 186px;
  position: relative;
  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 20px 40px;
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
        border-radius: 0 0 5px 0;
        top: 0;
        left: 0;
        background-color: #0079fe;
        width: 30px;
        height: 34px;
        color: white;
        font-size: 20px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
      }
      .text {
        width: 100%;
        height: 44px;
        position: relative;
        h4 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
          width: 80%;
        }
        p {
          font-size: 14px;
          color: rgb(139, 134, 134);
          width: 100%;
        }
        span {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 15px;
          color: #0079fe;
        }
      }
    }
    section {
      margin-top: 15px;
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
    height: 43px;
    align-items: center;
    color: #0079fe;
    span {
      text-align: center;
      cursor: pointer;
      flex-grow: 1;
      line-height: 43px;
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
}
</style>