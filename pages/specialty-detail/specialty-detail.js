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
    pageNum:1,
    pageSize:3,
    hasMoreData: true,
    message:'正在加载数据...',
    showLists:'',
    showListsImg:''
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
    console.log(options)
    this.setData({
      id:this.options.id
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.specialty_detail});
    this.init()
  },
  init(){
    wx.request({
      url: app.data.request_url+'/api/com/comSpecialty/getById?id='+this.data.id,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        if(res.data.data.pictureUrl){
          this.setData({
            detail:res.data.data,
            img:res.data.data.pictureUrl.split(',')
          })
          var list = []
          var len = res.data.data.placeList.length;
          if(len>=3){len =3}
          for(var n=0;n<len;n++){
              list.push(res.data.data.placeList[n])
          }
        var arr = []
        console.log(list)
        for(var i=0;i<list.length;i++){
          if(list[i].pictureUrl){
            var img = list[i].pictureUrl.split(',');
            console.log(img)
            arr.push(img)
          }else{
            arr.push(['/old-town/com/place/defaultStore.jpg'])
          }
        
        }
        console.log(arr)
        this.setData({
          showLists:list,
          showListsImg:arr
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
  list(){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that =this;
    wx.request({
      url: app.data.request_url+'/api/com/comPlace/getAll?type='+'商铺'+'&pageNum='+pageNum+'&pageSize='+pageSize,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var list = res.data.data.records;
        var arr = []
        for(var i=0;i<list.length;i++){
          if(list[i].pictureUrl){
            var img = list[i].pictureUrl.split(',');
            console.log(img)
            arr.push(img)
          }
        
        }
        console.log(arr)
        that.setData({
          showLists:list,
          showListsImg:arr
        })
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  goUrl:function(){
    var list = this.data.detail.placeList
    wx.navigateTo({
      url:'/pages/dp/dp?data='+JSON.stringify(list)
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