// pages/customized/customized.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 30.84979,
    longitude: 120.41847,
    loading: true,
    mapShow: false,
    list: [
      {
        name: '历史人文',
        status: true
      },
      {
        name: '水乡漫步',
        status: false
      },
      {
        name: 'AR体验',
        status: false
      },
      {
        name: '艺术演出',
        status: false
      },
      {
        name: '文艺写生',
        status: false
      },
      {
        name: '民风民俗',
        status: false
      },
      {
        name: '网红打卡',
        status: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title: '行程订制'});
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

  },
  likeClick: function (e){
    let i = e.currentTarget.dataset.index;
    let key = 'list['+ i + '].status'
    this.setData({
      [key]: !this.data.list[i].status
    })
  },
  saveFun: function (){
    this.setData({
      loading: false
    })
    setTimeout(()=> {
      this.setData({
        loading: true,
        mapShow: true
      })
    },1000)
  }
})