/*
 * @Author: xcl
 * @Date: 2022-03-17 14:41:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-31 10:39:39
 * @Description: 图表配置
 */
export default {
  客流统计: {
    backgroundColor: "transparent",
    tooltip: {
      trigger: 'axis',
      axisPointer: { // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {
      data: ['男厕', '女厕'],
      bottom: '2%',
      textStyle: {
        color: 'rgba(255, 255, 255, 0.9)',
      }
    },
    grid: {
      top: "5%",
      left: '3%',
      right: '4%',
      bottom: '20%',
      containLabel: true
    },
    color: ['rgba(53, 144, 255, 0.85)', 'rgba(255, 151, 212, 0.85)'],
    xAxis: {
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Helvetica',
        fontSize: 12,
        margin: 12,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255, 255, 255, 0.2)"
        }
      },
    },
    yAxis: {
      type: 'category',
      data: [
        "累计客流(人/月)",
        "今日客流(人/日)",
      ],
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        // formatter: function (value, index) {
        //   return value.slice(0, 2) + '...';
        // },
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'PingFangSC-Regular, PingFang SC',
        fontSize: 12,
        margin: 12,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(255, 255, 255, 0.2)"
        }
      },
    },
    series: [{
        name: '男厕',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series',
          label: {
            show: true,
            color: "rgba(255, 255, 255, 0.9)",
            formatter: '{b}',
            position: 'insideBottomRight',
          },
        },
        data: [320, 302]
      },
      {
        name: '女厕',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          color: "rgba(255, 255, 255, 0.9)",
        },
        emphasis: {
          focus: 'series',
          label: {
            show: true,
            color: "rgba(255, 255, 255, 0.9)",
            formatter: '{b}',
            position: 'insideBottomRight',
          },
        },
        data: [115, 124]
      }
    ]
  },
}