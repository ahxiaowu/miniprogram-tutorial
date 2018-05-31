# 第8章 小程序的 API

## 网络

### 说明

**网络API列表：**

| API                                                          | 说明                |
| ------------------------------------------------------------ | ------------------- |
| [wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html) | 发起网络请求        |
| [wx.uploadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network-file.html#wxuploadfileobject) | 上传文件            |
| [wx.downloadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network-file.html#wxdownloadfileobject) | 下载文件            |
| [wx.connectSocket](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxconnectsocketobject) | 创建 WebSocket 连接 |
| [wx.onSocketOpen](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxonsocketopencallback) | 监听 WebSocket 打开 |
| [wx.onSocketError](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxonsocketerrorcallback) | 监听 WebSocket 错误 |
| [wx.sendSocketMessage](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxsendsocketmessageobject) | 发送 WebSocket 消息 |
| [wx.onSocketMessage](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxonsocketmessagecallback) | 接受 WebSocket 消息 |
| [wx.closeSocket](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxclosesocket) | 关闭 WebSocket 连接 |
| [wx.onSocketClose](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxonsocketclosecallback) | 监听 WebSocket 关闭 |

在小程序中使用网络相关的 API 时，需要注意下列问题，请开发者提前了解。



### 发起请求

#### wx.request

