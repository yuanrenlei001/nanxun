// pages/rg/rg.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      text:'',
      user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title: app.data.common_page_title.rg});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var user = wx.getStorageSync('cache_user_info_key')
    this.setData({
      user:user
    })
  },

  goUrl:function(){
    wx.navigateToMiniProgram({
      appId: 'wx10ffa35365b728b8',
      envVersion:'release'
    })
  },
  // 跳转寻找你 
  goMap:function(){
    wx.switchTab({
      url: '../foryou/index',
    })
  },
  question:function(e){
    var type = e.currentTarget.dataset.type;
    var token = wx.getStorageSync('cache_user_info_key')
    var add = this.data.list
    var that= this;
  console.log(token.userInfo.avatarUrl)
    wx.request({
      url: app.data.request_url+'/api/com/comQa/getAnswerByQuestion?question='+type,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var html = res.data.data;
        var type = html.question;
        var time = html.createTime;
        if(type == '人工服务热线'){
          var data = res.data.data.answer.split(';');
          var arr = []
          var objs = {}
          for(var i=0;i<data.length;i++){
            var obj = {}
            obj['text'] = data[i].split(':')[0]
            obj['tel'] = data[i].split(':')[1]
            arr.push(obj)
          }
          objs['type'] = '人工服务热线';
          objs['time'] = html.createTime;
          objs['phone'] = arr;
          add.push(objs)
        }else {
          var objs = {}
          objs['type'] = '景区开放时间';
          objs['time'] = html.createTime;
          objs['text'] = res.data.data.answer;
          add.push(objs)
        }
        console.log(add)
        that.setData({
          list:add
        })
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  tel:function(e){
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})