// pages/tourist-detail/tourist-detail.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../images/xxx.jpg','../../images/xxx.jpg'],
    indicatorDots: true,
    url:app.data.request_img,
    autoplay: true,
    interval: 3000,
    duration: 500,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://music.163.com/song/media/outer/url?id=1293886117.mp3',
    id:null,
    detail:null,
    img:null,
    distance:'',
    latitude:'',
    longitude:'',
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
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.show_detail});
    this.init()
  },
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  },
  init(){
    var that =this;
    wx.request({
      url: app.data.request_url+'/api/com/comActivity/getById?id='+this.data.id,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var _latitude = res.data.data.latitude;
          var _longitude = res.data.data.longitude;
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              console.log("当前坐标信息：", res)
             var distance = that.distance(res.latitude, res.longitude,_latitude,_longitude);
             that.setData({
              distance:distance
             })
             console.log(distance)
            }
          })
          var jwd = util.wgs84togcj02(res.data.data.longitude,res.data.data.latitude);
        this.setData({
          detail:res.data.data,
          latitude:jwd[1],
          longitude:jwd[0],
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
  var that = this;
  let obj = that.data.detail;
  obj['type'] = '演出点'
  app.globalData.mapDate = obj
  wx.switchTab({
    url: '../foryou/index',
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