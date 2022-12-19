/*
 * @Author: xcl
 * @Date: 2022-04-20 16:41:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-20 16:57:01
 * @Description: 日期时间工具类
 */
export default {
  /**
   * 将时间戳转换为某年某月某日 00：00：00
   * @params {string/number} timeSetback 时间戳
   * @params {string} format 时间格式
   */
  _convertDate(timeSetback, format) {
    return timeSetback ? new Date(timeSetback).Format(format) : "";
  },
  /**
   * 根据日期字符串获取星期几
   * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
   * @returns {String}
   */
  getWeek(dateString) {
    var date;
    date = new Date(dateString);
    return "星期" + "日一二三四五六".charAt(date.getDay());
  },
  /**
   * 将某年某月某日 某时某分某秒 转换为时间戳
   */
  _convertTimestamp(nowTime) {
    nowTime = _convertDate(nowTime, 'yyyy-MM-dd hh:mm:ss'); // 先转换为标准的格式
    var thisTime = nowTime;
    thisTime = thisTime.replace(/-/g, '/');
    var time = new Date(thisTime).getTime();
    return time ? time : null;
  },

  /**
   * 根据生日转换为年龄
   * @param {*} birthday 
   * @returns 
   */
  _getAge(birthday) {
    var birthdayTimestamp = _convertTimestamp(birthday);
    if (birthdayTimestamp != null && birthdayTimestamp != "") {
      var nowTimestamp = new Date().getTime();
      var yearTimestamp = 365 * 86400000; // 一年的毫秒数
      return Math.floor((nowTimestamp - birthdayTimestamp) / yearTimestamp);
    } else {
      return '';
    }
  },

  /**
   * 根据身份证号转换为生日
   * @param {*} IDCard 
   * @returns 
   */
  _getBirthday(IDCard) {
    var birthday = '';
    if (IDCard != null && IDCard != "") {
      if (IDCard.length === 15) {
        birthday = "19" + IDCard.substr(6, 6);
      } else if (IDCard.length === 18) {
        birthday = IDCard.substr(6, 8);
      }
    }
    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    return birthday;
  },

  /**
   * el-date-picker的options(配置项)
   */
  pickerOptions: {
    disabledDate(time) {
      return time.getTime() > Date.now();
    },
    shortcuts: [{
        text: "今天",
        onClick(picker) {
          picker.$emit("pick", new Date());
        },
      },
      {
        text: "昨天",
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit("pick", date);
        },
      },
      {
        text: "一周前",
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", date);
        },
      },
    ],
  },
  pickerOptions_range: {
    disabledDate(time) {
      return time.getTime() > Date.now();
    },
    shortcuts: [{
        text: "最近一周",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: "最近一个月",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: "最近三个月",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit("pick", [start, end]);
        },
      },
    ],
  },
};

/**
 * 补0
 * @param {*} num 
 * @returns 
 */
export const mathzero = (num) => {
  return num < 10 ? "0" + num : num;
};

/*
 * 格式化日期格式
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};