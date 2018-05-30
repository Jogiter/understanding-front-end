var styles = document.documentElement.style
var vendors = ["", "ms", "webkit"]
for (var i = 0, len = vendors.length; i < len; i++) {
  var transition = vendors[i] + (vendors[i] ? 'T' : 't') + 'ransition'
  if (transition in styles) {
    console.log(transition)
    break
  }
}

var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1]
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  }
})()
