VsCode, TypeScript

<!-- more --->

VSCode 对 TypeScript 的支持做的很好。  
在 VSCode 中实现对 TypeScript 进行自动编译和调试执行还是需要一些操作的。  
纯粹是因为学 ts 的时候需要敲一些代码来看看才有了配置自动编译的需求哈，真实项目开发的时候好像也没有需要自动编译的需求。

<!-- more -->

# 参考链接

[Visual Studio Code 中配置 TypeScript 自动编译](https://juejin.im/post/5cbed3945188250aac08992d#heading-10)  
[编译选项](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9) ← tsconfig.json 配置项  
[Debugging TypeScript](https://code.visualstudio.com/docs/typescript/typescript-debugging)

# 自动编译

配置 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "out",
    "sourceMap": true
  }
}
```

更多的配置项看这里(tsconfig.json 配置项) → [编译选项](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9)

然后打开 VSCode 的 terminal ，输入如下代码：

```markup
$ tsc -w
```

如果没有在 tsconfig.json 里配置出口文件，则会把编译好的内容统一存放在 out 文件夹里。

切每次保存(或新生成)ts 文件会有自动编译一次。

这样每次更新 ts 文件都会有新的 js 文件出来，但是需要运行的话依旧需要以下代码来运行。

```markup
$ node fileName.js
```

# 自动编译+调试运行

配置 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "out",
    "sourceMap": true
  }
}
```

更多的配置项看这里 → [编译选项](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9) ← tsconfig.json 配置项

然后选择 VSCode 的菜单栏里的 Terminal 选择 Run Task

再选择 tsc: build - tsconfig.json

![Run Task](/关于VsCode配置TypeScript-RunTask.png)

然后按 F5 或者选菜单栏里的 Debug 的 Start Debugging，就能在 DEBUG CONSOLE (在 TERMINAL 左边)里看到输出内容。

![Run Task](/关于VsCode配置TypeScript-DebugConsole.png)

每次新建/更新 ts 文件后按 F5 ，都可以看到最新的输出内容。

## Error-1

错误信息：  
Could not find the task 'tsc: build - tsconfig.json'

参考解决方案：  
[SOF](https://stackoverflow.com/questions/55846442/could-not-find-the-task-tsc-build-tsconfig-json)

SOF 这个问答... 其实对于我遇到的问题(虽然是同一个)没有起到什么帮助。

实际解决方案：

之前用的 VSCode 是中文的（忘记什么时候配的了

然后又因为没有头绪怎么修复这个问题，而且有些地方看起来不舒服就把那个中文插件卸载换回了英文版本。

然后 bug 就解决了。。。

前端就是玄学编程哈

## Error-2

cannot launch program \'filename.ts\' because corresponding javascript cannot be found

发生原因：

在看 <inlineCode>tsconfig.json</inlineCode> 的配置项的时候把 sourceMap 设置成了 false。

参考解决方案：

这个在 VSCode 的官方 ts 调试文档里找到了解决方案  
[Debugging TypeScript](https://code.visualstudio.com/docs/typescript/typescript-debugging)

实际解决方法：

> TypeScript debugging supports JavaScript source maps. To generate source maps for your TypeScript files, compile with the --sourcemap option or set the sourceMap property in the tsconfig.json file to true.

所以把 <inlineCode>tsconfig.json</inlineCode> 里的 sourceMap 设置为 true 就解决了。
