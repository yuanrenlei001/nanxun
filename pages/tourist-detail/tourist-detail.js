// pages/tourist-detail/tourist-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../images/xxx.jpg','../../images/xxx.jpg'],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    url:app.data.request_img,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://music.163.com/song/media/outer/url?id=1293886117.mp3',
    detail:null,
    img:null
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this,this.setData({
      id:this.options.id
    })
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.tourist_detail});
    this.init()
  },
  init(){
    wx.request({
      url: app.data.request_url+'/api/com/comPlace/getById?id='+this.data.id,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        this.setData({
          detail:res.data.data,
          img:res.data.data.pictureUrl.split(',')
        })
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },

// 导航
intoMap:function(){
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function (res) {  //因为这里得到的是你当前位置的经纬度
      var latitude = res.latitude
      var longitude = res.longitude
      console.log(res)
      wx.openLocation({        //所以这里会显示你当前的位置
        latitude: latitude,
        longitude: longitude,
        name: "杭州市余杭区良渚街道",
        address:"杭州市余杭区良渚街道",
        scale: 28
      })
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

  }
})