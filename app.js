const TOKEN = 'token'
App({
  globalData:{
    token:''
  },
  onLaunch: function () {
    // 从缓存中取出token
    const token = wx.getStorageSync(TOKEN)
    // 判断token是否有值
    if (token && token.length !== 0) {
      //验证token是否过期
      this.check_token(token)
    } else {
      //没有token，进行登录操作
      this.login()
    }
  },
  check_token(token){
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method:'post',
      header:{
        token
      },
      success:(res)=>{
        // token请求是否正确
        if (!res.data.err) {
          this.globalData.token = token
        }else{
        // 不正确，重新登录
          this.login()
        }
      },
      fail:(err)=>{
        console.log(err);
      }
    })
  },
  login(){
    wx.login({
      success:(res)=>{
        // 1.获取token
        const code = res.code
        // 2.讲code传递给服务器
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method:'post',
          data:{
            code
          },
          success:(res)=>{
            // 1.获取token
            const token = res.data.token
            // 2.把token保存到全局变量中
            this.globalData.token = token
            // 3.把token保存到本地，本地存储
            wx.setStorageSync(TOKEN, token)
          } 
        })
      }
    })
  }
})
