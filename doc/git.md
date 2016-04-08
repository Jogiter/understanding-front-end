##相关阅读资料
- [Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
- [Git book中文版本](http://gitbook.liuhui998.com/1_2.html)
- [Git book官方中文版](http://git-scm.com/book/zh/v2)
- [window下配置SSH连接GitHub、GitHub配置ssh key](http://www.wuji8.com/meta/469066922.html)


##常见的一些命令

常见的git命令:TODO
```git
git ..
```

##[git常用命令](http://www.ruanyifeng.com/blog/2012/07/git.html)
```
#push an existing repository from the command line
git remote add origin git@github.com:Jogiter/gulp-test.git
git push -u origin master

#create a new repository on the command line
echo "# gulp-test" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:Jogiter/gulp-test.git
git push -u origin master


#Git创建Develop分支的命令：
git checkout -b develop master

将Develop分支发布到Master分支的命令：
    # 切换到Master分支
    git checkout master
    # 对Develop分支进行合并
    git merge --no-ff develop

#创建一个功能分支：
git checkout -b feature-x develop

#开发完成后，将功能分支合并到develop分支：
git checkout develop
git merge --no-ff feature-x

#删除feature本地分支：
git branch -d the_local_branch
删除远程分支(确保你真的要这么做？)
git push origin :the_remote_branch

#创建一个预发布分支：
git checkout -b release-1.2 develop

#确认没有问题后，合并到master分支：
git checkout master
git merge --no-ff release-1.2
# 对合并生成的新节点，做一个标签
git tag -a 1.2

#git比较两个分支所有变更的文件列表
#加上 --stat 是显示文件列表, 否则是文件内容diff
git diff branch1 branch2 --stat

#再合并到develop分支：
git checkout develop
git merge --no-ff release-1.2

#最后，删除预发布分支：
git branch -d release-1.2

#删除远程分支
git branch -r -d origin/branch-name

#查看一下提交的地址
$ git remote -v

#把本地仓库的内容推送到GitHub仓库
$ git remote add origin git@github.com:michaelliao/learngit.git

#更改一下提交方式
$ git remote set-url origin git@github.com:ueaner/soap.git

#设置本地分支对应的pull分支
git branch --set-upstream-to=origin/master master

#设置本地分支对应的push分支(current 表示当前分支)
git config --global default.push current

#把本地的git库上传到了远程git服务器的git库中
#由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令
git push -u origin master

#将本地最新修改提交到远程的master仓库
$ git push origin master

#克隆一个本地库到当前目录
$ git clone git@github.com:michaelliao/gitskills.git
```

`--no-ff`的意思[no fast-farward merge]，即"快进式合并"

##git fetch和Pull的区别
- **git fetch：相当于是从远程获取最新版本到本地，不会自动merge**
```
git fetch origin master
git log -p master..origin/master
git merge origin/master
```

以上命令的含义：
1. *首先从远程的origin的master主分支下载最新的版本到origin/master分支上*
2. *然后比较本地的master分支和origin/master分支的差别*
3. *最后进行合并*

上述过程其实可以用以下更清晰的方式来进行：
```
git fetch origin master:tmp
git diff tmp 
git merge tmp
```
从远程获取最新的版本到本地的test分支上
之后再进行比较合并

-  **git pull：相当于是从远程获取最新版本并merge到本地**
```
git pull origin master

git checkout -b local-branchname origin/remote_branchname  #就可以将远程分支映射到本地命名为local-branchname  的一分支。 
```
上述命令其实相当于git fetch 和 git merge

在实际使用中，git fetch更安全一些
因为在merge前，我们可以查看更新情况，然后再决定是否合并

###比较提交 - Git Diff
你可以用 `git diff` 来比较项目中任意两个版本的差异。
>$ git diff master..test

上面这条命令只显示两个分支间的差异，如果你想找出`master`,`test`的共有 父分支和`test`分支之间的差异，你用3个`.`来取代前面的两个`.` 。

>$ git diff master...test

git diff 是一个难以置信的有用的工具，可以找出你项目上任意两点间 的改动，或是用来查看别人提交进来的新分支。

哪些内容会被提交(commit)

你通常用`git diff`来找你当前工作目录和上次提交与本地索引间的差异。
>$ git diff

上面的命令会显示在当前的工作目录里的，没有 `staged(添加到索引中)`，且在下次提交时 不会被提交的修改。

如果你要看在下次提交时要提交的内容(`staged,添加到索引中`),你可以运行：

>$ git diff --cached

上面的命令会显示你当前的索引和上次提交间的差异；这些内容在不带`"-a"`参数运行 `git commit`命令时就会被提交。

>$ git diff HEAD

上面这条命令会显示你工作目录与上次提交时之间的所有差别，这条命令所显示的 内容都会在执行`git commit -a`命令时被提交。

更多的比较选项

如果你要查看当前的工作目录与另外一个分支的差别，你可以用下面的命令执行:

>$ git diff test

这会显示你当前工作目录与另外一个叫`test`分支的差别。你也以加上路径限定符，来只 比较某一个文件或目录。

>$ git diff HEAD -- ./lib 

上面这条命令会显示你当前工作目录下的`lib目录`与上次提交之间的差别(或者更准确的 说是在当前分支)。

如果不是查看每个文件的详细差别，而是统计一下有哪些文件被改动，有多少行被改 动，就可以使用`--stat` 参数。

>$>git diff --stat

有时这样全局性的查看哪些文件被修改，能让你更轻轻一点。

###[交互式添加](http://gitbook.liuhui998.com/4_4.html)
交互式添加提供友好的界面去操作Git索引（index），同时亦提供了可视化索引的能力。只需简单键入`git add -i`，即可使用此功能。Git会列出所有修改过的文件及它们的状态。
>$> git add -i

###储藏
当你正在做一项复杂的工作时, 发现了一个和当前工作不相关但是又很讨厌的bug. 你这时想先修复bug再做手头的工作, 那么就可以用 `git stash` 来保存当前的工作状态, 等你修复完bug后,执行`反储藏(unstash)`操作就可以回到之前的工作里.
>$ git stash "work in progress for foo feature"

上面这条命令会保存你的本地修改到储藏(stash)中, 然后将你的工作目录和索引里的内容全部重置, 回到你当前所在分支的上次提交时的状态.

好了, 你现在就可以开始你的修复工作了.
>... edit and test ...
>$ git commit -a -m "blorpl: typofix"

当你修复完bug后, 你可以用git stash apply来回复到以前的工作状态
>$ git stash apply

####储藏队列
你也可多次使用'git stash'命令,　每执行一次就会把针对当前修改的‘储藏’(stash)添加到储藏队列中. 用'git stash list'命令可以查看你保存的'储藏'(stashes):
>$>git stash list
>stash@{0}: WIP on book: 51bea1d... fixed images
>stash@{1}: WIP on master: 9705ae6... changed the browse code to the official repo

可以用类似`git stash apply stash@{1}`的命令来使用在队列中的任意一个`储藏(stashes)`. `git stash clear`则是用来清空这个队列.

###使用Git Grep进行搜索
`git grep`命令能让你不用签出(checkout)历史文件, 就能查找它们.
例如, 你要看 git.git　这个仓库里每个使用'xmmap'函数的地方, 你可以运行下面的命令:
>$> git grep xmmap

如果你要显示行号, 你可以添加'-n'选项:
>$> git grep -n xmmap

如果我们想只显示文件名, 我们可以使用'--name-onley'选项:
>$> git grep --name-only '.md'

我们可以用'-c'选项,可以查看每个文件里有多少行匹配内容(line matches):
>$>git grep -c xmmap

现在, 如果我们要查找git仓库里某个特定版本里的内容, 我们可以像下面一样在命令行末尾加上标签名(tag reference):
>$> git grep xmmap v1.5.0

我们也可以组合一些搜索条件, 下面的命令就是查找我们在仓库的哪个地方定义了'SORT_DIRENT'.
>$> git grep -e '#define' --and -e SORT_DIRENT

我不但可以进行“与"(both)条件搜索操作，也可以进行"或"(either)条件搜索操作.
>$> git grep --all-match -e '#define' -e SORT_DIRENT

我们也可以查找出符合一个条件(term)且符合两个条件(terms)之一的文件行.　例如我们要找出名字中含有‘PATH'或是'MAX'的常量定义:
>$> git grep -e '#define' --and \( -e PATH -e MAX \) 


###git如何查看某一个文件的详细提交记录

```
#查看文件的每一次提交的改动
git log -p filename
```

```
#查看目前的每一行是哪个提交最后改动的
git blame filename
```


###Git合并特定commits 到另一个分支
经常被问到如何从一个分支合并特定的commits到另一个分支。有时候你需要这样做，只合并你需要的那些commits，不需要的commits就不合并进去了。

合并某个分支上的单个commit
首先，用git log或GitX工具查看一下你想选择哪些commits进行合并，例如：
```
dd2e86 - 946992 -9143a9 - a6fd86 - 5a6057 [master]
           \
            76cada - 62ecb3 - b886a0 [feature]
```
比如，feature 分支上的commit 62ecb3 非常重要，它含有一个bug的修改，或其他人想访问的内容。无论什么原因，你现在只需要将62ecb3 合并到master，而不合并feature上的其他commits，所以我们用`git cherry-pick`命令来做：
```
git checkout master
git cherry-pick 62ecb3
```
这样就好啦。现在62ecb3 就被合并到master分支，并在master中添加了commit（作为一个新的commit）。cherry-pick 和merge比较类似，如果git不能合并代码改动（比如遇到合并冲突），git需要你自己来解决冲突并手动添加commit。

合并某个分支上的一系列commits
在一些特性情况下，合并单个commit并不够，你需要合并一系列相连的commits。这种情况下就不要选择`cherry-pick`了，rebase 更适合。还以上例为例，假设你需要合并feature分支的commit76cada ~62ecb3 到master分支。

首先需要基于feature创建一个新的分支，并指明新分支的最后一个commit：```
>git checkout -bnewbranch 62ecb3

然后，rebase这个新分支的commit到master（--ontomaster）。76cada^ 指明你想从哪个特定的commit开始。

>git rebase --ontomaster 76cada^
得到的结果就是feature分支的commit 76cada ~62ecb3 都被合并到了master分支。

### .gitignore文件
```
# Folders to ignore
bower_components
node_modules

# Numerous always-ignore extensions
*.diff
*.err
*.log
*.orig
*.rej
*.swo
*.swp
*.vi
*.zip
*~

# OS or Editor folders
._*
.cache
.DS_Store
.idea
.project
.settings
.tmproj
*.esproj
*.sublime-project
*.sublime-workspace
nbproject
Thumbs.db

# Ignore docs files
_gh_pages
_site
.ruby-version
```


### issues

1. Your branch is ahead of 'origin/master' by 2 commits.

>git reset --hard origin/master

will remove all commits not in origin/master where origin is the repo name and master is the name of the branch.

2. 

