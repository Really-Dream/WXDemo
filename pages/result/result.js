Page({

  data: {
    trueAnswer: 0,
    falseAnswer: 0,
    address:''
  },

    onLoad: function(){
        var appInstance = getApp();
        this.setData({
            trueAnswer:appInstance.globalData.trueAnswer,
            falseAnswer:appInstance.globalData.falseAnswer
        })
          var that = this;
        wx.request({
          url: 'https://www.whoryou.cn/AppDemo/downloadAddress',
            data: {},
            header: {'content-type': 'application/json'},
            success: function(res) {
                console.log(res.data);
                that.setData({
                  address: res.data
                })
            }
        })
    },

  
  
  start: function (e) {
    wx.redirectTo({
        url: '../startPage/startPage'
    })
  },
  share: function (e) {
  },
       onShareAppMessage: function () {
        return {
          title: this.data.address,
          path: '/result/result',
          success: function(res) {
            // 分享成功
          },
          fail: function(res) {
            // 分享失败
          }
        }
      }
})
