/*
 * @Author: xcl
 * @Date: 2022-10-31 09:33:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-31 09:33:46
 * @Description: vue基本配置
 */
module.exports = {
  lintOnSave: false,
  outputDir: "AutoCodeMs",
  assetsDir: "assets",
  publicPath: "./",
  productionSourceMap: false,
  indexPath: "index.html",
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 8956,
    open: true,
    overlay: {
      warnings: false,
      // errors: true,
      errors: false,
    },
    // proxy: { //配置跨域
    //   '/yyp': {
    //     target: 'http://175.155.179.248:1089/generation/api/v1', //这里后台的地址模拟的；应该填写你们真实的后台接口
    //     changOrigin: true, //允许跨域
    //     pathRewrite: {
    //       /* 
    //        * 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:5359/api/core/getData/userInfo 时
    //        * 实际上访问的地址是：http://175.155.179.248:1091/api/v1/core/getData/userInfo,因为重写了 /api
    //        */
    //       '^/yyp': ''
    //     }
    //   },
    // }
  }
};