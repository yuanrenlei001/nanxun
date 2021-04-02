// pages/notice-list/notice-list.js
var app  = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLists:[],
    url:app.data.request_img,
    pageNum:1,
    pageSize:8,
    hasMoreData: true,
    message:'正在加载数据...',
    img:null,
    total:0
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.notice_list});
    this.setData({
      pageNum:1
    })
    this.list();
  },
  list(){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that = this;
    wx.request({
      url: app.data.request_url+'/api/xcx/xcxNews/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var list = res.data.data.records;
        that.setData({
          showLists:list
        })
        if(list.length>=pageSize){
          that.setData({
            pageNum:that.data.pageNum+1,
            hasMoreData:true
          })
        }
        
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  // 加载更多
addList(){
  var pageNum = this.data.pageNum;
  var pageSize = this.data.pageSize;
  var that = this;
  console.log(pageNum)
  wx.request({
    url: app.data.request_url+'/api/xcx/xcxNews/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
    method: "get",
    data: {},
    dataType: "json",
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: res => {
      wx.stopPullDownRefresh();
      var list = res.data.data.records;
      // var arr = []
      // for(var i=0;i<list.length;i++){
      //     arr.push(list[i])
      // }
      // that.showLists.push(arr)
      console.log(list)
      that.setData({
        showLists:that.data.showLists.concat(list)
      })
      if(list.length>=pageSize){
        that.setData({
          pageNum:that.data.pageNum+1,
          hasMoreData:true
        })
      }else{
        that.setData({
          hasMoreData:false
        })
      }
      
    },
    fail: () => {
      wx.stopPullDownRefresh();
      app.showToast("服务器请求出错");
    }
  });
},
  // 搜索
  inputTyping:function(e){
    var value  = e.detail.value
    var that = this;
    var pageNum = 1;
    var pageSize = 20;
    var type = this.data.active;
    wx.request({
      url: app.data.request_url+'/api/xcx/xcxNews/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&keyword='+value,
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
          arr.push(img)
        }
      }
      console.log(arr)
      console.log(list)
      that.setData({
        showLists:list,
        img:arr
      })
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  goUrlNews:function(e){
    const url = e.currentTarget.dataset.type; 

    var urls = encodeURIComponent(url);
    // var teacherExamName = e.currentTarget.dataset.workname;
    wx.navigateTo({
      // 跳转到webview页面
      url: '/pages/web/web?url='+urls
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
    if (this.data.hasMoreData) {
      this.addList();
    } else {
        wx.showToast({
            title: '没有更多数据',
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})