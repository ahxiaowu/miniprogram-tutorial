# 第7章 小程序的模板逻辑

## 数据绑定

WXML 中的动态数据均来自对应 Page 的 data。 

###  简单绑定

#### 内容

```xml
<view> {{ message }} </view>
```

```javascript
Page({
  data: {
    message: 'Hello MINA!'
  }
})
```

#### 组件属性

```xml
<view id="item-{{id}}"> </view>
```

```javascript
Page({
  data: {
    id: 0
  }
})
```



#### 控制属性

```xml
<view wx:if="{{condition}}"> </view>
```

```javascript
Page({
  data: {
    condition: true
  }
})
```



#### 关键字

`true`：boolean 类型的 true，代表真值。

`false`： boolean 类型的 false，代表假值。

```xml
<checkbox checked="{{false}}"> </checkbox>
```

**特别注意：不要直接写 checked="false"，其计算结果是一个字符串，转成 boolean 类型后代表真值。**



### 运算

可以在 `{{}}` 内进行简单的运算，支持的有如下几种方式： 

#### 三元运算

```xml
<view hidden="{{flag ? true : false}}"> Hidden </view>
```



#### 算数运算

```xml
<view> {{a + b}} + {{c}} + d </view>
```

```javascript
Page({
  data: {
    a: 1,
    b: 2,
    c: 3
  }
})
```

view中的内容为 `3 + 3 + d`。

#### 逻辑判断

```xml
<view wx:if="{{length > 5}}"> </view>
```



#### 字符串运算

```xml
<view>{{"hello" + name}}</view>
```

```javascript
Page({
  data:{
    name: 'MINA'
  }
})
```



#### 数据路径运算

```xml
<view>{{object.key}} {{array[0]}}</view>
```

```javascript
Page({
  data: {
    object: {
      key: 'Hello '
    },
    array: ['MINA']
  }
})
```



### 组合

也可以在 Mustache 内直接进行组合，构成新的对象或者数组。 

#### 数组

```xml
<view wx:for="{{[zero, 1, 2, 3, 4]}}"> {{item}} </view>
```

```javascript
Page({
  data: {
    zero: 0
  }
})
```

最终组合成数组`[0, 1, 2, 3, 4]`。 

#### 对象

```xml
<template is="objectCombine" data="{{for: a, bar: b}}"></template>
```

```javascript
Page({
  data: {
    a: 1,
    b: 2
  }
})
```

最终组合成的对象是 `{for: 1, bar: 2}` 



也可以用扩展运算符 `...` 来将一个对象展开 

```xml
<template is="objectCombine" data="{{...obj1, ...obj2, e: 5}}"></template>
```

```javascript
Page({
  data: {
    obj1: {
      a: 1,
      b: 2
    },
    obj2: {
      c: 3,
      d: 4
    }
  }
})
```

最终组合成的对象是 `{a: 1, b: 2, c: 3, d: 4, e: 5}`。



如果对象的 key 和 value 相同，也可以间接地表达。

```xml
<template is="objectCombine" data="{{foo, bar}}"></template>
```

```javascript
Page({
  data: {
    foo: 'my-foo',
    bar: 'my-bar'
  }
})
```

最终组合成的对象是 `{foo: 'my-foo', bar:'my-bar'}`。 



**注意：**上述方式可以随意组合，但是如有存在变量名相同的情况，后边的会覆盖前面，如： 

```xml
<template is="objectCombine" data="{{...obj1, ...obj2, a, c: 6}}"></template>
```

```javascript
Page({
  data: {
    obj1: {
      a: 1,
      b: 2
    },
    obj2: {
      b: 3,
      c: 4
    },
    a: 5
  }
})
```

最终组合成的对象是 `{a: 5, b: 3, c: 6}`。 



**注意：** 花括号和引号之间如果有空格，将最终被解析成为字符串 

```xml
<view wx:for="{{[1,2,3]}} ">
  {{item}}
</view>
```

等同于

```xml
<view wx:for="{{[1,2,3] + ' '}}">
  {{item}}
</view>
```



## 列表渲染

### `wx:for`

在组件上使用 `wx:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。

默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item`

