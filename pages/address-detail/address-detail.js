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
    id:null,
    detail:null,
    url:app.data.request_img,
    img:null,
    location:'',
    latitude:'',
    longitude:'',
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.address_detail});
    this.init();
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
        if(res.data.data.pictureUrl){
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