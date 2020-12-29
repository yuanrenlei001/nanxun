// pages/tourist-detail/tourist-detail.js
const app = getApp();
var QQmap = require('../../utils/qqmap-wx-jssdk');
var qqmapsdk;
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
    img:null,
    location:'',
    latitude:'',
    longitude:'',
    markers:[]
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
    this.setData({
      id:this.options.id
    })
    this.init()
  },
// 分享
share:function(){
  let url = encodeURIComponent('/pages/tourist-detail/tourist-detail?id='+this.data.id);
 
    return {
      title: "美景详情",
      path:`/pages/index/index?url=${url}` 
    }

},
// 收藏
favorite:function(){
  var that = this;
  var token = wx.getStorageSync('user_token')
  var data = {
    'contentFrom':'comPlace',
    'contentId':that.data.detail.id,
    'contentName':that.data.detail.name,
    'type':'景点'
  }
  wx.request({
    url: app.data.request_url+'/api/xcx/xcxFavorite/add',
    method: "post",
    data: data,
    dataType: "json",
    header: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization':'Bearer '+token
     },
    success: res => {
      wx.stopPullDownRefresh();
      console.log(res.data.code)
      if(res.data.code == '200'){
        app.showToast("收藏成功！",'success');
        that.init();
      }else if(res.data.code == '402'){
        app.showToast("参数检验失败！");
      }else if(res.data.code == '403'){
        app.showToast("没有相关权限！");
      }else if(res.data.code == '500'){
        app.showToast("操作失败！");
      }
      else{
        if(res.data.code =='401'){
          app.get_user_info(this, "favorite");
        }
      }
      
    },
    fail: () => {
      wx.stopPullDownRefresh();
      app.showToast("服务器请求出错");
    }
  });
},
// 取消收藏
unfavorite:function(){
  var that = this;
  var token = wx.getStorageSync('user_token')
  console.log(token)
  var data = {
    'contentFrom':'comPlace',
    'contentId':that.data.detail.id,
    'contentName':that.data.detail.name,
    'type':'景点',
    id:that.data.detail.ifFavorite
  }
  wx.request({
    url: app.data.request_url+'/api/xcx/xcxFavorite/delete',
    method: "delete",
    data: data,
    dataType: "json",
    header: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization':'Bearer '+token
     },
    success: res => {
      wx.stopPullDownRefresh();
      console.log(res.data.data)
      if(res.data.code == '200'){
        app.showToast("取消成功！",'success');
         that.init();
      }else if(res.data.code == '402'){
        app.showToast("参数检验失败！");
      }else if(res.data.code == '403'){
        app.showToast("没有相关权限！");
      }else if(res.data.code == '500'){
        app.showToast("操作失败！");
      }
      else{
        if(res.data.code =='401'){
          app.get_user_info(this, "favorite");
        }
      }
      
    },
    fail: () => {
      wx.stopPullDownRefresh();
      app.showToast("服务器请求出错");
    }
  });
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
  },
  init(){
    var token = wx.getStorageSync('user_token')
    wx.request({
      url: app.data.request_url+'/api/com/comPlace/getById?id='+this.data.id,
      method: "get",
      data: {},
      dataType: "json",
      header: { 
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer '+token
       },
      success: res => {
        wx.stopPullDownRefresh();
        this.setData({
          detail:res.data.data,
          img:res.data.data.pictureUrl.split(','),
          location:res.data.data.address,
          latitude:res.data.data.latitude,
          longitude:res.data.data.longitude,
          markers:[{
            latitude:res.data.data.latitude,
          longitude:res.data.data.longitude,
          }]
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
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function (res) {  //因为这里得到的是你当前位置的经纬度
      console.log(res)
      wx.openLocation({        //所以这里会显示你当前的位置
        latitude: parseFloat(that.data.latitude),
        longitude: parseFloat(that.data.longitude),
        name:that.data.detail.address,
        scale: 18
      });
    }
  })
},


// VR看景
goUrl:function(){
  wx.navigateTo({
    url: '/pages/web/web?url='+this.data.detail.vrUrl,
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