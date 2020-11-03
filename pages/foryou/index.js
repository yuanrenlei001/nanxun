// pages/foryou/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 116.411885,
    latitude: 39.92392,
    shouAll: false,
    modelShow: false,
    scale: 16,
    markers1: [],
    markers: [
      {
        id: 0,
        iconPath: "../../images/map/hotel.png",
        longitude: 116.411885,
        latitude: 39.92492,
        // title: "小何饭店1",
        label:{
          content: '金宅',
          color: '#333',
          fontSize: 20,
          textAlign: "center",
          // anchorX: -10,
          anchorY: -70
        },
        width: 31,
        height: 38
      },
      {
        id: 1,
        iconPath: "../../images/map/hotel.png",
        longitude: 116.411885,
        latitude: 39.92392,
        label:{
          content: '小何饭店',
          color: '#333',
          fontSize: 20,
          textAlign: "center",
          // anchorX: -10,
          anchorY: -70
        },
        // title: "小何饭店2",
        width: 31,
        height: 38
      }
    ]
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.for_you});
    const myMap = wx.createMapContext('map', this);
    // myMap.addMarkers({
    //   markers:list
    // })
    myMap.getCenterLocation({
      success: (res)=>{
        console.log("zhongxindian", res);
      }
    })
    myMap.getScale({
      success: (res)=>{
        console.log(res)
      }
    })
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

  },
  // 展开
  showAllFun: function(){
    this.setData({
      shouAll: true
    })
  },
  // 关闭
  closeFun: function(){
    this.setData({
      shouAll: false
    })
  },
  // markers点击
  gotohere: function(e){
    console.log(e)
    wx.hideTabBar()
    this.setData({
      modelShow: true
    })
    // wx.showTabBar() modelShow
  },
  shouTabBar: function(){
    wx.showTabBar()
    this.setData({
      modelShow: false
    })
  },
  mapclick: function(e){
    if(!this.data.modelShow) return;
    wx.showTabBar()
    this.setData({
      modelShow: false
    })
  }
})