/*
 * @Author: xcl
 * @Date: 2022-03-17 14:24:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-31 11:21:29
 * @Description: 通用方法
 */
import vue from "vue";
import {
  message
} from "element-ui";
import router from "../router";
import store from "../store";
const Vue = new vue({
  router,
  store,
}); //注册router, 实例中调用

export default {
  /**
   * 后台api配置
   */
  basePath: window.SERVER_CONFIG.baseUrl, // API 
  filePath: window.SERVER_CONFIG.fileUrl, // 文件
  resources: window.SERVER_CONFIG.resources, // 线上资源

  /**
   * websocket
   */
  websocket: {
    uri: window.SERVER_CONFIG.wsuri
  },

  /**
   * vue代理的配置
   */
  baseVPath: `${window.location.origin}/api`,

  /**
   * 数组去重
   * @param {需要去重数组} arr 
   * @returns 
   */
  _deduplication(arr) {
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
      if (hash.indexOf(arr[i]) == -1) {
        hash.push(arr[i]);
      }
    }
    return hash;
  },

  /**
   * 初始化图表Echart（通用函数）
   * idName、optionJson 必传
   * opt、theme 选传
   * @param idName string 容器dom的ID名称
   * @param optionJson object 图表的配置项
   * @descripttion     options配置项  https://echarts.apache.org/examples/zh/editor.html
   * @descripttion     主题编辑器     https://echarts.apache.org/zh/theme-builder.html
   * @descripttion     请使用setOption做数据更新
   * @return  ...
   */
  initEchart: function (idName, optionJson) {
    let self = Vue;
    // 基于准备好的dom，初始化echarts实例
    var chartDom = document.getElementById(idName);
    // console.log(chartDom)
    if (!chartDom) {
      return;
    }

    // 先销毁实例
    self.$echarts.dispose(chartDom);

    // echarts初始化
    var myChart = self.$echarts.init(
      chartDom, // 实例容器
      "dark" // 可选值：light\dark
    );

    // 先清空当前实例，会移除实例中所有的组件和图表。
    myChart.clear();

    // 开启 loading 动画
    myChart.showLoading("default", {
      text: "加载中...",
      color: "#7DFCF4",
      textColor: "#7DFCF4",
      maskColor: "rgba(0, 0, 0, 0.45)",
      zlevel: 1000,
      fontSize: 16,
      spinnerRadius: 12, // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
      lineWidth: 4, // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
      fontWeight: "normal", // 字体粗细。从 `v5.0.1` 开始支持。
      fontStyle: "normal", // 字体风格。从 `v5.0.1` 开始支持。
      fontFamily: "sans-serif", // 。从 `v5.0.1` 开始支持。
    });

    // 指定图表的配置项和数据
    var option;
    option = optionJson;

    // 使用刚指定的配置项和数据显示图表。
    if (option && typeof option === "object") {
      setOptionFunction(true);
    }

    // 使 dom 尺寸改变时，图中的元素能自适应得变化
    // 重新计算，并用 setOption 更新。
    window.addEventListener("resize", function () {
      // console.log('resize');
      myChart.clear(); // 先清空当前实例，会移除实例中所有的组件和图表。
      setTimeout(function () {
        // console.log(myChart.getDom().offsetWidth)
        // console.log(myChart.getDom().offsetHeight)
        myChart.resize();
        setOptionFunction(false);
      }, 300);
    });

    // 数据加载和更新+setOption
    function setOptionFunction(hideLoading) {
      hideLoading ? myChart.hideLoading() : ""; // 关闭 loading 动画
      myChart.setOption(option);
    }

    // 暂无数据
    let flag = false; // 为false时，则有数据；为true时，则option.series里面至少有一项的data没数据
    if (option && option.series.length > 0) {
      for (let index = 0; index < option.series.length; index++) {
        let element = option.series[index];
        if (typeof element.data == "object" && element.data.length == 0) {
          flag = true;
        }
      }
    } else {
      flag = true;
    }
    if (flag) {
      chartDom.innerHTML =
        '<div style="' +
        "display: flex;" +
        "align-items: center;" +
        "justify-content: center;" +
        "color: #73E7FF;" +
        // "background: linear-gradient(90deg, rgba(80, 168, 191, 0) 0%, #50A8BF 29%, #50A8BF 74%, rgba(80, 168, 191, 0) 100%);" +
        "width: 100%;" +
        "height: 100%;" +
        'font-size: 0.18rem;">' +
        "暂无数据" +
        "</div>";
      chartDom.removeAttribute("_echarts_instance_");
    }

    // myChart
    // 获取 dom 容器上的实例。
    // console.log(self.$echarts.getInstanceByDom(chartDom));
    // 获取 ECharts 实例容器的option对象
    // console.log(myChart.getOption());
  },

  /*
   * 根据附件地址下载附件
   */
  downloadFileByUrl(fileUrl) {
    window.open(fileUrl);
  },

  /*
   * blod 下载附件
   */
  _fileBold(response) {
    let fileName = decodeURI(
      response.headers["content-disposition"].substring(
        20,
        response.headers["content-disposition"].length
      )
    );
    let url = window.URL.createObjectURL(new Blob([response.data]));
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  },

  /*
   * blod 下载附件
   */
  _fileBold_octet(response) {
    // console.log(response)
    let fileName = "code-" + new Date().getTime() + ".zip";
    let url = window.URL.createObjectURL(
      new Blob([response.data], {
        type: "application/octet-stream;charset=UTF-8",
      })
    );
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  },

  /*
   * 查询文件流并下载
   * @params {string/number} fileId
   */
  downloadFile(fileId) {
    // ------ 文件流下载必须要指定responseType的类型为blob才能正确显示
    Vue.$request.requestAxios(
      "get",
      basePath + "/file/" + fileId + "/download", {
      responseType: "blob",
    },
      (respose) => {
        // 请求成功回调函数...
        this._fileBold(respose);
      },
      (error) => {
        // 请求失败回调函数...
        Vue.$message("/file/" + fileId + "/download - 失败", 20);
      }
    );
  },

  /**
   * 拖拽窗口
   * @param {*} dragW 
   * @param {*} dragA 
   * @returns 
   */
  dragWindow(dragW, dragA) {
    // window.onload = function () {
    var oWin = document.getElementsByClassName(dragW)[0]; // 拖拽的窗口/对象
    if (!oWin) {
      return;
    }
    var oH2 = oWin.getElementsByClassName(dragA)[0]; // 拖拽的区域

    var bDrag = false;
    var disX = disY = 0;

    oH2.onmousedown = function (event) {
      var event = event || window.event;
      bDrag = true;
      disX = event.clientX - oWin.offsetLeft;
      disY = event.clientY - oWin.offsetTop;
      this.setCapture && this.setCapture();
      return false
    };
    document.onmousemove = function (event) {
      if (!bDrag) return;
      var event = event || window.event;
      var iL = event.clientX - disX;
      var iT = event.clientY - disY;
      var maxL = document.documentElement.clientWidth - oWin.offsetWidth;
      var maxT = document.documentElement.clientHeight - oWin.offsetHeight;
      iL = iL < 0 ? 0 : iL;
      iL = iL > maxL ? maxL : iL;
      iT = iT < 0 ? 0 : iT;
      iT = iT > maxT ? maxT : iT;

      oWin.style.marginTop = oWin.style.marginLeft = 0;
      oWin.style.left = iL / 100 + "rem";
      oWin.style.top = iT / 100 + "rem";
      return false
    };
    document.onmouseup = window.onblur = oH2.onlosecapture = function () {
      bDrag = false;
      oH2.releaseCapture && oH2.releaseCapture();
    };
    // };
  },

  getObjType(obj) {
    var toString = Object.prototype.toString;
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    };
    if (obj instanceof Element) {
      return 'element';
    }
    return map[toString.call(obj)];
  },
  /**
   * 对象深拷贝
   */
  deepClone(data) {
    var type = this.getObjType(data);
    var obj;
    if (type === 'array') obj = [];
    else if (type === 'object') obj = {};
    else return data;
    if (type === 'array') {
      for (var i = 0, len = data.length; i < len; i++) {
        data[i] = (() => {
          if (data[i] === 0) {
            return data[i];
          }
          return data[i];
        })();
        if (data[i]) {
          delete data[i].$parent;
        }
        obj.push(this.deepClone(data[i]));
      }
    } else if (type === 'object') {
      for (var key in data) {
        if (data) {
          delete data.$parent;
        }
        obj[key] = this.deepClone(data[key]);
      }
    }
    return obj;
  },
};