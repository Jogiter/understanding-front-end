var getReferrer = function () {
  var referrer = ''

  try {
    referrer = window.top.document.referrer
  } catch (e) {
    if (window.parent) {
      try {
        referrer = window.parent.document.referrer
      } catch (e2) {
        referrer = ''
      }
    }
  }
  if (referrer === '') {
    referrer = document.referrer
  }
  return referrer
}

window.onload = load

/** back in Firefox history, javascript won't run
 * Set an empty function to be called on window.onunload:
 */

window.onunload = unload
window.onpageshow / window.onpagehide
// detect window tab show or hidden(mini the window)
document.visibilityState
document.hidden

// 对跳转或关闭网页进行拦截（页面返回不请求，重新定位原位置）
window.onbeforeunload = function (e) {
  var e = e || window.event
  localStorage.html = document.documentElement
  e.returnValue = "您还没有交卷，已填答案会丢失。"
}

if (document.referrer == 'test.html') {
  document.documentElement.innerHTML = localStorage.html
}
