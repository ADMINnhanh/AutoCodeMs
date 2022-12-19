document.oncontextmenu = function (e) {
  // 阻止浏览器的右键默认弹窗行为
  return false// 或者  e.defaultPrevented()
}