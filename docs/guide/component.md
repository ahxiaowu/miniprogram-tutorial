# 第4章 小程序的组件

## 概念及语法

框架为开发者提供了一系列基础组件，开发者可以通过组合这些基础组件进行快速开发。

什么是组件：

- 组件是视图层的基本组成单元。

- 组件自带一些功能与微信风格的样式。

- 一个组件通常包括`开始标签`和`结束标签`，`属性`用来修饰这个组件，`内容`在两个标签之内。

  ```
  <tagname property="value">
    Content goes here ...
  </tagname>
  ```

  **注意：所有组件与属性都是小写，以连字符-连接**



### 属性类型

| 类型         | 描述           | 注解                                                         |
| ------------ | -------------- | ------------------------------------------------------------ |
| Boolean      | 布尔值         | 组件写上该属性，不管该属性等于什么，其值都为`true`，只有组件上没有写该属性时，属性值才为`false`。如果属性值为变量，变量的值会被转换为Boolean类型 |
| Number       | 数字           | `1`, `2.5`                                                   |
| String       | 字符串         | `"string"`                                                   |
| Array        | 数组           | `[ 1, "string" ]`                                            |
| Object       | 对象           | `{ key: value }`                                             |
| EventHandler | 事件处理函数名 | `"handlerName"` 是 [Page](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html)中定义的事件处理函数名 |
| Any          | 任意属性       |                                                              |



### 共同属性类型

所有组件都有的属性：

| 属性名         | 类型         | 描述           | 注解                                                         |
| -------------- | ------------ | -------------- | ------------------------------------------------------------ |
| id             | String       | 组件的唯一标示 | 保持整个页面唯一                                             |
| class          | String       | 组件的样式类   | 在对应的 WXSS 中定义的样式类                                 |
| style          | String       | 组件的内联样式 | 可以动态设置的内联样式                                       |
| hidden         | Boolean      | 组件是否显示   | 所有组件默认显示                                             |
| data-*         | Any          | 自定义属性     | 组件上触发的事件时，会发送给事件处理函数                     |
| bind* / catch* | EventHandler | 组件的事件     | 详见[事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html) |



### 特殊属性

