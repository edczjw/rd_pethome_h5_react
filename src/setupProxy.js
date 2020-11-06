// setupProxy.js
/**
 * 设置代理
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/h5', {  //`api`是需要转发的请求
      target: 'http://test.pet.msxiaodai.com',  // 这里是接口服务器地址
      changeOrigin: true, 
    })
  )
}