ReactJs, Error

<!-- more --->

之前遇到的一个问题，对于新建的 react 项目进行 eject 的时候会进行报错，需要运行三条 git 指令之后才能顺利的 yarn eject。

# 错误信息

```markup
This git repository has untracked files or uncommitted changes:

... // 变动过的文件

Remove untracked files, stash or commit any changes, and try again.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! react_01@0.1.0 eject: `react-scripts eject`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the react_01@0.1.0 eject script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

简而言之就是在运行 eject 的时候，没有初始化 git

# 解决方法

解决也很简单，初始化一下 git 仓库就好了

```markup
$ git init
$ git add .
$ git commit -m 'init'
$ yarn eject
```

# 问题原因

原因是新建了项目的时候 create-react-app 为项目填加了.gitgnore 文件，但是本地 git 仓库是未创建的

至此就解决啦 ~~那就祝大家新年快乐~~
