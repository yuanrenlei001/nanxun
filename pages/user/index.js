// pages/foryou /index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: app.data.default_user_head_src,
    nickname: "用户名",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({title: app.data.common_page_title.user});
    this.init();
  },
  init(e){
    var user = app.get_user_info(this, "init"),
    self=this;
    console.log(user)
    self.setData({
      avatar: user.userInfo.avatarUrl || app.data.default_user_head_src,
      nickname: user.userInfo.nickName || '用户名',
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  goUrls:function(){
    wx.navigateToMiniProgram({
      appId: 'wx10ffa35365b728b8',
      envVersion:'release'
    })
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