# 相关文档

[MDN：正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

# 定义方式

要获取一个正则对象，有如下两种方式

## <font size=4>包含在斜杠之间</font>

```js
const regex = /ab+c/
const regex = /a*c/gi
```

当正则表达不会变动时 建议采用此方法

## <font size=4>调用 RegExp 对象的构造函数</font>

```js
//可以直接使用字符串
let regex = new RegExp('ab+c')
//也可以使用 / 进行包裹内容
let regex = new RegExp(/a*c/, 'gi')
```

当正则表达会变动时，如由用户输入、模式会改变等 建议采用此方法

# 正则修饰符(标志)

JavaScript 的正则表达式有修饰符的使用，相比 python 的正则来说用法差异还是有点大的。
JavaScript 的正则修饰符( mdn 中称为标志) 有：

1. g / i / m 这三个较为常用
2. y / u 是在 ES6 中新增修饰符
3. 还有一些其他的，比如 s / U / x / A 等

## g / i / m

最常见的三种修饰符

1. g: global 全局搜索，就是说不会匹配到一个匹配项之后就停止，而是一直匹配到输入的结束。
2. i: ignore 大小写不敏感。
3. m: more 允许多行搜索。

## y

[ES6 新增修饰符](https://blog.csdn.net/ww430430/article/details/78403536)

执行'粘性'搜索，匹配从目标字符串的当前位置开始，可以使用 y 标志。( ← MDN 中的描述，但是看不太懂

y 修饰符的作用与 g 修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g 修饰符只要剩余位置中存在匹配就可，而 y 修饰符确保匹配必须从剩余的第一个位置开始，这也就是'粘连'的含义。 （ ← 博客中的说法，get!

其实两种说法都有一定理解难度，所以遇事不决举个栗子。

```js
//匹配用字符串
const a = '123123'
const b = '123_123'
//正则表达式
let r1 = /123/y
let r2 = /123/y
let r3 = /123/g
console.log(r1.exec(a)) //[ '123', index: 0, input: '123123', groups: undefined ]
console.log(r1.exec(a)) //[ '123', index: 3, input: '123123', groups: undefined ]
console.log(r2.exec(b)) //[ '123', index: 0, input: '123_123', groups: undefined ]
console.log(r2.exec(b)) //null
console.log(r3.exec(b)) //[ '123', index: 0, input: '123_123', groups: undefined ]
console.log(r3.exec(b)) //[ '123', index: 4, input: '123_123', groups: undefined ]
```

上面的例子中的 null 原因就是第一次匹配之后剩下的字符为 '\_123' 而粘性搜索要求匹配必须在剩余字符串首，所以只有当且仅当剩下的字符为 '123α'( α 为任意数量的任意字符)才会匹配到

## u

<strong> ES6 新增修饰符</strong> [参考博客](https://blog.csdn.net/ww430430/article/details/78403536)

u (小写，和大写的 U 是不同的)这个修饰符在 MDN 中文文档里没有提到。但是之前在阮一峰的 《ES6 标准入门》里看到过。
u 指的是 'unicode' , 用于处理大于 \uFFFF 的 Unicode 字符(就是四个字符的 UTF-16 编码
(说起来从来没有用到过 utf-16 的字符

那么遇事不决举个参考博客中的栗子：

```js
const R1 = new RegExp(/^\uD83D/)
const R2 = new RegExp(/^\uD83D/, 'u')

R1.test('\uD83D\uDc2A') //true
R2.test('\uD83D\uDc2A') //false
```

可以看到 R2 的检测结果是 false 因为 \uD8F2\uDc2A 是一个四字节的 UTF-16 编码，在加了 u 修饰符之后会把 \uD8F2\uDc2A 识别为一整个字符。

# 正则的特殊符号

|     字符     | 含义                                                                                                                                                                                                              |
| :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      \\      | 1. 用于转义<br/> 2.后接字母表示特殊含义如 \\b, \\d 等                                                                                                                                                             |
|      ^       | 匹配输入的开始。如果多行标志被设置为 true，那么也匹配换行符后紧跟的位置。<br/>举个例子： \\^demo\\ 与以'demo'开头的文本匹配，如'demonstrate' 可以匹配 但是'this is a demo' 不行                                   |
|      \$      | 和 ^ 作用类似。区别在于 $ 用于匹配输入的结束。如果多行标示被设置为true，那么也匹配换行符前的位置。在 ^ 的例子中，若是 \\demo$\\ 则 'demonstrate' 不行 但是'this is a demo' 可以                                   |
|      \*      | 匹配前一表达式 0 次或多次<br/>举个例子：/bo\*/会匹配 'A ghost boooooed' 中的 'booooo' 和 'A bird warbled' 中的 'b'                                                                                                |
|      +       | 匹配前一表达式 1 次或多次                                                                                                                                                                                         |
|      ?       | 1. 匹配前一表达式 0 次或 1 次<br/>2. 如果紧跟在任何量词 \*、 +、? 或 {} 的后面，将会使量词变为非贪婪的<br/>举个例子：对 '123abc' 应用 /\d+/ 将会返回 '123'，如果使用 /\d+?/,那么就只会匹配到 '1'。<br/>3.先行断言 |
|      .       | 匹配换行符之外的任意字符                                                                                                                                                                                          |
|     ( )      | [参考博客](https://www.cnblogs.com/snandy/p/3650309.html)<br/>1.用于限定量词范围，例如/(demo)?/匹配 0 或多个'demo'<br/>2. 捕获功能                                                                                |
|      \x      | 'x' 是数字。返回最后的第 n 个子捕获匹配的子字符串(捕获的数目以左括号计数)                                                                                                                                         |
|    (?:x)     | 匹配 'x' 但是不记住匹配项。上面一行的博客中也有有提到，只分组不捕获                                                                                                                                               |
| (?<name>...) | 比普通的分组多了<name>，可以给分组的内容起名字                                                                                                                                                                    |
|    x(?=y)    | 匹配'x'仅仅当'x'后面跟着'y'.称为先行断言。告诉正则表达式继续向后看一些字符但是并不移动位置(就是说不匹配 y)                                                                                                        |
|   (?<=y)x    | 匹配'x'仅仅当'x'前面是'y'.称为后行断言。                                                                                                                                                                          |
|    x(?!y)    | 匹配'x'仅仅当'x'后面不跟着'y',称为正向否定查找。                                                                                                                                                                  |
|     x\|y     | 匹配'x'或'y'                                                                                                                                                                                                      |
|     {n}      | n 是一个正整数，匹配了前面一个字符刚好发生了 n 次。<br/>举个例子：/a{2}/不会匹配'candy'中的'a',但是会匹配'caandy'中所有的'a'，以及'caaandy'中的前两个'a'                                                          |
|    {n,m}     | n 和 m 都是整数。匹配前面的字符至少 n 次，最多 m 次。如果 n 或者 m 的值是 0， 这个值被忽略。                                                                                                                      |
|   \[xyz\]    | 一个字符集合。匹配方括号中的任意字符。可以使用 - 进行指定字符范围。                                                                                                                                               |
|   \[^xyz]    | 一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符。                                                                                                                                                   |
|    \[\b]     | 匹配退格                                                                                                                                                                                                          |
|      \b      | 匹配单词边界。一个词的边界就是一个词不被另外一个'字'字符跟随的位置或者没有其他'字'字符在其前面的位置。(狗屎这个看不懂啊！)。换个网搜的说法：如果字符的左右两边有空白字符则为单词边界                              |
|      \B      | 匹配非单词边界。字符左右两边没有空白字符就是非单词边界                                                                                                                                                            |
|      \d      | 匹配一个数字,等于\[0-9]                                                                                                                                                                                           |
|      \D      | 匹配一个非数字,等于\[^0-9]                                                                                                                                                                                        |
|      \f      | 匹配换页符                                                                                                                                                                                                        |
|      \n      | 匹配换行符                                                                                                                                                                                                        |
|      \r      | 匹配回车符                                                                                                                                                                                                        |
|      \t      | 匹配一个水平制表符                                                                                                                                                                                                |
|      \v      | 匹配一个垂直制表符                                                                                                                                                                                                |
|      \s      | 匹配一个空白字符，包括空格、制表符、换页符和换行符。                                                                                                                                                              |
|      \S      | 匹配一个非空白字符                                                                                                                                                                                                |
|      \w      | 匹配一个字母、数字或者下划线,等价于\[A-Za-z0-9\_]                                                                                                                                                                 |
|      \W      | 匹配一个非字母、数字或者下划线,等价于\[^A-Za-z0-9\_]                                                                                                                                                              |

QAQ 好多啊

# 正则表达式的使用 (应用)

匹配出来总要用的嘛！
使用正则表达式的方法这里分为两类，一类是 RegExp 的方法，另一类是 String 的方法。

## <font size=4>RegExp 的方法</font>

有两个，在上面的 보기 中有使用到。
一个是 exec( ) 另一个是 test( )

### <font size=3> RegExp.exec( ) </font>

参数： 字符串
返回值： 数组 or null

当且仅当没有匹配结果时返回 null 。
有匹配结果时，数组的第一元素为匹配到的文本，紧跟的元素是用 ( ) 捕获的内容，之后的元素是 index 属性，为匹配到的文本在源字符串中的下标，再之后的元素为 input 属性，保存源字符串，最后会有一个 groups 属性，好像是 ES6 新增的，用于存储对捕获分组的内容。

举个例子：

```js code
const rDate = /(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})/
R.exec('2019-06-17')
/* output:
[ '2019-06-17',
  '2019',
  '06',
  '17',
  index: 0,
  input: '2019-06-17',
  groups: [Object: null prototype] { year: '2019', month: '06', date: '17' } ]
*/
```

### <font size=3> RegExp.test( ) </font>

判断一个模式是否存在于某个字符串中。

参数： 字符串
返回值： true or false

하지만!

当 RegExp 设置了全局标志，test( ) 的执行也(为什么是'也'呢?因为其实 exec( ) 也会，但是为什么上面没有提到呢? 因为懒，不想回去填坑了呜呜呜)会改变 RegExp 的 [lastIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) 值。后续的执行会从 lastIndex 处开始匹配。(RegExp.exec( )同理)

来来来，遇事不决举个栗子：

```js code
const R = /\d/g
R.test('3 three 2 two one')
// true 这里匹配到的是 3 剩余的字符串为 ' three 2 two one'
R.test('3 three 2 two one')
// true 这里匹配到的是 2 剩余的字符串为 ' two one'
R.test('3 three 2 two one')
// false 这里 false 的原因因为 ' two one' 中没有数字啦
```

## <font size=4>String 的方法</font>

啊 这个就比较多了（感觉更常用

1. str.match( )
2. str.search( )
3. str.replace( )
4. str.split( )

### <font size=3> str.match( ) </font>

参数：RegExp | 非 RegExp 对象的对象 | 空
返回值：数组 | null

使用了 g 修饰符，则没有匹配内容时，返回 null ，有匹配内容时，返回匹配内容的数组
如果未使用 g 修饰符，则返回第一个匹配项的信息及补捕获组，和 RegExp.exec( ) 的返回值一样（就是说不含 g 标志时，str.match( ) 和 RegExp.exec( ) 一致

举个例子：

```js code
let a = 'no number'
let b = '1 number: 23'
a.match(/\d/g) //output: null
b.match(/\d/g) //output: [ '1', '2', '3' ]
//未使用 g 修饰符
'2019-06-17'.match(/(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})/)
/* output:
[ '2019-06-17',
  '2019',
  '06',
  '17',
  index: 0,
  input: '2019-06-17',
  groups: [Object: null prototype] { year: '2019', month: '06', date: '17' } ]
*/
```

拓展一下上面例子的应用。

```js code
const GROUPS = '2019-06-17'.match(/(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})/).groups
//GROUPS 为 {year: '2019', month: '06', date: '17'}
let { year, month, date } = GROUPS
```

<strong>当传的参数为空时，返回值为包含一个空字符串的数组 \[""]</strong>

当参数为非正则表达式对象 str.match(obj) 。会先调用 new RegExp(obj) 隐式的转化成一个 RegExp

再举个例子：

```js
"i don't know".match('do')
// output: [ 'do', index: 2, input: 'i don't know', groups: undefined ]
"i don't know".match('dot')
// output: null
```

### <font size=3> str.search( ) </font>

参数： RegExp 对象 | 非 RegExp 对象的对象 |
返回值： 匹配成功则返回第一个匹配项的下标 | 匹配失败则返回 -1

和 str.indexOf( ) 很像ㄟ 。

区别在于 indexOf( ) 的参数为 searchValue '搜索的目标子字符串' 和 fromIndex '从 fromIndex 这个位置开始搜索'
相似点的 indexOf( ) & search( ) 都是大小写敏感的。

当输入的参数为非 RegExp 对象的对象时，进行的处理与 str.match( ) 一致。
功能与 RegExp.test( ) 类似。

하지만!

需要注意的是 str.search( ) <strong>无视 g 修饰符和 RegExp 对象的 lastIndex 属性, 返回值总是第一个匹配到的匹配项的下标或者 -1 。</strong>、

### <font size=3> str.replace( ) </font>

参数： RegExp | SubStr, newSubStr | function

1. RegExp 对象，该正则匹配到的内容会被第二个参数(或其返回值)替换。
2. SubStr，将被替换掉的字符串，仅<strong>第一个</strong>匹配项会被替换。
3. newSubStr，用于替换第一个参数匹配到的结果。
4. function，用于创建新子字符串的函数，函数的返回值将替换掉第一个参数匹配到的结果。

返回值：替换完成的新字符串。

newSubStr 中可以使用特殊变量

1. \$$ 插入一个'$', 类似于\\\\ ；
2. $& 插入匹配的子串 例如 str.replace(RegExp,'$&') 不会发生任何变化；
3. \$` 插入匹配项的左边的内容；
4. \$' 插入匹配项的右边的内容；
5. \$n 假如第一个参数是 RegExp 对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串，<strong>n 从 1 开始</strong>。

function
当第一个参数为 RegExp 且使用了 g 修饰符时，每次匹配都会调用 function 。
函数的参数：

1. match 匹配的子串，类似于上面的 \$&
2. p1,p2... 类似于上面的$1,$2...
3. offset 匹配到的自字符在原字符串中的偏移量
4. string 原字符串。

### <font size=3> str.split( ) </font>

最后一个了！最后一个了！

参数： [separator[, limit]]

1. separator 指定表示每个拆分应发生的点的字符串。可以是 str 也可以是 RegExp。
2. limit 整数，限定返回的分割片段数量。

返回值： 分隔好的数组

举两个 MDN 中的例子：

```js code
// example 1 :
const names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand '
console.log(names)
//output: Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand
const re = /\s*(?:;|$)\s*/
const nameList = names.split(re)
console.log(nameList)
//output: [ "Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand", "" ]

// example 2 :
const myString = 'Hello World. How are you doing?'
const splits = myString.split(' ', 3)
console.log(splits)
//output: ["Hello", "World.", "How"]
```

# 总结

那就差不多是这样了。

以怎么定义、有哪些内容、怎么使用三个方面来搞了一下 JavaScript 的正则。

内容还是好多的啊，尤其是特殊符号里内容贼多，但是其实常用的也就那么一些。

整体感觉就是和 css 的 animation 一样，明明就一个东西却能玩出花来。

好啦那么

~~祝大家新年快乐~~
