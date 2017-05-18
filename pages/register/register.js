Page({
  data: {
    focus: false,
	index:0,
	array:['中国', '美国', '巴西', '日本'],
	org: ""
  },
	bindPickerChange: function(e) {
	this.setData({
	  index: e.detail.value
	})
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
	  var that = this;
	  wx.request({
      url: 'https://www.whoisyours.cn/AppDemo/org',
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
		  array:res.data
		})
      }
    })

  },
  formSubmit: function (e) {
    var that =  this;
    console.log(e.detail.value.userId.length);
    if (e.detail.value.userId.length<=0){
      wx.showToast({
        title: '请输入账号！',
        icon: 'success',
        duration: 2000
      })
    } else if (e.detail.value.userId.password <= 0) {
      wx.showToast({
        title: '请输入密码！',
        icon: 'success',
        duration: 2000
      })
    } else if (e.detail.value.userId.userName <= 0) {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'success',
        duration: 2000
      })
    }else{
    wx.request({
      url: 'https://www.whoisyours.cn/AppDemo/create',
      data: {
        userid: e.detail.value.userId ,
        pwd: e.detail.value.password,
        org: that.data.array[that.data.index],
        username:e.detail.value.userName
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data == "true"){
           console.log(res.data)
           wx.showToast({
             title: '成功！',
             icon: 'success',
             duration: 2000
           })
           wx.redirectTo({
             url: '../login/login'
          })
        } else if (res.data == "repeat"){
          wx.showToast({
             title: 'ID重复',
             icon: 'success',
             duration: 2000
           })
        }else{
          wx.showToast({
            title: '未知错误，请联系管理员!',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  }
  }
})