几乎所有组件都有各自定义的属性，可以对该组件的功能或样式进行修饰，请参考各个[组件](https://developers.weixin.qq.com/miniprogram/dev/component/#%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8)的定义。 



### 组件列表

基础组件分为以下七大类：

**视图容器(View Container)：**

| 组件名                                                       | 说明           |
| ------------------------------------------------------------ | -------------- |
| [view](https://developers.weixin.qq.com/miniprogram/dev/component/view.html) | 视图容器       |
| [scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html) | 可滚动视图容器 |
| [swiper](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html) | 滑块视图容器   |

**基础内容(Basic Content)：**

| 组件名                                                       | 说明   |
| ------------------------------------------------------------ | ------ |
| [icon](https://developers.weixin.qq.com/miniprogram/dev/component/icon.html) | 图标   |
| [text](https://developers.weixin.qq.com/miniprogram/dev/component/text.html) | 文字   |
| [progress](https://developers.weixin.qq.com/miniprogram/dev/component/progress.html) | 进度条 |

**表单(Form)：**

| 标签名                                                       | 说明           |
| ------------------------------------------------------------ | -------------- |
| [button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | 按钮           |
| [form](https://developers.weixin.qq.com/miniprogram/dev/component/form.html) | 表单           |
| [input](https://developers.weixin.qq.com/miniprogram/dev/component/input.html) | 输入框         |
| [checkbox](https://developers.weixin.qq.com/miniprogram/dev/component/checkbox.html) | 多项选择器     |
| [radio](https://developers.weixin.qq.com/miniprogram/dev/component/radio.html) | 单项选择器     |
| [picker](https://developers.weixin.qq.com/miniprogram/dev/component/picker.html) | 列表选择器     |
| [picker-view](https://developers.weixin.qq.com/miniprogram/dev/component/picker-view.html) | 内嵌列表选择器 |
| [slider](https://developers.weixin.qq.com/miniprogram/dev/component/slider.html) | 滚动选择器     |
| [switch](https://developers.weixin.qq.com/miniprogram/dev/component/switch.html) | 开关选择器     |
| [label](https://developers.weixin.qq.com/miniprogram/dev/component/label.html) | 标签           |

**导航(Navigation)：**

| 组件名                                                       | 说明     |
| ------------------------------------------------------------ | -------- |
| [navigator](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) | 应用链接 |

**多媒体(Media)：**

| 组件名                                                       | 说明 |
| ------------------------------------------------------------ | ---- |
| [audio](https://developers.weixin.qq.com/miniprogram/dev/component/audio.html) | 音频 |
| [image](https://developers.weixin.qq.com/miniprogram/dev/component/image.html) | 图片 |
| [video](https://developers.weixin.qq.com/miniprogram/dev/component/video.html) | 视频 |

**地图(Map)：**

| 组件名                                                       | 说明 |
| ------------------------------------------------------------ | ---- |
| [map](https://developers.weixin.qq.com/miniprogram/dev/component/map.html) | 地图 |

**画布(Canvas)：**

| 组件名                                                       | 说明 |
| ------------------------------------------------------------ | ---- |
| [canvas](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html) | 画布 |



## 基础内容

### icon

图标。 

| 属性名 | 类型   | 默认值 | 说明                                                         |
| ------ | ------ | ------ | ------------------------------------------------------------ |
| type   | String |        | icon的类型，有效值：success, success_no_circle, info, warn, waiting, cancel, download, search, clear |
| size   | Number | 23     | icon的大小，单位px                                           |
| color  | Color  |        | icon的颜色，同css的color                                     |

示例：

[在开发者工具中预览效果](wechatide://minicode/LK9tzcmM6QYj)

```html
<view class="group">
  <block wx:for="{{iconSize}}">
    <icon type="success" size="{{item}}"/>
  </block>
</view>

<view class="group">
  <block wx:for="{{iconType}}">
    <icon type="{{item}}" size="40"/>
  </block>
</view>


<view class="group">
  <block wx:for="{{iconColor}}">
    <icon type="success" size="40" color="{{item}}"/>
  </block>
</view>
Page({
  data: {
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  }
})
```

![icon](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/icon.png?t=2018518)



### text

文本。 

| 属性名     | 类型    | 默认值 | 说明         | 最低版本                                                     |
| ---------- | ------- | ------ | ------------ | ------------------------------------------------------------ |
| selectable | Boolean | false  | 文本是否可选 | [1.1.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| space      | String  | false  | 显示连续空格 | [1.4.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| decode     | Boolean | false  | 是否解码     | [1.4.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |



**space 有效值：**

| 值   | 说明                   |
| ---- | ---------------------- |
| ensp | 中文字符空格一半大小   |
| emsp | 中文字符空格大小       |
| nbsp | 根据字体设置的空格大小 |



> Tips:
>
> - decode可以解析的有 `&nbsp;` `&lt;` `&gt;` `&amp;` `&apos;` `&ensp;` `&emsp;`
> - 各个操作系统的空格标准并不一致。
> - `<text/>` 组件内只支持 `<text/>` 嵌套。
> - 除了文本节点以外的其他节点都无法长按选中。
> - 文本换行可以使用转义符 `\n`



示例：

[在开发者工具中预览效果](wechatide://minicode/Egao9cm46gY6)

```html
<view class="btn-area">
  <view class="body-view">
    <text>{{text}}</text>
    <button bindtap="add">add line</button>
    <button bindtap="remove">remove line</button>
  </view>
</view>
var initData = 'this is first line\nthis is second line'
var extraLine = [];
Page({
  data: {
    text: initData
  },
  add: function(e) {
    extraLine.push('other line')
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  remove: function(e) {
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  }
})
```

![text](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/text.png?t=2018518)







### rich-text





### progress

## 视图容器

### view

### scroll-view

### swiper

### movable-view

### cover-view



## 表单组件

### button

### checkbox

### form

### input

### label

### picker

### picker-view

### radio

### slider

### switch

### textarea



## 导航

### navigator

## 媒体组件

### audio

### image

图片。 

| 属性名    | 类型        | 默认值        | 说明                                                         | 最低版本                                                     |
| --------- | ----------- | ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| src       | String      |               | 图片资源地址                                                 |                                                              |
| mode      | String      | 'scaleToFill' | 图片裁剪、缩放的模式                                         |                                                              |
| lazy-load | Boolean     | false         | 图片懒加载。只针对page与scroll-view下的image有效             | [1.5.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| binderror | HandleEvent |               | 当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'} |                                                              |
| bindload  | HandleEvent |               | 当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'} |                                                              |



**注：image组件默认宽度300px、高度225px** 



#### mode 有效值

mode 有 13 种模式，其中 4 种是缩放模式，9 种是裁剪模式。

| 模式 | 值           | 说明                                                         |
| ---- | ------------ | ------------------------------------------------------------ |
| 缩放 | scaleToFill  | 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素  |
| 缩放 | aspectFit    | 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |
| 缩放 | aspectFill   | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
| 缩放 | widthFix     | 宽度不变，高度自动变化，保持原图宽高比不变                   |
| 裁剪 | top          | 不缩放图片，只显示图片的顶部区域                             |
| 裁剪 | bottom       | 不缩放图片，只显示图片的底部区域                             |
| 裁剪 | center       | 不缩放图片，只显示图片的中间区域                             |
| 裁剪 | left         | 不缩放图片，只显示图片的左边区域                             |
| 裁剪 | right        | 不缩放图片，只显示图片的右边区域                             |
| 裁剪 | top left     | 不缩放图片，只显示图片的左上边区域                           |
| 裁剪 | top right    | 不缩放图片，只显示图片的右上边区域                           |
| 裁剪 | bottom left  | 不缩放图片，只显示图片的左下边区域                           |
| 裁剪 | bottom right | 不缩放图片，只显示图片的右下边区域                           |

#### 示例

[在开发者工具中预览效果](wechatide://minicode/8Mc01cmS6WYi)

```html
<view class="page">
  <view class="page__hd">
    <text class="page__title">image</text>
    <text class="page__desc">图片</text>
  </view>
  <view class="page__bd">
    <view class="section section_gap" wx:for="{{array}}" wx:for-item="item">
      <view class="section__title">{{item.text}}</view>
      <view class="section__ctn">
        <image style="width: 200px; height: 200px; background-color: #eeeeee;" mode="{{item.mode}}" src="{{src}}"></image>
      </view>
    </view>
  </view>
</view>
Page({
  data: {
    array: [{
      mode: 'scaleToFill',
      text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    }, { 
      mode: 'aspectFit',
      text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
    }, { 
      mode: 'aspectFill',
      text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
    }, { 
      mode: 'top',
      text: 'top：不缩放图片，只显示图片的顶部区域' 
    }, {      
      mode: 'bottom',
      text: 'bottom：不缩放图片，只显示图片的底部区域'
    }, { 
      mode: 'center',
      text: 'center：不缩放图片，只显示图片的中间区域'
    }, { 
      mode: 'left',
      text: 'left：不缩放图片，只显示图片的左边区域'
    }, { 
      mode: 'right',
      text: 'right：不缩放图片，只显示图片的右边边区域'
    }, { 
      mode: 'top left',
      text: 'top left：不缩放图片，只显示图片的左上边区域' 
    }, { 
      mode: 'top right',
      text: 'top right：不缩放图片，只显示图片的右上边区域'
    }, { 
      mode: 'bottom left',
      text: 'bottom left：不缩放图片，只显示图片的左下边区域'
    }, { 
      mode: 'bottom right',
      text: 'bottom right：不缩放图片，只显示图片的右下边区域'
    }],
    src: '../../resources/cat.jpg'
  },
  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  }
})
```





### video

### camera

### live-player

### live-pusher



## 地图

### map



## 画布

### canvas



## 开放能力

### open-data

### web-view

### ad
