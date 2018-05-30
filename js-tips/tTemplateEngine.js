/**
 * js模板引擎:
 * [原文链接](http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line)
 */
var TemplateEngine = function (html, options) {
  var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0
  var add = function (line, js) {
    js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n')
      : (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '')
    return add
  }
  while (match = re.exec(html)) {
    add(html.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
  }
  add(html.substr(cursor, html.length - cursor))
  code += 'return r.join("");'
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(options)
}

var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>'
console.log(TemplateEngine(template, {
  name: "Krasimir Tsonev",
  profile: { age: 29 }
}))

// <p>Hello, my name is Krasimir Tsonev. I'm 29 years old.</p>

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>额外补充
/** 关于正则表达式的exec和match的区别
 *
 */
var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>'
var reg = /<%([^%>]+)?%>/g

// 多次执行
reg.exec(template) // => ["<%this.name%>", "this.name"]
reg.exec(template) // => ["<%this.profile.age%>", "this.profile.age"]
reg.exec(template) // => null

template.match(reg) // => ["<%this.name%>", "<%this.profile.age%>"]
