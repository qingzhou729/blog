## 一、缓存
缓存技术一直一来在`WEB`技术体系中扮演非常重要角色，是快速且有效地提升性能的手段。
![](http://yukiyang.com/blog/075718.jpg)
如上图，在网页展示出来的过程中，各个层面都可以进行缓存。

之前在学习缓存的过程中，一直没有实践过，有些概念经常会忘记。
今天主要通过Node实践的方式学习**浏览器缓存**，顺便分析一下`Koa`处理缓存的源码。


## 二、浏览器缓存
首先我们看一下浏览器请求缓存过程。
![](http://yukiyang.com/blog/075736.jpg)
- 发出请求后，会先在本地查找缓存。

- 查到有缓存，要判断缓存是否**新鲜**（是否过期）。

- 没有过期，直接返回给客户端。

- 如果缓存过期了，就要再次去服务器请求最新的资源，返回给客户端，并重新进行缓存。

## 三、新鲜度检测
可能很多同学看其他博客，提到都是“强缓存/协商缓存”等说法，这个我会放到后面讲。
上图中**新鲜**一词比较少见，来自《HTTP权威指南》。

因为`HTTP`会将资源缓存一段时间，在这个时间内，这个缓存就是“新鲜的”。
所以检查缓存是否过期就被称为，**新鲜度检测**。

那么接下来就通过`Node`来实战一下，看看：
1. 浏览器是如何进行缓存的？
2. 如何进行新鲜度检测？

## 四、Node实战
上述提到缓存一段时间，那么HTTP提供了通用首部字段（就是请求报文和响应报文都能用上的字段），来控制缓存时间。

### 1. Pragma/Expires介绍
![](http://yukiyang.com/blog/075749.jpg)
> Pragma 是HTTP/1.0标准中定义的一个header属性，请求中包含Pragma的效果跟在头信息中定义Cache-Control: no-cache相同，但是HTTP的响应头没有明确定义这个属性，所以它不能拿来完全替代HTTP/1.1中定义的Cache-control头。通常定义Pragma以向后兼容基于HTTP/1.0的客户端。

`Expires`会返回一个绝对时间，如果请求时间在`Expires`指定的时间之前，就能命中缓存。但是因为客户端可以修改本地时间，会和和服务器时间不一致，容易出现差错，不推荐使用。
![](http://yukiyang.com/blog/075758.jpg)

### 2. Cache-Control介绍
![](http://yukiyang.com/blog/075859.jpg)

`Cache-Control`是现在常见的缓存方式，上述字段很多，初学者可以只看`max-age`，避免混乱，也是最有意义的属性。

![](http://yukiyang.com/blog/075910.jpg)
`Cache-Control`描述的是一个相对时间，在进行缓存命中的时候，都是利用客户端时间进行判断，所以相比较`Expires`，`Cache-Control`的缓存管理更有效，安全一些。

### 3. Cache-Control实战
通过`Koa`框架，简单搭建一个`Node`服务。并通过`koa-static`管理静态资源。

代码结构参考如下，`maxage`缓存设置`10`秒。
![](http://yukiyang.com/blog/075925.jpg)
启动服务，就可以看到自己的页面了~
```javaScript
node index.js // server is starting at port 8001
```
![](http://yukiyang.com/blog/075941.jpg)
在代码截图上，可以看到给`koa-static`传了`maxage: 10 * 1000`。

`koa-static`源码中引入了`koa-send`库。截取部分`koa-send`源码，只要传入`maxage`，就会设置`Cache-Control`的`max-age`。为符合前端开发者习惯传入为毫秒，实际上是用秒为单位的。

![](http://yukiyang.com/blog/075952.jpg)
通过`NetWork`可以观察到已经成功设置`Cache-Control: max-age=10`
![](http://yukiyang.com/blog/080002.jpg)

访问测试如下图：

![](http://yukiyang.com/blog/080109.jpg)

1. 在10s内再次请求，可以看到js/css均来自缓存`memory cache`。

2. 10s后缓存过期，不走缓存，便再次从服务器获取。

### 4. HTML为何如此特殊？
#### 4.1 现象
经过上面的实验可以看出，在`Js/Css`都走本地缓存的时候，`HTML`是依旧从服务端获取的。
![](http://yukiyang.com/blog/080121.jpg)
查看请求信息之后，发现请求头中默认加上了`Cache-Control: max-age=0`。
![](http://yukiyang.com/blog/080134.jpg)
经过测试，发现如果单独请求`Js`资源，也会出现此类现象。因此得出结论，这个是浏览器默认加的，应该是为了**保证直接请求的资源最新**。
![](http://yukiyang.com/blog/080143.jpg)

#### 4.2 原因
针对`request`请求，如果有`Cache-Control`限制，那么缓存系统就会先校验`Cache-Control`。不符合规则就直接请求服务端，具体规则如下：
![](http://yukiyang.com/blog/080158.jpg)
![](http://yukiyang.com/blog/080211.jpg)
上述来自《HTTP权威指南》。
同理浏览器中`Network`中的`disable-cache`也是如此，发出请求时，表示不需要走缓存，一定要服务端最新的。
![](http://yukiyang.com/blog/080224.jpg)
![](http://yukiyang.com/blog/080231.jpg)

### 5. 服务端再验证（新鲜度检测）
上述无论是`http1.0`还是`1.1`的方案，都是在本地缓存中存放一段时间。过期后就需要去服务端重新请求一遍。这个也被称之为**强缓存**。

但是，**缓存中过期并不意味服务端资源改变**。

因此请求发现本地缓存过期，可以去服务端咨询一下，这个资源还新鲜吗？还可以继续使用吗？常见的方法就是携带字段`If-Modified-Since`和`If-None-Match`。如果验证资源是新鲜的，没有改变。那只需要返回一个标识，也就是我们常说的`304`，不需要返回数据，加速请求时间。

这个过程就是**新鲜度检测**，那实现这个缓存的方式就是我们常说的**协商缓存**。

下面看下Node实战协商缓存。
### 6. Last-Modified 和 If-Modified-Since
携带`If-Modified-Since`的前提是，缓存中存储了`Last-Modified`字段。
每个请求返回时，`response`中可以携带字段`Last-Modified`，是服务端资源修改的最后日期。
![](http://yukiyang.com/blog/080240.jpg)
下次发起请求时携带`If-Modified-Since`就是缓存中的`Last-Modified`，和服务端资源最后修改时间进行比较，就知道资源是否新鲜了。

#### 6.1 代码验证
每个请求返回时，`response`中可以携带字段`Last-Modified`，是因为我们使用的`koa-static`会默认给我们的返回头加上`Last-Modified`。
![](http://yukiyang.com/blog/080252.jpg)
发出的请求也会自动携带`If-Modified-Since`。
![](http://yukiyang.com/blog/080301.jpg)
但是验证发现，10s后缓存过期，再次发出请求并没有返回304，还是200。
![](http://yukiyang.com/blog/080310.jpg)
原因是需要配置中间件`koa-conditional-get`。
#### 6.2 koa-conditional-get
![](http://yukiyang.com/blog/080318.jpg)
简单看下`koa-conditional-get`做了什么，让协商缓存生效。
可以看出源码非常简单，判断是否新鲜即可。

`ctx.fresh`如何计算，会在后面讲。但很明显是校验了`If-Modified-Since`和`Last-Modified`。
![](http://yukiyang.com/blog/080348.jpg)
#### 6.3 Last-Modified测试
1. 在10s内请求
2. 10s过期后请求
![](http://yukiyang.com/blog/080409.jpg)

测试结果，10s内`Js/Css`走强缓存。`HTML`由于请求默认加`max-age`为0，走协商缓存返回304，不需要返回数据，`Size`由484B降至163B。
![](http://yukiyang.com/blog/080425.jpg)
10s后`Js/Css`缓存到期，全部走协商缓存，由于`Last-Modified`一直没有改变，均返回304，不需要返回数据，`Size`降至163B。
返回304后，会重置`max-age`，10s内请求无需请求服务器，依然是强缓存。

3. 修改Js内容
![](http://yukiyang.com/blog/080517.jpg)
![](http://yukiyang.com/blog/080501.jpg)

修改`Js`内容测试结果，`Css`没有修改依旧返回304。`Js`修改导致`Last-Modified`大于请求中的`If-Modified-Since`，资源不够新鲜，返回200并返回最新数据。
#### 6.4 总结
`Last-Modified`工作流程如下：
![](http://yukiyang.com/blog/080545.jpg)

一般来说，在没有调整服务器时间和篡改客户端缓存的情况下，这两个`header`配合起来管理协商缓存是非常可靠的，但是有时候也会服务器上资源其实有变化，但是最后修改时间却没有变化的情况，而这种问题又很不容易被定位出来，而当这种情况出现的时候，就会影响协商缓存的可靠性。所以就有了另外一对`header`来管理协商缓存，这对header就是【`ETag`、`If-None-Match`】

### 7. ETag 和 If-None-Match

#### 7.1 ETag
这个`header`是服务器根据当前请求的资源生成的一个唯一标识，这个唯一标识是一个字符串，只要资源有变化这个串就不同，所以能很好的补充`Last-Modified`的问题。
避免干扰，可以注释`Last-modified`逻辑。
![](http://yukiyang.com/blog/080604.jpg)
`ETag`的验证也非常简单，只需要再加入一个中间件`koa-etag`，重启服务测试。
![](http://yukiyang.com/blog/080612.jpg)
#### 7.2 ETag实践
发出请求，`response`已有`Etag`：
![](http://yukiyang.com/blog/080621.jpg)
下一次请求也会携带`If-None-Match`为缓存中的`Etag`值：
![](http://yukiyang.com/blog/080628.jpg)

修改`Js`资源测试，结果如下：
![](http://yukiyang.com/blog/080636.jpg)
修改`Js`资源测试后，导致`Etag`改变。服务端再验证资源不新鲜，`Js`资源重新获取，返回200。
![](http://yukiyang.com/blog/080645.jpg)
`Css`没有修改，`Etag`没变返回304。
![](http://yukiyang.com/blog/080652.jpg)

`Etag`整体流程和`Last-Modified`保持一致。
#### 7.3 koa-etag源码解析
`koa`的`etag`生成主要2个方法，具体的可以直接去看源码。

（1）根据文件的修改时间和文件大小生成
```javaScript
function stattag (stat) {
  var mtime = stat.mtime.getTime().toString(16)
  var size = stat.size.toString(16)

  return '"' + size + '-' + mtime + '"'
}
```
（2）使用`crypto`库加密生成
```javaScript
function entitytag (entity) {
  if (entity.length === 0) {
    // fast-path empty
    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"'
  }

  // compute hash of entity
  var hash = crypto
    .createHash('sha1')
    .update(entity, 'utf8')
    .digest('base64')
    .substring(0, 27)

  // compute length of entity
  var len = typeof entity === 'string'
    ? Buffer.byteLength(entity, 'utf8')
    : entity.length

  return '"' + len.toString(16) + '-' + hash + '"'
}

```

## 五、新鲜度检测（Koa源码解读）

### 1. koa-conditional-get

在前面看到`koa-conditional-get`可以让协商缓存生效，原因是对资源新鲜度做了304返回的处理。
![](http://yukiyang.com/blog/080700.jpg)
那么重点来看下`ctx.fresh`是如何处理的？

### 2. koa
可以看到Koa在request中的`fresh`方法如下：
![](http://yukiyang.com/blog/080712.jpg)
状态码200-300之间以及304调用`fresh`方法，判断该请求的资源是否新鲜。

### 3. fresh方法源码解读
只保留核心代码，可以自行去看`fresh`的源码。
```javaSCript
var CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/

function fresh (reqHeaders, resHeaders) {
   // 1. 如果这2个字段，一个都没有，不需要校验
  var modifiedSince = reqHeaders['if-modified-since']
  var noneMatch = reqHeaders['if-none-match']
  if (!modifiedSince && !noneMatch) {
    console.log('not fresh')
    return false
  }

  // 2. 给端对端测试用的，因为浏览器的Cache-Control: no-cache请求
  //    是不会带if条件的 不会走到这个逻辑
  var cacheControl = reqHeaders['cache-control']
  if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {
    return false
  }

  // 3. 比较 etag和if-none-match
  if (noneMatch && noneMatch !== '*') {
    var etag = resHeaders['etag']

    if (!etag) {
      return false
    }
    // 部分代码
    if (match === etag) {
        return true;
    }
  }
  
  // 4. 比较if-modified-since和last-modified
  if (modifiedSince) {
    var lastModified = resHeaders['last-modified']
    var modifiedStale = !lastModified || !(parseHttpDate(lastModified) <= parseHttpDate(modifiedSince))
    if (modifiedStale) {
      return false
    }
  }
  
  return true
}
```
`fresh`的代码判断逻辑总结如下，满足3种条件之一，`fresh`为`true`。

![](http://yukiyang.com/blog/080724.jpg)


## 六、总结
浏览器缓存整体流程如下：
![](http://yukiyang.com/blog/080733.jpg)

1. 发出请求后，会先在本地查找缓存。
2. 没有缓存去服务端请求最新的资源，返回给客户端（200），并重新进行缓存。
3. 查到有缓存，要判断缓存本地是否过期(`max-age`等)。
4. 没有过期，直接返回给客户端（200 `from cache`）。
5. 如果缓存过期了，看是否有配置协商缓存（`etag/last-modified`），去服务端再验证该资源是否更新，本地缓存是否可以继续使用。
6. 如果发现资源可用，返回304，告知客户端可以继续使用缓存，并根据`max-age`等更新缓存时间。不需要返回数据，加速请求时间。
7. 如果服务端再验证失败，请求最新的资源，返回给客户端（200），并重新进行缓存。


我们常说的强缓存，其实就是直接在本地缓存获取，也就是`Cache-Control: max-age`等配置，不需要和服务端沟通。

而协商缓存是在强缓存的基础上，配置`etag或last-modified`等参数。本地缓存失效后，去服务端进行新鲜度检测。可以避免每次本地缓存过期后都返回最新的数据，造成请求缓慢。

# 七、参考资料

- [前端优化：浏览器缓存技术介绍](https://juejin.im/post/6844903672556552205)
- [浏览器缓存](https://juejin.im/post/6844903763665240072)
- 书籍《HTTP权威指南》

本文的源码分析围绕`koa`，不代表其他服务框架。对这块知识不了解建议实践一下。写错的地方，接受批评指正~



