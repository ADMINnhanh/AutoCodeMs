<!--
 * @Author: xcl
 * @Date: 2022-04-20 18:05:17
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-15 09:17:33
 * @Description: 首页
-->
<template>
  <div id="home">
    <header class="title">
      <div>
        <p>项目总数</p>
        <div>
          <span>{{ dataStatistics_obj ? dataStatistics_obj.xmzs : 0 }}</span
          ><span>个</span>
        </div>
        <img src="@/assets/images/home/home-1.png" alt="" />
      </div>
      <div>
        <p>表总数</p>
        <div>
          <span>{{ dataStatistics_obj ? dataStatistics_obj.bzs : 0 }}</span
          ><span>个</span>
        </div>
        <img src="@/assets/images/home/home-2.png" alt="" />
      </div>
      <div>
        <p>本周新增表数</p>
        <div>
          <span>{{ dataStatistics_obj ? dataStatistics_obj.bzxzbs : 0 }}</span
          ><span>个</span>
        </div>
        <img src="@/assets/images/home/home-3.png" alt="" />
      </div>
      <div>
        <p>生成总次数</p>
        <div>
          <span>{{ dataStatistics_obj ? dataStatistics_obj.sczcs : 0 }}</span
          ><span>次</span>
        </div>
        <img src="@/assets/images/home/home-4.png" alt="" />
      </div>
    </header>

    <article class="article">
      <section class="ranking">
        <div class="title">
          <span><i class="iconfont icon-code-stripe"></i>项目表TOP5</span>
        </div>
        <div
          v-loading="loading.ranking_chart"
          id="ranking_chart"
          class="charts"
        ></div>
      </section>
      <section class="statistics">
        <div class="title">
          <span><i class="iconfont icon-code-stripe"></i>代码生成次数</span>
          <el-select
            v-model="statistics_value"
            placeholder="请选择"
            @change="codeGenerationNumber(true)"
          >
            <el-option
              v-for="item in statistics_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div
          v-loading="loading.statistics_chart"
          id="statistics_chart"
          class="charts"
        ></div>
      </section>
      <section class="project_box">
        <div class="title">
          <span><i class="iconfont icon-code-stripe"></i>项目中心</span>
          <em @click="$router.push({ name: 'List' })">更多</em>
        </div>
        <div class="content_box">
          <div class="new_project" @click="created_project">
            <img src="../../assets/images/home/add.png" alt="" />
            <span>创建项目</span>
          </div>
          <ProjectCard
            v-for="(e, i) in project_data"
            :key="e.id"
            :e="e"
            :i="i + 1"
            :dicttype="dicttype"
            @delete="project_card_delete(e, getPageByProject)"
            @view="project_card_view(e)"
            @edit="project_card_edit(e, getPageByProject)"
          ></ProjectCard>
          <template
            v-if="project_data.length % ($store.state.VW >= 1620 ? 4 : 3) > 0"
          >
            <div
              v-for="(e, i) in ($store.state.VW >= 1620 ? 4 : 3) -
              ((project_data.length % ($store.state.VW >= 1620 ? 4 : 3)) + 1)"
              :key="i + 'Auxiliary'"
            ></div>
          </template>
        </div>
      </section>
    </article>
    <DeleteProject
      v-if="delete_project_view"
      @closure="delete_project_view = false"
      upData="getPageByProject"
      @submit="deleteProject"
    >
      <template v-slot:title>
        删除项目 - {{ delete_project_data.name }}</template
      >
    </DeleteProject>
  </div>
</template>

<script>
import ProjectCard from "../../components/modules/project/projectCard.vue";
import projectMixin from "@/mixins/projectMixin.js";

