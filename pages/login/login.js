// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  get_user_info_event(e) {
    this.user_auth_code(e.detail);
    console.log(e.detail)
  },
  user_auth_code(auth_data) {
    if ((auth_data.encryptedData || null) != null && (auth_data.iv || null) != null) {
      app.user_auth_login(this, 'user_auth_back_event', auth_data);
    } else {
      app.showToast("授权失败");
    }
  },
  user_auth_back_event() {
    var user = app.get_user_cache_info();
    console.log(user)
    this.setData({user: user || null});

    if (app.user_is_need_login(user) == false)
    {
      wx.navigateBack();
    }
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