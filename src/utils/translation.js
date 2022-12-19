/*
 * @Author: xcl
 * @Date: 2022-03-17 14:24:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-15 16:12:16
 * @Description: 翻译工具类
 */
export default {
  /**
   * 字典翻译value转label（数字/代码转中文）
   * @param {*} array 
   * @param {*} value 
   * @returns 
   */
  valueConversionLabel(array, value) {
    let result = "";
    array.forEach(element => {
      if (element.value == value) {
        result = element.label;
        return;
      }
    });
    return result;
  },
  /**
   * 字典翻译多个value转多个label（数字/代码转中文）
   * @param {*} array 
   * @param {*} values
   * @returns 
   */
  valueConversionLabels(array, values) {
    let result = "";
    let arr = values ? values.split(',') : []
    array.forEach(element => {
      if (arr.indexOf(String(element.value)) != -1) {
        result += element.label + ' ';
      }
    });
    return result;
  },

  /**
   * 字典翻译label转value（中文转数字/代码）
   * @param {*} array 
   * @param {*} label 
   * @returns 
   */
  labelConversionValue(array, label) {
    let result = "";
    array.forEach(element => {
      if (element.label == label) {
        result = element.value;
        return;
      }
    });
    return result;
  },
}