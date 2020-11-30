// pages/for-strategy/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        name: '推荐路线一',
        text: '湖笔文化园 - 申浩科技农场',
        text2: '感受农庄四季美景 品尝江南名肴',
        starStatus: false
      },
      {
        name: '推荐路线二',
        text: '湖笔文化园 - 申浩科技农场',
        text2: '感受农庄四季美景 品尝江南名肴',
        starStatus: false
      },
      {
        name: '推荐路线三',
        text: '湖笔文化园 - 申浩科技农场',
        text2: '感受农庄四季美景 品尝江南名肴',
        starStatus: false
      },
      {
        name: '推荐路线四',
        text: '湖笔文化园 - 申浩科技农场',
        text2: '感受农庄四季美景 品尝江南名肴',
        starStatus: true
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
    // this.getList();
    this.getIDList();
    wx.setNavigationBarTitle({title: app.data.common_page_title.for_strategy});
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
  starShow: function(e) {
    let i = e.currentTarget.dataset.index
    let text = 'list['+i+'].starStatus'
    console.log(text)
    this.setData({
      [text]: true
    })
  },
  starHidder: function (e) {
    let i = e.currentTarget.dataset.index
    let text = 'list['+i+'].starStatus'
    console.log(text)
    this.setData({
      [text]: false
    })
  },
  customizedFun: function(){
    wx.navigateTo({
      url: "../customized/customized"
    })
  },
  /**
   * 初始化获取列表
   */
  getList: function () {
    wx.request({
      url: app.data.request_url+'/api/com/comRoute/getAll?pageNum=1&pageSize=6',
      method: "get",
      dataType: "json",
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        console.log('markers++++',res);
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    })
  },
  /**
   * 根据id获取列表
   */
  getIDList: function () {
    wx.request({
      url: app.data.request_url+'/api/com/comRoute/getById?id=1',
      method: "get",
      dataType: "json",
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        console.log('markers++++',res);
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    })
  }
})