# 参考连接/书籍

[话说 Svn 与 Git 的区别](https://www.jianshu.com/p/bfec042349ca)  
[廖雪峰-Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)  
[对比 Git 与 SVN，这篇讲的很易懂](https://segmentfault.com/a/1190000016865867)  
[彻底搞懂 Git-Rebase](http://jartto.wang/2018/12/11/git-rebase/)

《Git 高手之路》

# Git & Svn

1. 最明显的差异是 **Git 是分布式的，SVN 是集中式的**  
   举一个最常见的例子。把代码 po 到 GitHub 上，是**先在本地编辑，再扔到 GitHub 上**。  
   如果共同维护一份代码，那么每个用户也都是这样的。每个用户都会在本地一份自己的代码。  
   而使用 SVN 的话，必须联网才能使用才能正常工作。  
   虽然 Git 也有自己的集中式服务器，但是更倾向于分布式的开发

2. 上手难度  
   个人觉得 Git 远难于 SVN。  
   Git 的指令多，常见的有 clone / add / commit / status / log / fetch / pull / push /  rebase / branc / checkout 等，很多指定还有很多的选项。
   SVN 的话我记得当时是必须先 update，再 commit(但是在 windows 上 SVN 真的是傻瓜式操作。  

3. 存储方式  
   Git 按元数据(?)方式存储，而 SVN 按照文件存储。  

4. branch  
   SVN 无本地 branch (?因为又看到网路上的文献说其实有，但是也没有深入的说，所以保留意见  
   Git 有本地 branch，且可以有多个。  
   SVN 的 branch 很昂贵，是拷贝的目录，而 Git 的 branch 指针指向某次提交，也就使得 Git 的分支切换非常迅速。

# Git 基础指令

就不管 SVN 了哈，一个是因为平时就是 Git 用的多，另一个是因为很多公司都用的 Git

之前建立了一个 next 项目的流程，可以看这里 -> [关于新建 nextJs 项目](https://naichazhenhaohe.github.io/2019/08/04/%E5%85%B3%E4%BA%8E%E6%96%B0%E5%BB%BAnextJs%E9%A1%B9%E7%9B%AE/)

上面的项目建立流程是 GitHub 上新建 repository -> git clone 到本地 -> npm init (没有使用 git init) -> git add -> git commit -> git push

## git config

其实在进行项目之前，需要先对 git 环境进行一些配置。

``` markup
$ git config [--global] user.name "Your Name"
$ git config [--global] user.email "YourEmailAddress@xxx.com"
```

-l 选项。可以列举查看所有的 git 配置。  
--unset 选项。可以删除已经配置好的内容。

## git init

npm(yarn) init 会生成一个带项目信息的 package.json 文件。

而 git init 会生成一个隐藏的 .git 目录， Git 把所有的修订信息都放在 .git 目录里。

## git add / git rm / git mv

git add \<file\> 命令把文件加入到仓库里。

\<file\> 可是一个 \".\" (小数点) ，表示把(有变动的)当前目录及子目录中的文件都添加到版本库里。

**add 还只能算是提交，并没有真正的加入到仓库，add 的文件 Git 会暂存，最终在 git commit 之后正式(和别的 add 提交上来的文件一起)提交到版本库里。**

git rm 和 git add 相反，命令用于删除文件，不过也和 add 类似，不会立刻从仓库里删除文件，需要等 commit 才会真的实现。

git mv 给仓库文件重命名。

## git commit

**请一定要带上 -m 选项**，如下

``` markup
git commit -m "add: add something"
```

-m 选项之后跟一串**描述性字符串**，用于描述本次提交的说明，最好输入有意义的内容，这样就能从历史记录里方便地找到改动记录。

因为往往是多人维护一份代码，加上描述性质的语言，对于别人和以后的自己都能有效的复现当时的情景。  
当然并不是强制的(之前实习的时候，就没有这个习惯...后来和同事沟通之后就一直有加了

需要注意的是，在上一次 git commit 之后，所有 git add 的文件都会在本次 git commit 中提交到版本库。

## git status

其实 git status 用的会很多。

用于查看 git 状态，会显示哪些文件有变动，并提示你 git add，或者 git checkout -- \<file\> 来撤销更新。还会显示哪些文件已经 add 了，等待 commit 。若没有文件有变动也会提示干净的工作区。

## git diff

git diff \<file\>

用于查看某个文件的变化。  
如果是提交到 GitHub 上的话，个人感觉 GitHub 上会更清晰一些。  
但是也是差不多的，就是会显示某个文件某个地方更改前/后的内容。

## git log

一般来说，用到 git log 说明出事了。hhh  
可以查看 git 提交记录，会显示 commit 的一串内部识别码，提交作者以及提交时间。

## git reflog

这个指令会显示 git 指令记录。

## git show

git show \<code\>

这个\<code\>就是 git log 里的 commit 的那串识别码。  
会显示某个 commit 的详细信息。包括提交作者、时间、识别码、以及 diff。

## git reset --hard commit_id

虽然有 --soft / --mixed 两个其他的选项。  
但是好像通常只用 --hard 。  
commit_id 就是 git log 里的那个 commit 的识别码。  
用于撤销 commit (或者说版本回退  

## git checkout

git checkout \<file\> 可以丢弃工作区的修改（未 git add），已经在缓存区(已 git add)的需要使用 git reset HEAD \<file\>  
git checkout \<branch_name\>切换到 branch_name 这个分支

# Git 提交

上面的都是基础的指令。但是 git 作为分布式管理系统，总会有一个远程的仓库需要维护。

## git remote

指令用于关联本地仓库以及 GitHub(或者其他)上的远程仓库。

``` markup
$ git remote add origin git@github.com:yourGithubName/yourRepositoryName.git
```

# git push

> 关联后，使用命令 git push -u origin master 第一次推送 master 分支的所有内容；此后，每次本地提交后，只要有必要，就可以使用命令 git push origin master 推送最新修改； -- 廖雪峰

但是我的习惯是

``` markup
$ git push --set-upstream origin master
// 以后的push就可以直接
$ git push origin master
// 当然重复的带上 --set-upstream 选项也不会报错。
```

## git clone

git clone \<url\>

克隆一个远程库

Git 支持 HTTPS，但是通过 ssh 支持原生 git 协议会更快。

# Git 分支

> 分支就是科幻电影里面的平行宇宙，当你正在电脑前努力学习 Git 的时候，另一个你正在另一个平行宇宙里努力学习 SVN。如果两个平行宇宙互不干扰，那对现在的你也没啥影响。不过，在某个时间点，两个平行宇宙合并了，结果，你既学会了 Git 又学会了 SVN！ -- 廖雪峰

草

其实上面有一些指令也涉及分支管理。应该只有 checkout

[创建与合并分支](https://www.liaoxuefeng.com/wiki/896043488029600/900003767775424)
文章里的图很好的解释了分支的作用和实现。

## git branch

git branch 会列出所有的分支，并在当前分支名字前添加一个\*号

git -d branch \<branch_name\> 删除名为 branch_name 分支  
git -D branch \<branch_name\> 删除名为 branch_name 分支

-d 和 -D 区别在于 -D 是用于删除未经合并的分支的。

git branch \<branch_name\> 新建名为 branch_name 的分支

## git checkout

其实 git checkout 也可以用于创建分支

``` markup
// 新建分支并前往
$ git checkout -b \<branch_name\>
```

## git switch

可能是就是用来解决 checkout 又能撤销更改又能切换分支的问题才新出的一个指令(瞎说的

但是确实是比较新的指令。  
功能也确实就是用于切换分支。

git switch -c \<branch_name\> 新建并切换至新的分支  
git switch \<branch_name\> 切换到名为 branch_name 的分支

## git stash

用于把当前工作现场\"储藏\"起来，等以后恢复现场后继续工作。  
在 git stash 之后 git status 会发现工作区是干净的。

git stash list 查看被存储的 stash 列表  
git stash apply \<stash_name\> 用于恢复某个指定的 stash，恢复之后于 stash list 里依旧存在   
git stash drop \<branch_name\> 用户删除某个 stash  
git stash pop \<branch_name\> 用于恢复并删除某个 stash

## git cherry-pick

用于解决一个特殊情况。  
本来在开发由 master 衍生的分支 dev 时，master 里有一个 bug 需要紧急处理。  
所以把 dev 用 git stash 存储了。  
修好了 master 之后提交了新的代码，恢复了 dev 之后，dev 里 bug 依旧存在。  
但是又不能直接 merge master 给 dev。  
git cherry-pick \<commit_id\> 就能把提交的内容添加到 dev 里。准确的说  

> Git 自动给 dev 分支做了一次提交，注意这次提交的 commit 是 1d4b803，它并不同于 master 的 4c805e2，因为这两个 commit 只是改动相同，但确实是两个不同的 commit。用 git cherry-pick，我们就不需要在 dev 分支上手动再把修 bug 的过程重复一遍。

## git pull

用于跟新本地代码。  
出现 git push 失败，说明远程分支比本地分支更新，所以现需要 git pull 一下。  
git pull 有冲突先于本地修正，再提交。  

如果提示 no tracking information 则本地分支与远程分支没有建立连接。可以使用 git push 里提到的 --set-upstream 选项。

## git merge & git rebase

git merge 用于合并指定的分支到当前所在的分支。  
每次 merge 都会自动创建一个新的 commit，如果合并的时候遇到冲突，则只须要解决冲突后重新提交即可。但是每次 merge 都会有一个 commit，分支会很混乱。  

![merge](/merge.png)

</div>
git rebase 变基，会合并之前的commit，有更简洁的commit history，是一条直线，但是重写了history(关于重写history，可以看上下两个图里绿点的起始位置)，不容易定位。
<div class='centerPic'>

![merge](/rebase.png)

如果 rebase 合并出现了冲突

1. 解决冲突
2. git add
3. git rebase --continue

但是对于 rebase 争议很大，在确保没有别的人在使用需要进行 git rebase 的分之前，不要使用 git rebase。  
也就是 **never use it on public branches**