```xml
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>
```

```javascript
Page({
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})
```

使用 `wx:for-item` 可以指定数组当前元素的变量名，

使用 `wx:for-index` 可以指定数组当前下标的变量名：

```xml
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```

`wx:for` 也可以嵌套，下边是一个九九乘法表

```xml
<view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="i">
  <view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="j">
    <view wx:if="{{i <= j}}">
      {{i}} * {{j}} = {{i * j}}
    </view>
  </view>
</view>
```



### `wx:for` 和 `block`

类似 `block wx:if`，也可以将 `wx:for` 用在`<block/>`标签上，以渲染一个包含多节点的结构块。例如：

```xml
<block wx:for="{{[1, 2, 3]}}">
  <view> {{index}}: </view>
  <view> {{item}} </view>
</block>
```



### `wx:key`

如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 `<input/>` 中的输入内容，`<switch/>` 的选中状态），需要使用 `wx:key` 来指定列表中项目的唯一的标识符。

`wx:key` 的值以两种形式提供

1. 字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
2. 保留关键字 `*this` 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字，如：

当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

**如不提供 wx:key，会报一个 warning， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。**

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/tpg5tKmv6kZt)

```xml
<switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;"> {{item.id}} </switch>
<button bindtap="switch"> Switch </button>
<button bindtap="addToFront"> Add to the front </button>

<switch wx:for="{{numberArray}}" wx:key="*this" style="display: block;"> {{item}} </switch>
<button bindtap="addNumberToFront"> Add to the front </button>
```

```javascript
Page({
  data: {
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4]
  },
  switch: function(e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function(e){
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})
```

**注意：**

当 `wx:for` 的值为字符串时，会将字符串解析成字符串数组

```xml
<view wx:for="array">
  {{item}}
</view>
```

等同于

```xml
<view wx:for="{{['a','r','r','a','y']}}">
  {{item}}
</view>
```



**注意：** 花括号和引号之间如果有空格，将最终被解析成为字符串

```xml
<view wx:for="{{[1,2,3]}} ">
  {{item}}
</view>
```

等同于

```xml
<view wx:for="{{[1,2,3] + ' '}}" >
  {{item}}
</view>
```



## 条件渲染

### `wx:if`

在框架中，使用 `wx:if="{{condition}}"` 来判断是否需要渲染该代码块：

```xml
<view wx:if="{{condition}}"> True </view>
```

也可以用 `wx:elif` 和 `wx:else` 来添加一个 else 块：

```xml
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>
```

### `wx:if` 和 `block`

因为 `wx:if` 是一个控制属性，需要将它添加到一个标签上。如果要一次性判断多个组件标签，可以使用一个 `<block/>` 标签将多个组件包装起来，并在上边使用 `wx:if` 控制属性。

```xml
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```

**注意：** `<block/>` 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。



### `hidden`

所有的组件都有一个属性 `hidden`，用来指定组件是否显示。该属性默认是 `false`，也就是所有组件默认是显示状态。也可以手动修改其值为 `true` 让组件隐藏。

```xml
<view hidden="{{num > 5}}"> Hidden </view>
```

```javascript
Page({
  data: {
    num: 10
  }
})
```



### `wx:if` VS `hidden`

因为 `wx:if` 之中的模板也可能包含数据绑定，所有当 `wx:if` 的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。

同时 `wx:if` 也是**惰性的**，如果在初始渲染条件为 `false`，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。

相比之下，`hidden` 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。

一般来说，`wx:if` 有更高的切换消耗而 `hidden` 有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用 `hidden` 更好，如果在运行时条件不大可能改变则 `wx:if` 较好。



> Tips:
>
> - `wx:if` 和 `hidden` 类似于 Vue 中的 `v-if`、`v-show` 的区别



## 模板

## 事件

### 基本使用

- 在组件中绑定一个事件处理函数。

如`bindtap`，当用户点击该组件的时候会在该页面对应的Page中找到相应的事件处理函数。

```xml
<view id="tapTest" data-hi="WeChat" bindtap="tapName"> Click me! </view>
```

- 在相应的Page定义中写上相应的事件处理函数，参数是event。

