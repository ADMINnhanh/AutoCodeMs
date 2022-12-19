/*
 * @Author: xcl
 * @Date: 2022-03-17 14:36:52
 * @LastEditors: 
 * @LastEditTime: 2022-03-17 14:49:28
 * @Description: 处理url的工具类
 */
/**
 * js获取url传递参数 1
 * @param {*} name 
 * @returns 
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r =
		window.location.href.split("?").length > 1 ?
		window.location.href.split("?")[1].match(reg) :
		null;
	if (r != null) return unescape(r[2]);
	return null;
}

/**
 * js获取url传递参数 2
 * @param {*} name 
 * @returns 
 */
function getQueryString2(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

export {
	getQueryString,
	getQueryString2
};