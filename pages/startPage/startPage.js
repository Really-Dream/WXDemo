Page({
  
  startPage: function(e) {
     wx.navigateTo({
      //  wx.redirectTo({
        url: '../answerPage/answerPage'
      })
  },
  onLoad: function(){
    console.log(wx.getStorageSync('userInfo'));
    console.log("wx.getStorageSync('userId')");
  },
})