`Webpack`的成功之处，不仅在于强大的打包构建能力，也在于它灵活的插件机制。

> Webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable。

在学习`Webpack`的时候，经常可以看到上述介绍。也就是说学`Webpack`的前提是要学习`Tapable`。才能更好的学习`Webpack`原理。

## 一、Tapable
其实`tapable`的核心思路有点类似于`node.js`中的`events`，最基本的**发布/订阅**模式。
```javaScript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// 注册事件对应的监听函数
myEmitter.on('start', (params) => {
    console.log("输出", params)
});

// 触发事件 并传入参数
myEmitter.emit('start', '学习webpack工作流'); // 输出 学习webpack工作流
```

## 二、tapable钩子介绍

首先，`tapable`提供的钩子有如下10个。
![tapable钩子介绍](http://yukiyang.com/blog/074148.jpg)

```javascript
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesLoopHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");
```
其次，所有钩子的用法简介，如下：（可以简单瞄一眼，就往下看吧）

| 序号 | 钩子名称 | 执行方式 |使用要点 |
|------|------------|------------|------------|
| 1  | SyncHook         | 同步串行         |不关心监听函数的返回值|
|2|SyncBailHook|同步串行|只要监听函数中有一个函数的返回值不为 undefined，则跳过剩下所有的逻辑|
|3|SyncWaterfallHook|同步串行|上一个监听函数的返回值可以传给下一个监听函数
|4|SyncLoopHook|同步循环|当监听函数被触发的时候，如果该监听函数返回true时则这个监听函数会反复执行，如果返回 undefined 则表示退出循环|
|5|AsyncParallelHook|异步并发|不关心监听函数的返回值
|6|AsyncParallelBailHook|异步并发|只要监听函数的返回值不为 null，就会忽略后面的监听函数执行，直接跳跃到callAsync等触发函数绑定的回调函数，然后执行这个被绑定的回调函数|
|7|AsyncSeriesHook|异步串行|不关心callback()的参数|
|8|AsyncSeriesBailHook|异步串行|callback()的参数不为null，就会直接执行callAsync等触发函数绑定的回调函数|
|9|AsyncSeriesWaterfallHook|异步串行|上一个监听函数的中的callback(err, data)的第二个参数,可以作为下一个监听函数的参数。|
|10|AsyncSeriesLoopHook|异步串行|可以触发handler循环调用。|

## 三、上述Hook使用介绍
### （1.1）SyncHook
>同步串行，不关心监听函数的返回值。

我们先来介绍最简单的`SyncHook`，其实每个`Hook`都大同小异，懂一个其他的就非常好懂了。
```javaScript
const {SyncHook} = require("tapable");

//所有的构造函数都接收一个可选的参数，这个参数是一个字符串的数组。
let queue = new SyncHook(['param1']); 

// 订阅tap 的第一个参数是用来标识订阅的函数的
queue.tap('event 1', function (param1) {
    console.log(param1, 1);
});

queue.tap('event 2', function (param1) {
    console.log(param1, 2);
});

queue.tap('event 3', function () {
    console.log(3);
});

// 发布的时候触发订阅的函数 同时传入参数
queue.call('hello');

// 控制台输出
/* hello 1
   hello 2
   3
*/
```
可以看到，这个钩子订阅的事件都是按顺序同步执行的。
### （1.2）SyncHook原理
简单模拟下原理。
```javascript
class SyncHook{
    constructor(){
        this.taps = [];
    }

    // 订阅
    tap(name, fn){
        this.taps.push(fn);
    }

    // 发布
    call(){
        this.taps.forEach(tap => tap(...arguments));
    }
}
```

### （2.1）SyncBailHook
再来看下`SyncBailHook`的使用。
>只要监听函数中有一个函数的返回值不为undefined，则跳过剩下所有的逻辑。

```javascript
let queue = new SyncBailHook(['param1']); //所有的构造函数都接收一个可选的参数，这个参数是一个字符串的数组。

// 订阅
queue.tap('event 1', function (param1) {// tap 的第一个参数是用来标识订阅的函数的
    console.log(param1, 1);
    return 1;
});

queue.tap('event 2', function (param1) {
    console.log(param1, 2);
});

queue.tap('event 3', function () {
    console.log(3);
});

// 发布
queue.call('hello', 'world');// 发布的时候触发订阅的函数 同时传入参数

// 控制台输出
/* hello 1 */
```
可以看到，只要监听函数中有一个函数的返回值不为`undefined`，则跳过剩下所有的逻辑。
### （2.2）SyncBailHook原理
简单模拟下原理。
```javascript
class SyncBailHook {
    constructor() {
        this.taps = [];
    }

    // 订阅
    tap(name, fn) {
        this.taps.push(fn);
    }

    // 发布
    call() {
        for (let i = 0, l = this.taps.length; i < l; i++) {
            let tap = this.taps[i];
            let result = tap(...arguments);
            if (result) {
                break;
            }
        }
    }
}
```
### （3）SyncHook和SyncBailHook总结
上述`2`种的钩子的执行流程如下图所示：
![](http://yukiyang.com/blog/074238.jpg)
通过这个`2`个钩子的介绍，可以发现`tapable`提供了各种各样的`hook`来帮我们管理事件是如何执行的。

`tapable`的核心功能就是控制一系列注册事件之间的执行流控制，比如我注册了三个事件，我可以希望他们是并发的，或者是同步依次执行，又或者其中一个出错后，后面的事件就不执行了，这些功能都可以通过`tapable`的`hook`实现。

就像起床、上班、吃早饭的关系一样，起床肯定是优先的。但是吃饭和上班就不一定啦。万一要迟到了呢？可能就放弃早饭了！
![](http://yukiyang.com/blog/074303.jpg)


## 四、Tapable的源码解读

记住重点，核心就是`call`和`tap`两个方法。\
记住重点，核心就是`call`和`tap`两个方法。\
记住重点，核心就是`call`和`tap`两个方法。

那我们来看下`tapable`源码的`SyncHook`是如何实现的，如下。还是那句话，看完一个，其他的自然就懂啦。为了理解，源码均为缩减过的，去除了些非核心代码。
```javaScript
// node_modules/tapable/lib/SyncHook.js
const factory = new SyncHookCodeFactory();
// 继承基础Hook类
class SyncHook extends Hook {
    // 重写Hook的compile方法
    compile(options) {
        // 开发者订阅的事件传
        factory.setup(this, options);
        // 动态生成call方法
    	return factory.create(options);
    }
}
module.exports = SyncHook;
```
核心代码非常简单，可以看到`SyncHook`就是继承了`Hook`基础类。并重写了`compile`方法。

首先来看下`Hook`基础类的`tap`方法。可以看到每次调用`tap`，就是收集当前`hook`实例所有订阅的事件到`taps`数组。
```javaScript
// node_modules/tapable/lib/Hook.js
// 订阅
tap(options, fn) {
    // 同步 整理配置项
    options = Object.assign({ type: "sync", fn: fn }, options);
    // 将订阅的事件存储在taps里面
    this._insert(options);
}

_insert(item) {
    // 将item 推进 this.taps
    this.taps[i] = item;
}
```
然后来看下`Hook`基础类的`call`方法是如何实现的。
```javaScript
// node_modules/tapable/lib/Hook.js
class Hook {
    constructor(args) {
    	this.taps = [];
    	this.call = this._call;
    }

    compile(options) {
    	// 继承类必须重写compile
    	throw new Error("Abstract: should be overriden");
    }
    
    // 执行compile生成call方法
    _createCall(type) {
    	return this.compile({
            taps: this.taps,
    		// ...等参数
    	});
    }
}

// 动态生成call方法
function createCompileDelegate(name, type) {
    return function lazyCompileHook(...args) {
    	// 创造call等函数
    	this[name] = this._createCall(type);
    	// 执行触发call等函数
    	return this[name](...args);
    };
}

// 定义_call方法
Object.defineProperties(Hook.prototype, {
    _call: {
    	value: createCompileDelegate("call", "sync"),
    	configurable: true,
    	writable: true
    },
});
```

通过上述代码，我们可以发现，`call`方法究竟是什么，是通过重写的`compile`方法生成出来的。那我们再看下`compile`方法究竟做了什么。

先来看下`SyncHook`的全部代码。

```javaScript
// node_modules/tapable/lib/SyncHook.js
const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

// 继承工厂类
class SyncHookCodeFactory extends HookCodeFactory {
    // call方法个性化定制
    content({ onError, onDone, rethrowIfPossible }) {
    	return this.callTapsSeries({
            onError: (i, err) => onError(err),
            onDone,
            rethrowIfPossible
    	});
    }
}

const factory = new SyncHookCodeFactory();

// 继承基础Hook类
class SyncHook extends Hook {
    // 重写Hook的compile方法
    compile(options) {
        // 开发者订阅的事件传
        factory.setup(this, options);
        // 动态生成call方法
    	return factory.create(options);
    }
}

module.exports = SyncHook;
```
可以看到`compile`主要是执行`factory`的方法，而`factory`是`SyncHookCodeFactory`的实例，继承了`HookCodeFactory`类，然后`factory`实例调用了`setup`方法。

`setup`就是将`taps`中订阅的事件方法统一给了`this._x`;
```javaScript
// node_modules/tapable/lib/HookCodeFactory.js
setup(instance, options) {
    // 将taps里的所有fn 赋值给 _x
    instance._x = options.taps.map(t => t.fn);
}
```
然后再看下`factory`实例调用的`create`方法。

```javaScript
// node_modules/tapable/lib/HookCodeFactory.js
create(options) {
    this.init(options);
    let fn;
    switch (this.options.type) {
        case "sync":
            fn = new Function(
                // 参数
                this.args(),
                // 函数体
                '"use strict";\n' +
                // 获取一些需要的变量
                this.header() +
                // 事件运行逻辑
                this.content({
                    onError: err => `throw ${err};\n`,
                    onResult: result => `return ${result};\n`,
                    resultReturns: true,
                    onDone: () => "",
                    rethrowIfPossible: true
                })
        );
        break;
    }
}
```

`create`会将传进来的所有事件，进行组装。最终生成`call`方法。
如下就是我们这次的案例最终生成的`call`方法。
```
function anonymous(param1) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(param1);
    var _fn1 = _x[1];
    _fn1(param1);
    var _fn2 = _x[2];
    _fn2(param1);
}
```

如果你订阅了`5`个事件，上述代码就会变成`5`个函数的依次执行。以及参数必须是创建`hook`实例就声明好的。否则`tap`事件传的参数是无用的~

以上代码还是简写了很多，大家可以直接去看下源码，非常精简好理解。给作者大大点赞。👍

总结一下，核心就是`call`和`tap`两个方法。其实还有`tapAsync`等...但是原理都是一样的。`tap`收集订阅的事件，触发`call`方法时根据`hook`的种类动态生成对应的执行体。如下图，其他`hook`的实现也是同理。

![](http://yukiyang.com/blog/074342.jpg)






## 五、Tapable在Webpack中的应用
`Webpack`的流程可以分为以下三大阶段：


![](http://yukiyang.com/blog/074408.jpg)

执行`webpack`时，会生成一个`compiler`实例。

```javaScript
// node_modules/webpack/lib/webpack.js
const Compiler = require("./Compiler");
const MultiCompiler = require("./MultiCompiler");

const webpack = (options, callback) => {
	// ...省略了多余代码...
    let compiler;
    if (typeof options === "object") {
    	compiler = new Compiler(options.context);
    } else {
    	throw new Error("Invalid argument: options");
    }
})
```
我们发现`Compiler`是继承了`Tapable`的。同时发现`webpack`的生命周期`hooks`都是各种各样的钩子。
```javaScript
// node_modules/webpack/lib/Compiler.js
class Compiler extends Tapable {
    constructor(context) {
    super();
        this.hooks = {
            /** @type {AsyncSeriesHook<Stats>} */
            done: new AsyncSeriesHook(["stats"]),
            /** @type {AsyncSeriesHook<>} */
            additionalPass: new AsyncSeriesHook([]),
            /** @type {AsyncSeriesHook<Compiler>} */
            beforeRun: new AsyncSeriesHook(["compiler"]),
            /** @type {AsyncSeriesHook<Compiler>} */
            run: new AsyncSeriesHook(["compiler"]),
            /** @type {AsyncSeriesHook<Compilation>} */
            emit: new AsyncSeriesHook(["compilation"]),
            /** @type {AsyncSeriesHook<string, Buffer>} */
            assetEmitted: new AsyncSeriesHook(["file", "content"]),
            /** @type {AsyncSeriesHook<Compilation>} */
            afterEmit: new AsyncSeriesHook(["compilation"]),
        
            // ....等等等很多 大家看下源码吧.... 不看也没有关系
        }
    }
}
```
然后在初始化`webpack`的配置过程中，会循环我们配置的以及`webpack`默认的所有插件也就是`plugin`。
```javaScript
// 订阅在options中的所有插件
if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
        if (typeof plugin === "function") {
            plugin.call(compiler, compiler);
        } else {
            plugin.apply(compiler);
        }
    }
}
```
这个过程，会把`plugin`中所有`tap`事件收集到每个生命周期的`hook`中。
最后根据每个`hook`执行`call`方法的顺序（也就是生命周期）。就可以把所有`plugin`执行了。

举个例子，下面是我们经常使用的热更新插件代码，它订阅了`additionalPass`等`hook`。
![](http://yukiyang.com/blog/074446.jpg)
这也就是`webpack`它工作流程能将各个插件`plugin`串联起来的原因，而实现这一切的核心就是`Tapable`。

## 六、吐个槽
虽然插件化设计很灵活，我们可以写插件操作`webpack`的整个生命周期。但是也发现插件化设计带来的一些问题，就是阅读源码非常不好的体验：

（1）联系松散。使用`tapable`钩子类似事件监听模式，虽然能有效解耦，但钩子的注册与调用几乎没有联系。

（2）看到源码里一个模块提供了几个钩子，但并不知道，在何时、何地该钩子会被调用，又在何时、何地钩子上被注册了哪些方法。这些以往都是需要通过在代码库中搜索关键词来解决。

（3）钩子数量众多。`webpack`内部的钩子非常多，数量达到了`180+`，

## 参考链接
本篇文主要是讲原理，理解`tapable`。其他的钩子的使用，可以看这篇文章。
- [webpack4.0源码分析之Tapable](https://juejin.im/post/6844903588112629767)

