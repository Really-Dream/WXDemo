Page({
  data: {
    focus: false,
    inputValue: '',
    userId:'',
    password:''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },
  onLoad: function(){
    this.setData({
      userId:wx.getStorageSync('userID'),
      password:wx.getStorageSync('password')
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://1.1059141989.applinzi.com/login', //仅为示例，并非真实的接口地址
      data: {
        userid: e.detail.value.userId ,
        pwd: e.detail.value.password
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        if(res.data == "true"){
           console.log(res.data)
           wx.showToast({
             title: '成功！',
             icon: 'success',
             duration: 2000
           })
           var appInstance = getApp();
           appInstance.globalData.userInfo = e.detail.value.userId;
           wx.redirectTo({
            url: '../startPage/startPage'
          })
          wx.setStorage({
            key:"userID",
            data:e.detail.value.userId
          })
          if(e.detail.value.checkbox.length>0){  
            wx.setStorage({
              key:"password",
              data:e.detail.value.password
            })
          }else{
            wx.removeStorage({
              key:"password"
            })
          }
         }else{
          wx.showToast({
             title: '用户名或密码错误！',
             icon: 'success',
             duration: 2000
           })
        }
      }
    })
  },
  register: function(e) {
     wx.navigateTo({
      //  wx.redirectTo({
        url: '../register/register'
      })
  },
})