```javascript
Page({
  tapName: function(event) {
    console.log(event)
  }
})
```

### 事件分类

事件分为冒泡事件和非冒泡事件：

1. 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
2. 非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。

WXML的冒泡事件列表：

| 类型               | 触发条件                                                     | 最低版本                                                     |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| touchstart         | 手指触摸动作开始                                             |                                                              |
| touchmove          | 手指触摸后移动                                               |                                                              |
| touchcancel        | 手指触摸动作被打断，如来电提醒，弹窗                         |                                                              |
| touchend           | 手指触摸动作结束                                             |                                                              |
| tap                | 手指触摸后马上离开                                           |                                                              |
| longpress          | 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 | [1.5.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| longtap            | 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）     |                                                              |
| transitionend      | 会在 WXSS transition 或 wx.createAnimation 动画结束后触发    |                                                              |
| animationstart     | 会在一个 WXSS animation 动画开始时触发                       |                                                              |
| animationiteration | 会在一个 WXSS animation 一次迭代结束时触发                   |                                                              |
| animationend       | 会在一个 WXSS animation 动画完成时触发                       |                                                              |
| touchforcechange   | 在支持 3D Touch 的 iPhone 设备，重按时会触发                 | [1.9.90](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |

**注：除上表之外的其他组件自定义事件如无特殊声明都是非冒泡事件，如<form/>的submit事件，<input/>的input事件，<scroll-view/>的scroll事件，(详见各个组件)**



### 事件绑定和冒泡

事件绑定的写法同组件的属性，以 key、value 的形式。

- key 以`bind`或`catch`开头，然后跟上事件的类型，如`bindtap`、`catchtouchstart`。自基础库版本 [1.5.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)起，`bind`和`catch`后可以紧跟一个冒号，其含义不变，如`bind:tap`、、`catch:touchstart`。
- value 是一个字符串，需要在对应的 Page 中定义同名的函数。不然当触发事件的时候会报错。

`bind`事件绑定不会阻止冒泡事件向上冒泡，`catch`事件绑定可以阻止冒泡事件向上冒泡。

如在下边这个例子中，点击 inner view 会先后调用`handleTap3`和`handleTap2`(因为tap事件会冒泡到 middle view，而 middle view 阻止了 tap 事件冒泡，不再向父节点传递)，点击 middle view 会触发`handleTap2`，点击 outer view 会触发`handleTap1`。

```xml
<view id="outer" bindtap="handleTap1">
  outer view
  <view id="middle" catchtap="handleTap2">
    middle view
    <view id="inner" bindtap="handleTap3">
      inner view
    </view>
  </view>
</view>
```



### 事件的捕获阶段

自基础库版本 [1.5.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 起，触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。需要在捕获阶段监听事件时，可以采用`capture-bind`、`capture-catch`关键字，后者将中断捕获阶段和取消冒泡阶段。

在下面的代码中，点击 inner view 会先后调用`handleTap2`、`handleTap4`、`handleTap3`、`handleTap1`。

```xml
<view id="outer" bind:touchstart="handleTap1" capture-bind:touchstart="handleTap2">
  outer view
  <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
    inner view
  </view>
</view>
```

如果将上面代码中的第一个`capture-bind`改为`capture-catch`，将只触发`handleTap2`。

```xml
<view id="outer" bind:touchstart="handleTap1" capture-catch:touchstart="handleTap2">
  outer view
  <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
    inner view
  </view>
</view>
```



### 事件对象

如无特殊说明，当组件触发事件时，逻辑层绑定该事件的处理函数会收到一个事件对象。

**BaseEvent 基础事件对象属性列表：**

| 属性                                                         | 类型    | 说明                           |
| ------------------------------------------------------------ | ------- | ------------------------------ |
| [type](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#type) | String  | 事件类型                       |
| [timeStamp](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#timeStamp) | Integer | 事件生成时的时间戳             |
| [target](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#target) | Object  | 触发事件的组件的一些属性值集合 |
| [currentTarget](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#currenttarget) | Object  | 当前组件的一些属性值集合       |

**CustomEvent 自定义事件对象属性列表（继承 BaseEvent）：**

| 属性                                                         | 类型   | 说明       |
| ------------------------------------------------------------ | ------ | ---------- |
| [detail](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#detail) | Object | 额外的信息 |

**TouchEvent 触摸事件对象属性列表（继承 BaseEvent）：**

| 属性                                                         | 类型  | 说明                                         |
| ------------------------------------------------------------ | ----- | -------------------------------------------- |
| [touches](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#touches) | Array | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
| [changedTouches](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#changedTouches) | Array | 触摸事件，当前变化的触摸点信息的数组         |

**特殊事件： <canvas/> 中的触摸事件不可冒泡，所以没有 currentTarget。**

#### type

代表事件的类型。 

#### timeStamp

页面打开到触发事件所经过的毫秒数。 

#### target

触发事件的源组件。 

| 属性                                                         | 类型   | 说明                                            |
| ------------------------------------------------------------ | ------ | ----------------------------------------------- |
| id                                                           | String | 事件源组件的id                                  |
| tagName                                                      | String | 当前组件的类型                                  |
| [dataset](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#dataset) | Object | 事件源组件上由`data-`开头的自定义属性组成的集合 |

#### currentTarget

事件绑定的当前组件。 

| 属性                                                         | 类型   | 说明                                          |
| ------------------------------------------------------------ | ------ | --------------------------------------------- |
| id                                                           | String | 当前组件的id                                  |
| tagName                                                      | String | 当前组件的类型                                |
| [dataset](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#dataset) | Object | 当前组件上由`data-`开头的自定义属性组成的集合 |

**说明： target 和 currentTarget 可以参考上例中，点击 inner view 时，handleTap3 收到的事件对象 target 和 currentTarget 都是 inner，而 handleTap2 收到的事件对象 target 就是 inner，currentTarget 就是 middle。** 



##### dataset

在组件中可以定义数据，这些数据将会通过事件传递给 SERVICE。 书写方式： 以`data-`开头，多个单词由连字符`-`链接，不能有大写(大写会自动转成小写)如`data-element-type`，最终在 event.currentTarget.dataset 中会将连字符转成驼峰`elementType`。

**示例：**

```xml
<view data-alpha-beta="1" data-alphaBeta="2" bindtap="bindViewTap"> DataSet Test </view>
Page({
  bindViewTap:function(event){
    event.currentTarget.dataset.alphaBeta === 1 // - 会转为驼峰写法
    event.currentTarget.dataset.alphabeta === 2 // 大写会转为小写
  }
})
```



#### touches

touches 是一个数组，每个元素为一个 Touch 对象（canvas 触摸事件中携带的 touches 是 CanvasTouch 数组）。 表示当前停留在屏幕上的触摸点。

##### Touch 对象

| 属性             | 类型   | 说明                                                         |
| ---------------- | ------ | ------------------------------------------------------------ |
| identifier       | Number | 触摸点的标识符                                               |
| pageX, pageY     | Number | 距离文档左上角的距离，文档的左上角为原点 ，横向为X轴，纵向为Y轴 |
| clientX, clientY | Number | 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为X轴，纵向为Y轴 |

##### CanvasTouch 对象

| 属性       | 类型   | 说明                                                         | 特殊说明 |
| ---------- | ------ | ------------------------------------------------------------ | -------- |
| identifier | Number | 触摸点的标识符                                               |          |
| x, y       | Number | 距离 Canvas 左上角的距离，Canvas 的左上角为原点 ，横向为X轴，纵向为Y轴 |          |

##### changedTouches

changedTouches 数据格式同 touches。 表示有变化的触摸点，如从无变有（touchstart），位置变化（touchmove），从有变无（touchend、touchcancel）。

##### detail

自定义事件所携带的数据，如表单组件的提交事件会携带用户的输入，媒体的错误事件会携带错误信息，详见[组件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/wxml/wxml-component.md)定义中各个事件的定义。

点击事件的`detail` 带有的 x, y 同 pageX, pageY 代表距离文档左上角的距离。



## 引用

## WXS

### 模块

### 变量

### 注释

### 运算符

### 语句

### 数据类型

### 基础类库
