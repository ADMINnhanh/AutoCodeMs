/**
 * @Description: 登录页面-下雪特效  混入函数
 * @Version: 1.0
 * @Author: xcl
 * @Date: 2022-11-18 08:44:04
 * @LastEditors: xcl
 * @LastEditTime: 2022-12-12 11:38:42
 * @FilePath: \web\src\mixins\snow.js
 * @Copyright (c) 2022 by xcl xiaochuanlin941109@163.com, All Rights Reserved. 
 */
import Vue from "vue";

export default {
  data: function () {
    return {
      snowTimer: null,
    };
  },
  watch: {},
  created() { },
  mounted() {
    this.snow();
  },
  beforeDestroy() {
    this.snowTimer && clearInterval(this.snowTimer)
  },
  destroyed() {
    // this.snowTimer && clearInterval(this.snowTimer)
  },
  methods: {
    snow() {
      var ac_unit = [
        "HTML+CSS+JS",
        "Table",
        "Field",
        "Dictionary",
        "Java",
        "MySQL",
        "Oracle",
        "Auto Generate Code",
        "Project",
      ];

      const createSnowFlake = () => {
        const snowflake = document.createElement("span");
        snowflake.classList.add("material-symbols-outlined");
        snowflake.textContent =
          ac_unit[Math.floor(Math.random() * (ac_unit.length + 1 || 1))];
        snowflake.classList.add(`snowflake`);
        // console.log(document.getElementById('login'))
        // document.body.appendChild(snowflake);
        document.getElementById('login').appendChild(snowflake);

        const winWidth = window.innerWidth;

        let randomLeft = getRandomNumber(0, winWidth);
        let randomOpacity = getRandomNumber(0, 1);
        let randomSize = getRandomNumber(0.6, 2);

        snowflake.style.left = randomLeft + "px";
        snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
        snowflake.style.opacity = randomOpacity;
        snowflake.style.fontSize = randomSize + "rem";

        setTimeout(() => {
          // remove snowflake after 5s
          snowflake.remove();
        }, 5000);
      };

      const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      this.snowTimer = setInterval(createSnowFlake, 50); // Create snowflake every 50ms (lower interval more snowflakes)
    },
  },
};