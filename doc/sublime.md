## Sublime Text 使用介绍、全套快捷键及插件推荐


### Sublime Text快捷键：

+   Ctrl+Shift+P：打开命令面板
+   Ctrl+P：搜索项目中的文件
+   Ctrl+G：跳转到第几行
+   Ctrl+W：关闭当前打开文件
+   Ctrl+Shift+W：关闭所有打开文件
+   Ctrl+Shift+V：粘贴并格式化
+   Ctrl+D：选择单词，重复可增加选择下一个相同的单词
+   Ctrl+L：选择行，重复可依次增加选择下一行
+   Ctrl+Shift+L：选择多行
+   Ctrl+Shift+Enter：在当前行前插入新行
+   Ctrl+X：删除当前行
+   Ctrl+M：跳转到对应括号
+   Ctrl+U：软撤销，撤销光标位置
+   Ctrl+J：选择标签内容
+   Ctrl+F：查找内容
+   Ctrl+Shift+F：查找并替换
+   Ctrl+H：替换
+   Ctrl+R：前往 method
+   Ctrl+N：新建窗口
+   Ctrl+K+B：开关侧栏
+   Ctrl+Shift+M：选中当前括号内容，重复可选着括号本身
+   Ctrl+F2：设置/删除标记
+   Ctrl+/：注释当前行
+   Ctrl+Shift+/：当前位置插入注释
+   Ctrl+Alt+/：块注释，并Focus到首行，写注释说明用的
+   Ctrl+Shift+A：选择当前标签前后，修改标签用的
+   F11：全屏
+   Shift+F11：全屏免打扰模式，只编辑当前文件
+   Alt+F3：选择所有相同的词
+   Alt+.：闭合标签
+   Alt+Shift+数字：分屏显示
+   Alt+数字：切换打开第N个文件
+   Shift+右键拖动：光标多不，用来更改或插入列内容
+   鼠标的前进后退键可切换Tab文件
+   按Ctrl，依次点击或选取，可需要编辑的多个位置
+   按Ctrl+Shift+上下键，可替换行

### setting users

```
{
    "default_encoding": "UTF-8",
    "font_size": 12,
    "tab_size": 4,
    "translate_tabs_to_spaces": true,
    "trim_trailing_white_space_on_save": true
}
```


### 使用[Package Control](https://packagecontrol.io/)组件安装

1. 按Ctrl+`调出console（注：安装有QQ输入法的这个快捷键会有冲突的，输入法属性设置-输入法管理-取消热键切换至QQ拼音）
2. 粘贴以下代码到底部命令行并回车：

```
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

### 用Package Control安装插件的方法

1. 按下Ctrl+Shift+P调出命令面板
2. 输入install 调出 Install Package 选项并回车，然后在列表中选中要安装的插件。


**no-packages-available-for-installation**

>如果碰到`There are no packages available for installation`，请参考[no-packages-available-for-installation](http://stackoverflow.com/questions/25105139/sublime-text-2-there-are-no-packages-available-for-installation)

window: 打开`cmd`，输入`echo 50.116.34.243 sublime.wbond.net >> "C:\Windows\system32\drivers\etc\hosts"`

unix：打开`terminal`，输入`sudo echo "50.116.34.243 sublime.wbond.net" >> /etc/hosts`

### 推荐的插件

+   [emmet](http://docs.emmet.io/cheat-sheet/)
+   SideBarEnhancements
+   FileDiffs
+   markdown editing
+   htmlBeautify(/CodeFormatter)
+   sublime better completion
+   bracket highlighter // 类似于代码匹配，可以匹配括号，引号等符号内的范围
+   autoprefixer
+   sublimeCodeIntel
