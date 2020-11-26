// pages/tourist-guide/tourist-guide.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 30.84979,
    longitude: 120.41847,
    zoom:false,
    compass:false,
    scroll:false,
    markers: [{
      id: 1,
      latitude: 30.84979,
    longitude: 120.41847,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 30.84979,
    longitude: 120.41847,
      iconPath: '/image/location.png'
    }, {
      latitude: 30.84979,
    longitude: 120.41847,
      iconPath: '/image/location.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({title: app.data.common_page_title.tourist_guide});
    
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