import removeAttribute from "@/assets/js/echarts/removeAttribute.js";
export default {
  name: "Home",
  mixins: [projectMixin],
  components: {
    ProjectCard,
  },
  data() {
    return {
      // 项目中心
      project_data: [],

      // 项目表TOP5
      ranking_chart_option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "5%",
          left: "1%",
          right: "1%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [0],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            minInterval: 1,
          },
        ],
        series: [
          {
            name: "表数",
            type: "bar",
            barWidth: "60%",
            color: "#3aa1ff",
            data: [0],
          },
        ],
      },

      // 代码生成次数
      statistics_chart_option: {
        title: {
          text: null,
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "5%",
          left: "1%",
          right: "1%",
          bottom: "0%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          // 两边是否留白
          // boundaryGap: false,
          data: [0],
        },
        yAxis: {
          type: "value",
          minInterval: 1,
        },
        series: [
          {
            name: "次数",
            type: "line",
            // stack: "Total",
            data: [0],
          },
        ],
      },

      // 代码生成次数
      statistics_value: 0,
      statistics_options: [
        {
          value: 0,
          label: "近7日",
        },
        {
          value: 1,
          label: "近15日",
        },
        {
          value: 2,
          label: "近30日",
        },
      ],

      // 数据统计
      dataStatistics_obj: undefined,

      dicttype: undefined,

      loading: {
        ranking_chart: true,
        statistics_chart: true,
      },

      noData: {
        ranking_chart: false,
        statistics_chart: false,
      },
    };
  },
  mounted() {
    this.dataStatistics();
    this.getPageByProject();
    window.upDataByProject = this.getPageByProject;

    let self = this;
    (async function () {
      await self.projectTable();
      await self.codeGenerationNumber();
      // 图例初始化
      self.init_chart();
    })();
  },
  watch: {
    "$store.state.navMode"() {
      this.auto_resize();
    },
  },
  methods: {
    async getPageByProject() {
      let data = await this.api.getPageByProject(this, {
        currentPage: 1,
        keyword: "",
        pageSize: 7,
        sortField: "createTime",
        sortOrder: 1,
        state: -1,
      });
      if (data) {
        // console.log(data);
        this.project_data = data.rows;
      }
    },

    async dataStatistics() {
      let data = await this.api.dataStatistics(this);
      if (data) {
        // console.log(data);
        this.dataStatistics_obj = data;
      }
    },
    async projectTable() {
      let data = await this.api.projectTable(this);
      if (data) {
        // console.log(data);
        if (Array.isArray(data) && data.length) {
          this.noData.ranking_chart = false;
          this.ranking_chart_option.xAxis[0].data = data.map((e) => e.name);
          this.ranking_chart_option.series[0].data = data.map((e) => e.number);
        } else {
          // this.ranking_chart_option.xAxis[0].data = ["无数据"];
          // this.ranking_chart_option.series[0].data = [0];
          this.noData.ranking_chart = true;
          let chartDom = document.getElementById("ranking_chart");
          removeAttribute(chartDom);
        }
        this.loading.ranking_chart = false;
      }
    },
    async codeGenerationNumber(bool) {
      let data = await this.api.codeGenerationNumber(this, {
        type: this.statistics_value,
      });
      if (data) {
        // console.log(data);
        this.loading.statistics_chart = false;

        if (Array.isArray(data) && data.length) {
          this.noData.statistics_chart = false;
          this.statistics_chart_option.xAxis.data = data.map((e) =>
            e.day.slice(5, 10)
          );
          this.statistics_chart_option.series[0].data = data.map(
            (e) => e.frequency
          );
        } else {
          // this.statistics_chart_option.xAxis.data = ["无数据"];
          // this.statistics_chart_option.series[0].data = [0];

          this.noData.statistics_chart = true;
          let chartDom = document.getElementById("statistics_chart");
          removeAttribute(chartDom);
        }

        if (bool) {
          window.statistics_chart.clear(); // 先清空当前实例，会移除实例中所有的组件和图表。
          setTimeout(() => {
            window.statistics_chart.resize();
            window.statistics_chart.setOption(this.statistics_chart_option);
          }, 300);
        }
      }
    },

    // 图例初始化
    init_chart() {
      var chartDom;
      // console.log(this.noData);
      if (!this.noData.ranking_chart) {
        chartDom = document.getElementById("ranking_chart");
        window.ranking_chart = this.$echarts.init(chartDom);
        window.ranking_chart.setOption(this.ranking_chart_option);
      }

      if (!this.noData.statistics_chart) {
        chartDom = document.getElementById("statistics_chart");
        window.statistics_chart = this.$echarts.init(chartDom);
        window.statistics_chart.setOption(this.statistics_chart_option);
      }

      window.addEventListener("resize", this.auto_resize);
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("resize", this.auto_resize);
      });
    },
    // 页面大小变化清除echarts图表并重新创建
    auto_resize() {
      if (!this.noData.ranking_chart) window.ranking_chart.clear(); // 先清空当前实例，会移除实例中所有的组件和图表。
      if (!this.noData.statistics_chart) window.statistics_chart.clear(); // 先清空当前实例，会移除实例中所有的组件和图表。
      setTimeout(() => {
        if (!this.noData.ranking_chart) {
          window.ranking_chart.resize();
          window.ranking_chart.setOption(this.ranking_chart_option);
        }
        if (!this.noData.statistics_chart) {
          window.statistics_chart.resize();
          window.statistics_chart.setOption(this.statistics_chart_option);
        }
      }, 300);
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#home {
  padding: 30px;
  box-sizing: border-box;
  > .title {
    display: flex;
    justify-content: space-between;
    > div {
      width: 23.5%;
      height: 140px;
      border-radius: 10px;
      color: white;
      box-sizing: border-box;
      padding: 20px;
      position: relative;

      img {
        width: 80px;
        height: 48px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      p {
        font-size: 15px;
      }
      div {
        font-size: 32px;
        text-align: center;
        margin-top: 15px;
        span {
          vertical-align: middle;
        }
        span:nth-child(2) {
          font-size: 28px;
        }
      }
      &:nth-child(1) {
        background-image: linear-gradient(#6bb1ff, #7ff4ff);
      }
      &:nth-child(2) {
        background-image: linear-gradient(#ff9e57, #f7f571);
      }
      &:nth-child(3) {
        background-image: linear-gradient(#55e3c3, #75b6ff);
      }
      &:nth-child(4) {
        background-image: linear-gradient(#ff82f5, #bc94ff);
      }
    }
  }
  .article {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    section {
      > .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        span {
          font-weight: 800;
          i {
            color: #00c3ff;
          }
        }
        em {
          color: #2f91af;
        }
      }
    }
    .ranking,
    .statistics {
      width: 49%;
      .charts {
        margin-top: 10px;
        width: 100%;
        height: 350px;
      }
    }
    .project_box {
      width: 100%;
      .title {
        em {
          cursor: pointer;
        }
      }
      .content_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        @media (min-width: 1620px) {
          > div {
            width: 23.5%;
          }
        }
        @media (max-width: 1619px) {
          > div {
            width: 32%;
          }
        }
        .new_project {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #cccccca8;
          height: 255px;
          cursor: pointer;
          span {
            font-weight: 900;
            font-size: 20px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
