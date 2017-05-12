Page({
  bindViewTap:function(){
    wx.redirectTo({
        url: '../login/login'
    })
  },

  onLoad: function () {
    setTimeout(function(){
      wx.redirectTo({
        url: '../login/login'
        // url: '../answerPage/answerPage'
        // url: '../result/result'
        // url: '../logs/logs'
      })
    },2000)
  }
})
