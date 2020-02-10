# 父组件向子组件传值

## props

父组件向子组件传递当然是直接使用 props 。

但是需要传递数据的组件之间层次较多时，一层层的传递 props 是否可取还是要参看实际情况，通常来说不推荐。

但是看到一个思路是，使用 props.children 来进行传递，可以解决需要传递的层数相对不是特别多而传递的数据较为复杂的情况。

其实也是有点花里胡哨，并不是非常推荐，若组件之间距离较远(跨级较多)还是使用 **context** 或者 **redux**。

举个例子，某子(孙)组件引用了某个组件 Demo，而要向里面穿的参数需要在父(祖)组件确定，这时，可以在父(祖)组件中给 Demo 组件传需要的 props，再把传好了 Props 的这个 Demo 组件作为 props 向下传给子(孙)组件。 

虽然这样在父辈组件和子组件之间每一层都需要传一次 Demo 组件，但是如果本身要传的参数很多，只传一个组件的优势就体现出来了。(说实话，内心毫无波动

举个例子：

```jsx
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Demo><P color='red' fontSize='16px'/></Demo>
      </div>
    );
  }
}
class Demo extends React.Component {
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}
const P = props => <p style={{color: props.color, fontSize: props.fontSize}}>this is demo</p>
```

需要注意的是，当且仅当有多个子节点时，props.children 是一个数组。

# 子组件向父组件传值

通常的方式就是在父组件定义一个函数并作为 props 传给子组件，子组件触发该函数以此向父组件传递信息。

举个例子：

```jsx
import React from 'react';
function Demo(props) {
  const getNum = e => {
    props.fun(e.target.value)
  }
  return (
    <div>
      <input onChange={getNum} />
    </div>
  )
}
export default class App extends React.Component {
  state = {
    num: 0
  }
  demoFun = props => {
    this.setState({
      num: props
    })
  }
  render() {
    return (
      <div className="App">
        <span>{this.state.num}</span>
        <Demo fun={this.demoFun} />
      </div>
    );
  }
}
```

当在子组件 Demo 中监听到 input 输入变动时，就会调用父组件传下来的方法更新父组件的 state 。

# 非嵌套组件通讯

两个组件之间没有什么联系，比如兄弟组件、不再同一个父组件下的非兄弟组件等，可以使用自定义事件。

当然啦，Redux 谁不喜欢呐。

使用 events 包，通过设定自定义事件来达到通信的目的(和子组件向父组件传参的思路很像，子组件向父组件传值也可以采用此方法

```makeup
// 首先需要下载 events 包
$ yarn add events
```

```js
// event.js
import {EventEmitter} from 'events'
export default new EventEmitter()
```

```jsx
// Foo.js
import React, { useState, useEffect } from 'react';
import emitter from './event'

export default function Foo() {
  const [msg, setMsg] = useState(null)

  useEffect(()=>{
    const eventEmitter = emitter.addListener('demoCallback', msg => {
      setMsg(msg)
    })
    return ()=>{
      //当组件被消除的时候需要删除监听事件
      emitter.removeListener(eventEmitter);
    }
  })
  
  return <div>Foo: {msg}</div>
}
```

```jsx
// Bar.js
import React, { useState, useEffect } from 'react';
import emitter from './event'

export default function Bar() {
  const cb = msg => {
    return ()=>{
      emitter.emit('demoCallback', 'hello')
    }
  }
  
  return <div>Bar: {msg} <button onClick={cb('bye')}>click me</button></div>
}
```

上面的例子中 Foo 组件和 Bar 组件是兄弟组件，Foo 组件中定义了一个名为 demoCallback 的监听事件，而在 Bar 组件中调用，依次达到向 Foo 组件传参的目的。