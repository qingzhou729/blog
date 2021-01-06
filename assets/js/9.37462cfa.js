(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{367:function(t,a,s){"use strict";s.r(a);var n=s(42),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"一、缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、缓存"}},[t._v("#")]),t._v(" 一、缓存")]),t._v(" "),s("p",[t._v("缓存技术一直一来在"),s("code",[t._v("WEB")]),t._v("技术体系中扮演非常重要角色，是快速且有效地提升性能的手段。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/075718.jpg",alt:""}}),t._v("\n如上图，在网页展示出来的过程中，各个层面都可以进行缓存。")]),t._v(" "),s("p",[t._v("之前在学习缓存的过程中，一直没有实践过，有些概念经常会忘记。\n今天主要通过Node实践的方式学习"),s("strong",[t._v("浏览器缓存")]),t._v("，顺便分析一下"),s("code",[t._v("Koa")]),t._v("处理缓存的源码。")]),t._v(" "),s("h2",{attrs:{id:"二、浏览器缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、浏览器缓存"}},[t._v("#")]),t._v(" 二、浏览器缓存")]),t._v(" "),s("p",[t._v("首先我们看一下浏览器请求缓存过程。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/075736.jpg",alt:""}})]),t._v(" "),s("ul",[s("li",[s("p",[t._v("发出请求后，会先在本地查找缓存。")])]),t._v(" "),s("li",[s("p",[t._v("查到有缓存，要判断缓存是否"),s("strong",[t._v("新鲜")]),t._v("（是否过期）。")])]),t._v(" "),s("li",[s("p",[t._v("没有过期，直接返回给客户端。")])]),t._v(" "),s("li",[s("p",[t._v("如果缓存过期了，就要再次去服务器请求最新的资源，返回给客户端，并重新进行缓存。")])])]),t._v(" "),s("h2",{attrs:{id:"三、新鲜度检测"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、新鲜度检测"}},[t._v("#")]),t._v(" 三、新鲜度检测")]),t._v(" "),s("p",[t._v("可能很多同学看其他博客，提到都是“强缓存/协商缓存”等说法，这个我会放到后面讲。\n上图中"),s("strong",[t._v("新鲜")]),t._v("一词比较少见，来自《HTTP权威指南》。")]),t._v(" "),s("p",[t._v("因为"),s("code",[t._v("HTTP")]),t._v("会将资源缓存一段时间，在这个时间内，这个缓存就是“新鲜的”。\n所以检查缓存是否过期就被称为，"),s("strong",[t._v("新鲜度检测")]),t._v("。")]),t._v(" "),s("p",[t._v("那么接下来就通过"),s("code",[t._v("Node")]),t._v("来实战一下，看看：")]),t._v(" "),s("ol",[s("li",[t._v("浏览器是如何进行缓存的？")]),t._v(" "),s("li",[t._v("如何进行新鲜度检测？")])]),t._v(" "),s("h2",{attrs:{id:"四、node实战"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四、node实战"}},[t._v("#")]),t._v(" 四、Node实战")]),t._v(" "),s("p",[t._v("上述提到缓存一段时间，那么HTTP提供了通用首部字段（就是请求报文和响应报文都能用上的字段），来控制缓存时间。")]),t._v(" "),s("h3",{attrs:{id:"_1-pragma-expires介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-pragma-expires介绍"}},[t._v("#")]),t._v(" 1. Pragma/Expires介绍")]),t._v(" "),s("p",[s("img",{attrs:{src:"http://yukiyang.com/blog/075749.jpg",alt:""}})]),t._v(" "),s("blockquote",[s("p",[t._v("Pragma 是HTTP/1.0标准中定义的一个header属性，请求中包含Pragma的效果跟在头信息中定义Cache-Control: no-cache相同，但是HTTP的响应头没有明确定义这个属性，所以它不能拿来完全替代HTTP/1.1中定义的Cache-control头。通常定义Pragma以向后兼容基于HTTP/1.0的客户端。")])]),t._v(" "),s("p",[s("code",[t._v("Expires")]),t._v("会返回一个绝对时间，如果请求时间在"),s("code",[t._v("Expires")]),t._v("指定的时间之前，就能命中缓存。但是因为客户端可以修改本地时间，会和和服务器时间不一致，容易出现差错，不推荐使用。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/075758.jpg",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"_2-cache-control介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-cache-control介绍"}},[t._v("#")]),t._v(" 2. Cache-Control介绍")]),t._v(" "),s("p",[s("img",{attrs:{src:"http://yukiyang.com/blog/075859.jpg",alt:""}})]),t._v(" "),s("p",[s("code",[t._v("Cache-Control")]),t._v("是现在常见的缓存方式，上述字段很多，初学者可以只看"),s("code",[t._v("max-age")]),t._v("，避免混乱，也是最有意义的属性。")]),t._v(" "),s("p",[s("img",{attrs:{src:"http://yukiyang.com/blog/075910.jpg",alt:""}}),t._v(" "),s("code",[t._v("Cache-Control")]),t._v("描述的是一个相对时间，在进行缓存命中的时候，都是利用客户端时间进行判断，所以相比较"),s("code",[t._v("Expires")]),t._v("，"),s("code",[t._v("Cache-Control")]),t._v("的缓存管理更有效，安全一些。")]),t._v(" "),s("h3",{attrs:{id:"_3-cache-control实战"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-cache-control实战"}},[t._v("#")]),t._v(" 3. Cache-Control实战")]),t._v(" "),s("p",[t._v("通过"),s("code",[t._v("Koa")]),t._v("框架，简单搭建一个"),s("code",[t._v("Node")]),t._v("服务。并通过"),s("code",[t._v("koa-static")]),t._v("管理静态资源。")]),t._v(" "),s("p",[t._v("代码结构参考如下，"),s("code",[t._v("maxage")]),t._v("缓存设置"),s("code",[t._v("10")]),t._v("秒。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/075925.jpg",alt:""}}),t._v("\n启动服务，就可以看到自己的页面了~")]),t._v(" "),s("div",{staticClass:"language-javaScript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("node index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("js "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// server is starting at port 8001")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[s("img",{attrs:{src:"http://yukiyang.com/blog/075941.jpg",alt:""}}),t._v("\n在代码截图上，可以看到给"),s("code",[t._v("koa-static")]),t._v("传了"),s("code",[t._v("maxage: 10 * 1000")]),t._v("。")]),t._v(" "),s("p",[s("code",[t._v("koa-static")]),t._v("源码中引入了"),s("code",[t._v("koa-send")]),t._v("库。截取部分"),s("code",[t._v("koa-send")]),t._v("源码，只要传入"),s("code",[t._v("maxage")]),t._v("，就会设置"),s("code",[t._v("Cache-Control")]),t._v("的"),s("code",[t._v("max-age")]),t._v("。为符合前端开发者习惯传入为毫秒，实际上是用秒为单位的。")]),t._v(" "),s("p",[s("img",{attrs:{src:"http://yukiyang.com/blog/075952.jpg",alt:""}}),t._v("\n通过"),s("code",[t._v("NetWork")]),t._v("可以观察到已经成功设置"),s("code",[t._v("Cache-Control: max-age=10")]),t._v(" "),s("img",{attrs:{src:"http://yukiyang.com/blog/080002.jpg",alt:""}})]),t._v(" "),s("p",[t._v("访问测试如下图：")]),t._v(" "),s("p",[s("img",{attrs:{src:"http://yukiyang.com/blog/080109.jpg",alt:""}})]),t._v(" "),s("ol",[s("li",[s("p",[t._v("在10s内再次请求，可以看到js/css均来自缓存"),s("code",[t._v("memory cache")]),t._v("。")])]),t._v(" "),s("li",[s("p",[t._v("10s后缓存过期，不走缓存，便再次从服务器获取。")])])]),t._v(" "),s("h3",{attrs:{id:"_4-html为何如此特殊"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-html为何如此特殊"}},[t._v("#")]),t._v(" 4. HTML为何如此特殊？")]),t._v(" "),s("h4",{attrs:{id:"_4-1-现象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-现象"}},[t._v("#")]),t._v(" 4.1 现象")]),t._v(" "),s("p",[t._v("经过上面的实验可以看出，在"),s("code",[t._v("Js/Css")]),t._v("都走本地缓存的时候，"),s("code",[t._v("HTML")]),t._v("是依旧从服务端获取的。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080121.jpg",alt:""}}),t._v("\n查看请求信息之后，发现请求头中默认加上了"),s("code",[t._v("Cache-Control: max-age=0")]),t._v("。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080134.jpg",alt:""}}),t._v("\n经过测试，发现如果单独请求"),s("code",[t._v("Js")]),t._v("资源，也会出现此类现象。因此得出结论，这个是浏览器默认加的，应该是为了"),s("strong",[t._v("保证直接请求的资源最新")]),t._v("。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080143.jpg",alt:""}})]),t._v(" "),s("h4",{attrs:{id:"_4-2-原因"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-原因"}},[t._v("#")]),t._v(" 4.2 原因")]),t._v(" "),s("p",[t._v("针对"),s("code",[t._v("request")]),t._v("请求，如果有"),s("code",[t._v("Cache-Control")]),t._v("限制，那么缓存系统就会先校验"),s("code",[t._v("Cache-Control")]),t._v("。不符合规则就直接请求服务端，具体规则如下：\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080158.jpg",alt:""}}),t._v(" "),s("img",{attrs:{src:"http://yukiyang.com/blog/080211.jpg",alt:""}}),t._v("\n上述来自《HTTP权威指南》。\n同理浏览器中"),s("code",[t._v("Network")]),t._v("中的"),s("code",[t._v("disable-cache")]),t._v("也是如此，发出请求时，表示不需要走缓存，一定要服务端最新的。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080224.jpg",alt:""}}),t._v(" "),s("img",{attrs:{src:"http://yukiyang.com/blog/080231.jpg",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"_5-服务端再验证-新鲜度检测"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-服务端再验证-新鲜度检测"}},[t._v("#")]),t._v(" 5. 服务端再验证（新鲜度检测）")]),t._v(" "),s("p",[t._v("上述无论是"),s("code",[t._v("http1.0")]),t._v("还是"),s("code",[t._v("1.1")]),t._v("的方案，都是在本地缓存中存放一段时间。过期后就需要去服务端重新请求一遍。这个也被称之为"),s("strong",[t._v("强缓存")]),t._v("。")]),t._v(" "),s("p",[t._v("但是，"),s("strong",[t._v("缓存中过期并不意味服务端资源改变")]),t._v("。")]),t._v(" "),s("p",[t._v("因此请求发现本地缓存过期，可以去服务端咨询一下，这个资源还新鲜吗？还可以继续使用吗？常见的方法就是携带字段"),s("code",[t._v("If-Modified-Since")]),t._v("和"),s("code",[t._v("If-None-Match")]),t._v("。如果验证资源是新鲜的，没有改变。那只需要返回一个标识，也就是我们常说的"),s("code",[t._v("304")]),t._v("，不需要返回数据，加速请求时间。")]),t._v(" "),s("p",[t._v("这个过程就是"),s("strong",[t._v("新鲜度检测")]),t._v("，那实现这个缓存的方式就是我们常说的"),s("strong",[t._v("协商缓存")]),t._v("。")]),t._v(" "),s("p",[t._v("下面看下Node实战协商缓存。")]),t._v(" "),s("h3",{attrs:{id:"_6-last-modified-和-if-modified-since"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-last-modified-和-if-modified-since"}},[t._v("#")]),t._v(" 6. Last-Modified 和 If-Modified-Since")]),t._v(" "),s("p",[t._v("携带"),s("code",[t._v("If-Modified-Since")]),t._v("的前提是，缓存中存储了"),s("code",[t._v("Last-Modified")]),t._v("字段。\n每个请求返回时，"),s("code",[t._v("response")]),t._v("中可以携带字段"),s("code",[t._v("Last-Modified")]),t._v("，是服务端资源修改的最后日期。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080240.jpg",alt:""}}),t._v("\n下次发起请求时携带"),s("code",[t._v("If-Modified-Since")]),t._v("就是缓存中的"),s("code",[t._v("Last-Modified")]),t._v("，和服务端资源最后修改时间进行比较，就知道资源是否新鲜了。")]),t._v(" "),s("h4",{attrs:{id:"_6-1-代码验证"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-代码验证"}},[t._v("#")]),t._v(" 6.1 代码验证")]),t._v(" "),s("p",[t._v("每个请求返回时，"),s("code",[t._v("response")]),t._v("中可以携带字段"),s("code",[t._v("Last-Modified")]),t._v("，是因为我们使用的"),s("code",[t._v("koa-static")]),t._v("会默认给我们的返回头加上"),s("code",[t._v("Last-Modified")]),t._v("。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080252.jpg",alt:""}}),t._v("\n发出的请求也会自动携带"),s("code",[t._v("If-Modified-Since")]),t._v("。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080301.jpg",alt:""}}),t._v("\n但是验证发现，10s后缓存过期，再次发出请求并没有返回304，还是200。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080310.jpg",alt:""}}),t._v("\n原因是需要配置中间件"),s("code",[t._v("koa-conditional-get")]),t._v("。")]),t._v(" "),s("h4",{attrs:{id:"_6-2-koa-conditional-get"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-koa-conditional-get"}},[t._v("#")]),t._v(" 6.2 koa-conditional-get")]),t._v(" "),s("p",[s("img",{attrs:{src:"http://yukiyang.com/blog/080318.jpg",alt:""}}),t._v("\n简单看下"),s("code",[t._v("koa-conditional-get")]),t._v("做了什么，让协商缓存生效。\n可以看出源码非常简单，判断是否新鲜即可。")]),t._v(" "),s("p",[s("code",[t._v("ctx.fresh")]),t._v("如何计算，会在后面讲。但很明显是校验了"),s("code",[t._v("If-Modified-Since")]),t._v("和"),s("code",[t._v("Last-Modified")]),t._v("。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080348.jpg",alt:""}})]),t._v(" "),s("h4",{attrs:{id:"_6-3-last-modified测试"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-3-last-modified测试"}},[t._v("#")]),t._v(" 6.3 Last-Modified测试")]),t._v(" "),s("ol",[s("li",[t._v("在10s内请求")]),t._v(" "),s("li",[t._v("10s过期后请求\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080409.jpg",alt:""}})])]),t._v(" "),s("p",[t._v("测试结果，10s内"),s("code",[t._v("Js/Css")]),t._v("走强缓存。"),s("code",[t._v("HTML")]),t._v("由于请求默认加"),s("code",[t._v("max-age")]),t._v("为0，走协商缓存返回304，不需要返回数据，"),s("code",[t._v("Size")]),t._v("由484B降至163B。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080425.jpg",alt:""}}),t._v("\n10s后"),s("code",[t._v("Js/Css")]),t._v("缓存到期，全部走协商缓存，由于"),s("code",[t._v("Last-Modified")]),t._v("一直没有改变，均返回304，不需要返回数据，"),s("code",[t._v("Size")]),t._v("降至163B。\n返回304后，会重置"),s("code",[t._v("max-age")]),t._v("，10s内请求无需请求服务器，依然是强缓存。")]),t._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[t._v("修改Js内容\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080517.jpg",alt:""}}),t._v(" "),s("img",{attrs:{src:"http://yukiyang.com/blog/080501.jpg",alt:""}})])]),t._v(" "),s("p",[t._v("修改"),s("code",[t._v("Js")]),t._v("内容测试结果，"),s("code",[t._v("Css")]),t._v("没有修改依旧返回304。"),s("code",[t._v("Js")]),t._v("修改导致"),s("code",[t._v("Last-Modified")]),t._v("大于请求中的"),s("code",[t._v("If-Modified-Since")]),t._v("，资源不够新鲜，返回200并返回最新数据。")]),t._v(" "),s("h4",{attrs:{id:"_6-4-总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-4-总结"}},[t._v("#")]),t._v(" 6.4 总结")]),t._v(" "),s("p",[s("code",[t._v("Last-Modified")]),t._v("工作流程如下：\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080545.jpg",alt:""}})]),t._v(" "),s("p",[t._v("一般来说，在没有调整服务器时间和篡改客户端缓存的情况下，这两个"),s("code",[t._v("header")]),t._v("配合起来管理协商缓存是非常可靠的，但是有时候也会服务器上资源其实有变化，但是最后修改时间却没有变化的情况，而这种问题又很不容易被定位出来，而当这种情况出现的时候，就会影响协商缓存的可靠性。所以就有了另外一对"),s("code",[t._v("header")]),t._v("来管理协商缓存，这对header就是【"),s("code",[t._v("ETag")]),t._v("、"),s("code",[t._v("If-None-Match")]),t._v("】")]),t._v(" "),s("h3",{attrs:{id:"_7-etag-和-if-none-match"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-etag-和-if-none-match"}},[t._v("#")]),t._v(" 7. ETag 和 If-None-Match")]),t._v(" "),s("h4",{attrs:{id:"_7-1-etag"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-1-etag"}},[t._v("#")]),t._v(" 7.1 ETag")]),t._v(" "),s("p",[t._v("这个"),s("code",[t._v("header")]),t._v("是服务器根据当前请求的资源生成的一个唯一标识，这个唯一标识是一个字符串，只要资源有变化这个串就不同，所以能很好的补充"),s("code",[t._v("Last-Modified")]),t._v("的问题。\n避免干扰，可以注释"),s("code",[t._v("Last-modified")]),t._v("逻辑。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080604.jpg",alt:""}}),t._v(" "),s("code",[t._v("ETag")]),t._v("的验证也非常简单，只需要再加入一个中间件"),s("code",[t._v("koa-etag")]),t._v("，重启服务测试。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080612.jpg",alt:""}})]),t._v(" "),s("h4",{attrs:{id:"_7-2-etag实践"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-2-etag实践"}},[t._v("#")]),t._v(" 7.2 ETag实践")]),t._v(" "),s("p",[t._v("发出请求，"),s("code",[t._v("response")]),t._v("已有"),s("code",[t._v("Etag")]),t._v("：\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080621.jpg",alt:""}}),t._v("\n下一次请求也会携带"),s("code",[t._v("If-None-Match")]),t._v("为缓存中的"),s("code",[t._v("Etag")]),t._v("值：\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080628.jpg",alt:""}})]),t._v(" "),s("p",[t._v("修改"),s("code",[t._v("Js")]),t._v("资源测试，结果如下：\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080636.jpg",alt:""}}),t._v("\n修改"),s("code",[t._v("Js")]),t._v("资源测试后，导致"),s("code",[t._v("Etag")]),t._v("改变。服务端再验证资源不新鲜，"),s("code",[t._v("Js")]),t._v("资源重新获取，返回200。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080645.jpg",alt:""}}),t._v(" "),s("code",[t._v("Css")]),t._v("没有修改，"),s("code",[t._v("Etag")]),t._v("没变返回304。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080652.jpg",alt:""}})]),t._v(" "),s("p",[s("code",[t._v("Etag")]),t._v("整体流程和"),s("code",[t._v("Last-Modified")]),t._v("保持一致。")]),t._v(" "),s("h4",{attrs:{id:"_7-3-koa-etag源码解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-3-koa-etag源码解析"}},[t._v("#")]),t._v(" 7.3 koa-etag源码解析")]),t._v(" "),s("p",[s("code",[t._v("koa")]),t._v("的"),s("code",[t._v("etag")]),t._v("生成主要2个方法，具体的可以直接去看源码。")]),t._v(" "),s("p",[t._v("（1）根据文件的修改时间和文件大小生成")]),t._v(" "),s("div",{staticClass:"language-javaScript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stattag")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("stat")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" mtime "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" stat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mtime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getTime")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" size "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" stat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\"'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" size "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'-'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" mtime "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\"'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])]),s("p",[t._v("（2）使用"),s("code",[t._v("crypto")]),t._v("库加密生成")]),t._v(" "),s("div",{staticClass:"language-javaScript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("entitytag")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entity"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// fast-path empty")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// compute hash of entity")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" hash "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" crypto\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createHash")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sha1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("update")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entity"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'utf8'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("digest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'base64'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("substring")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("27")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// compute length of entity")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" len "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" entity "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'string'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" Buffer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("byteLength")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entity"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'utf8'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" entity"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\"'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" len"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'-'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" hash "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\"'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br")])]),s("h2",{attrs:{id:"五、新鲜度检测-koa源码解读"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五、新鲜度检测-koa源码解读"}},[t._v("#")]),t._v(" 五、新鲜度检测（Koa源码解读）")]),t._v(" "),s("h3",{attrs:{id:"_1-koa-conditional-get"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-koa-conditional-get"}},[t._v("#")]),t._v(" 1. koa-conditional-get")]),t._v(" "),s("p",[t._v("在前面看到"),s("code",[t._v("koa-conditional-get")]),t._v("可以让协商缓存生效，原因是对资源新鲜度做了304返回的处理。\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080700.jpg",alt:""}}),t._v("\n那么重点来看下"),s("code",[t._v("ctx.fresh")]),t._v("是如何处理的？")]),t._v(" "),s("h3",{attrs:{id:"_2-koa"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-koa"}},[t._v("#")]),t._v(" 2. koa")]),t._v(" "),s("p",[t._v("可以看到Koa在request中的"),s("code",[t._v("fresh")]),t._v("方法如下：\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080712.jpg",alt:""}}),t._v("\n状态码200-300之间以及304调用"),s("code",[t._v("fresh")]),t._v("方法，判断该请求的资源是否新鲜。")]),t._v(" "),s("h3",{attrs:{id:"_3-fresh方法源码解读"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-fresh方法源码解读"}},[t._v("#")]),t._v(" 3. fresh方法源码解读")]),t._v(" "),s("p",[t._v("只保留核心代码，可以自行去看"),s("code",[t._v("fresh")]),t._v("的源码。")]),t._v(" "),s("div",{staticClass:"language-javaSCript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("CACHE_CONTROL_NO_CACHE_REGEXP")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("(?:^|,)\\s*?no-cache\\s*?(?:,|$)")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fresh")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("reqHeaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" resHeaders")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1. 如果这2个字段，一个都没有，不需要校验")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" modifiedSince "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" reqHeaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'if-modified-since'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" noneMatch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" reqHeaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'if-none-match'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("modifiedSince "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("noneMatch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'not fresh'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2. 给端对端测试用的，因为浏览器的Cache-Control: no-cache请求")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//    是不会带if条件的 不会走到这个逻辑")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" cacheControl "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" reqHeaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cache-control'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cacheControl "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("CACHE_CONTROL_NO_CACHE_REGEXP")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cacheControl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3. 比较 etag和if-none-match")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("noneMatch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" noneMatch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" etag "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" resHeaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'etag'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("etag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 部分代码")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("match "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" etag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  \n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 4. 比较if-modified-since和last-modified")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("modifiedSince"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" lastModified "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" resHeaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'last-modified'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" modifiedStale "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("lastModified "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseHttpDate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("lastModified"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseHttpDate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("modifiedSince"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("modifiedStale"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  \n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br"),s("span",{staticClass:"line-number"},[t._v("27")]),s("br"),s("span",{staticClass:"line-number"},[t._v("28")]),s("br"),s("span",{staticClass:"line-number"},[t._v("29")]),s("br"),s("span",{staticClass:"line-number"},[t._v("30")]),s("br"),s("span",{staticClass:"line-number"},[t._v("31")]),s("br"),s("span",{staticClass:"line-number"},[t._v("32")]),s("br"),s("span",{staticClass:"line-number"},[t._v("33")]),s("br"),s("span",{staticClass:"line-number"},[t._v("34")]),s("br"),s("span",{staticClass:"line-number"},[t._v("35")]),s("br"),s("span",{staticClass:"line-number"},[t._v("36")]),s("br"),s("span",{staticClass:"line-number"},[t._v("37")]),s("br"),s("span",{staticClass:"line-number"},[t._v("38")]),s("br"),s("span",{staticClass:"line-number"},[t._v("39")]),s("br"),s("span",{staticClass:"line-number"},[t._v("40")]),s("br"),s("span",{staticClass:"line-number"},[t._v("41")]),s("br"),s("span",{staticClass:"line-number"},[t._v("42")]),s("br")])]),s("p",[s("code",[t._v("fresh")]),t._v("的代码判断逻辑总结如下，满足3种条件之一，"),s("code",[t._v("fresh")]),t._v("为"),s("code",[t._v("true")]),t._v("。")]),t._v(" "),s("p",[s("img",{attrs:{src:"http://yukiyang.com/blog/080724.jpg",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"六、总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#六、总结"}},[t._v("#")]),t._v(" 六、总结")]),t._v(" "),s("p",[t._v("浏览器缓存整体流程如下：\n"),s("img",{attrs:{src:"http://yukiyang.com/blog/080733.jpg",alt:""}})]),t._v(" "),s("ol",[s("li",[t._v("发出请求后，会先在本地查找缓存。")]),t._v(" "),s("li",[t._v("没有缓存去服务端请求最新的资源，返回给客户端（200），并重新进行缓存。")]),t._v(" "),s("li",[t._v("查到有缓存，要判断缓存本地是否过期("),s("code",[t._v("max-age")]),t._v("等)。")]),t._v(" "),s("li",[t._v("没有过期，直接返回给客户端（200 "),s("code",[t._v("from cache")]),t._v("）。")]),t._v(" "),s("li",[t._v("如果缓存过期了，看是否有配置协商缓存（"),s("code",[t._v("etag/last-modified")]),t._v("），去服务端再验证该资源是否更新，本地缓存是否可以继续使用。")]),t._v(" "),s("li",[t._v("如果发现资源可用，返回304，告知客户端可以继续使用缓存，并根据"),s("code",[t._v("max-age")]),t._v("等更新缓存时间。不需要返回数据，加速请求时间。")]),t._v(" "),s("li",[t._v("如果服务端再验证失败，请求最新的资源，返回给客户端（200），并重新进行缓存。")])]),t._v(" "),s("p",[t._v("我们常说的强缓存，其实就是直接在本地缓存获取，也就是"),s("code",[t._v("Cache-Control: max-age")]),t._v("等配置，不需要和服务端沟通。")]),t._v(" "),s("p",[t._v("而协商缓存是在强缓存的基础上，配置"),s("code",[t._v("etag或last-modified")]),t._v("等参数。本地缓存失效后，去服务端进行新鲜度检测。可以避免每次本地缓存过期后都返回最新的数据，造成请求缓慢。")]),t._v(" "),s("h1",{attrs:{id:"七、参考资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#七、参考资料"}},[t._v("#")]),t._v(" 七、参考资料")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://juejin.im/post/6844903672556552205",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端优化：浏览器缓存技术介绍"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://juejin.im/post/6844903763665240072",target:"_blank",rel:"noopener noreferrer"}},[t._v("浏览器缓存"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("书籍《HTTP权威指南》")])]),t._v(" "),s("p",[t._v("本文的源码分析围绕"),s("code",[t._v("koa")]),t._v("，不代表其他服务框架。对这块知识不了解建议实践一下。写错的地方，接受批评指正~")])])}),[],!1,null,null,null);a.default=e.exports}}]);