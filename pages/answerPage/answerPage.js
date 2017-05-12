Page({
  data: {
    focus: false,
    inputValue: '',
    questions: [],
    index: 0,
    count: 1,
    typeA: 'default',
    typeB: 'default',
    typeC: 'default',
    typeD: 'default',
    isClick : 0,
    trueAnswer:0,
    falseAnswer:0
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  onLoad: function(){
      var appInstance = getApp();
      var that = this;
        wx.request({
            url: 'https://1.1059141989.applinzi.com/getTitle',
            data: {},
            header: {'content-type': 'application/json'},
            success: function(res) {
                console.log(res.data);
                that.setData({
                  questions: res.data
                })
            }
        })
        wx.request({
            url: 'https://1.1059141989.applinzi.com/count',
            data: {userid : appInstance.globalData.userInfo},
            header: {'content-type': 'application/json'},
            success: function(res) {
                console.log(res.data);
                that.setData({
                  count: res.data
                })
            }
        })
    },

  answer1: function (e) {
    if(this.data.isClick==0){
      if(this.data.questions[this.data.index].answer1=="A"){
        this.setData({
          typeA : 'primary',
          isClick:1,
          trueAnswer:this.data.trueAnswer+1
        })
      }else{
        if(this.data.questions[this.data.index].answer2=="B"){
          this.setData({
            typeA : 'warn',
            isClick:1,
            typeB : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
        if(this.data.questions[this.data.index].answer3=="C"){
          this.setData({
            typeA : 'warn',
            isClick:1,
            typeC : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
        if(this.data.questions[this.data.index].answer4=="D"){
          this.setData({
            typeA : 'warn',
            isClick:1,
            typeD : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
      }
    }
  },
  answer2: function (e) {
    if(this.data.isClick==0){
      if(this.data.questions[this.data.index].answer2=="B"){
        this.setData({
          typeB : 'primary',
          isClick:1,
          trueAnswer:this.data.trueAnswer+1
        })
      }else{
       if(this.data.questions[this.data.index].answer1=="A"){
          this.setData({
            typeB : 'warn',
            isClick:1,
            typeA : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
        if(this.data.questions[this.data.index].answer3=="C"){
          this.setData({
            typeB : 'warn',
            isClick:1,
            typeC : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
        if(this.data.questions[this.data.index].answer4=="D"){
          this.setData({
            typeB : 'warn',
            isClick:1,
            typeD : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
      }
    }
  },
  answer3: function (e) {
    if(this.data.isClick==0){
      if(this.data.questions[this.data.index].answer3=="C"){
        this.setData({
          typeC : 'primary',
          isClick:1,
          trueAnswer:this.data.trueAnswer+1
        })
      }else{
        if(this.data.questions[this.data.index].answer1=="A"){
          this.setData({
            typeC : 'warn',
            isClick:1,
            typeA : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
        if(this.data.questions[this.data.index].answer2=="B"){
          this.setData({
            typeC : 'warn',
            isClick:1,
            typeB : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
        if(this.data.questions[this.data.index].answer4=="D"){
          this.setData({
            typeC : 'warn',
            isClick:1,
            typeD : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
      }
    }
  },
  answer4: function (e) {
    if(this.data.isClick==0){
      if(this.data.questions[this.data.index].answer4=="D"){
        this.setData({
          typeD : 'primary',
          isClick:1,
          trueAnswer:this.data.trueAnswer+1
        })
      }else{
        if(this.data.questions[this.data.index].answer1=="A"){
          this.setData({
            typeD : 'warn',
            isClick:1,
            typeA : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
        if(this.data.questions[this.data.index].answer3=="C"){
          this.setData({
            typeD : 'warn',
            isClick:1,
            typeC : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
        if(this.data.questions[this.data.index].answer2=="B"){
          this.setData({
            typeB : 'warn',
            isClick:1,
            typeB : 'primary',
            falseAnswer:this.data.falseAnswer+1
          })
        }
      }
    }
  },
  next: function(e) {
    if(this.data.index != 9){
      var index = this.data.index+1;
      this.setData({
              index:index,
              typeA:'default',
              typeB:'default',
              typeC:'default',
              typeD:'default',
              isClick:0
      })
    }
  },
  submitType: function(e) {
    var appInstance = getApp();
    appInstance.globalData.trueAnswer = this.data.trueAnswer;
    appInstance.globalData.falseAnswer = this.data.falseAnswer;
    wx.request({
      url: 'https://1.1059141989.applinzi.com/result',
      data: {
        userid:appInstance.globalData.userInfo,
        grade:this.data.trueAnswer*10
      },
      header: {'content-type': 'application/json'},
      success: function(res) {
          if(res.data=="true"){
            wx.showToast({
              title: '考试结束！',
              icon: 'success',
              duration: 2000
            })
            wx.redirectTo({
              url: '../result/result'
          })
          }else{
            wx.showToast({
              title: '系统出错，请联系管理员！',
              icon: 'success',
              duration: 2000
            })
          }
      }
   })
  }

})