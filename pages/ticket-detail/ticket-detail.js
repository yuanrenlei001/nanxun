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
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://music.163.com/song/media/outer/url?id=1293886117.mp3',
    id:null,
    detail:null,
    url:app.data.request_img,
    sort:''
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
      id:this.options.id,
      sort:this.options.sort
    })
    this.init()
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.ticket_detail});
    
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
        if(res.data.data.pictureUrl){
          this.setData({
            detail:res.data.data,
            img:res.data.data.pictureUrl.split(',')
          })
        }else{
          app.showToast("轮播图未上传！");
        }
        
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  // 拨打电话
  phone:function(){
    var phone = this.data.detail.tel;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  // 分享
share:function(){
  let url = encodeURIComponent('/pages/food-detail/food-detail?id='+this.data.id);
 
    return {
      title: "美食餐饮",
      path:`/pages/index/index?url=${url}` 
    }

},
// 导航
intoMap:function(){
  var that = this;
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function (res) {  //因为这里得到的是你当前位置的经纬度
      wx.openLocation({        //所以这里会显示你当前的位置
        latitude: parseFloat(that.data.latitude),
        longitude: parseFloat(that.data.longitude),
        name:that.data.detail.address,
        scale: 18
      });
    }
  })
},
// 收藏
favorite:function(){
  var that = this;
  var token = wx.getStorageSync('user_token')
  console.log(token)
  var data = {
    'contentFrom':'comPlace',
    'contentId':that.data.detail.id,
    'contentName':that.data.detail.name,
    'type':that.data.sort,
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
      else if(res.data.code == '500'){
        app.showToast("操作失败！");
      }
      else{
        if(res.data.code =='401'){
          console.log(1)
          app.user_auth_login(this,'favorite')
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
    'type':that.data.sort,
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
      if(res.data.code = '200'){
        app.showToast("取消成功！",'success');
        that.init();
      }else if(res.data.code = '402'){
        app.showToast("参数检验失败！");
      }else if(res.data.code = '403'){
        app.showToast("没有相关权限！");
      }else if(res.data.code = '500'){
        app.showToast("操作失败！");
      }
      else{
        if(res.data.code =='401'){
          app.user_auth_login(this,'favorite')
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