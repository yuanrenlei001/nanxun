// pages/notice/notice.js
const app = getApp();
var index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:true,
      trendsList:'',
       url:app.data.request_img,
       pageNum:1,
       pageSize:8,
       hasMoreData: true,
       message:'正在加载数据...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const query = wx.createSelectorQuery();
    query.selectAll('.textFour_box').fields({
     size: true,
    }).exec(function (res) {
     let lineHeight = 26; //固定高度值 单位：PX
     for (var i = 0; i < res[0].length; i++) {
      if ((res[0][i].height / lineHeight) > 3) {
       that.data.trendsList[i].auto = true;
       that.data.trendsList[i].seeMore = true;
      }
     }
     that.setData({
      trendsList: that.data.trendsList
     })
    })
  
  },
 //展开更多
 toggleHandler: function (e) {
  var that = this;
  index = e.currentTarget.dataset.index;
  for (var i = 0; i < that.data.trendsList.length; i++) {
   if (index == i) {
    that.data.trendsList[index].auto = true;
    that.data.trendsList[index].seeMore = false;
   }
  }
  that.setData({
   trendsList: that.data.trendsList
  })
 },
 //收起更多
 toggleContent: function (e) {
  var that = this;
  index = e.currentTarget.dataset.index;
  for (var i = 0; i < that.data.trendsList.length; i++) {
   if (index == i) {
    that.data.trendsList[index].auto = true;
    that.data.trendsList[index].seeMore = true;
   }
  }
  that.setData({
   trendsList: that.data.trendsList
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.notice});
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
      url: app.data.request_url+'/api/xcx/xcxNotice/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var list = res.data.data.records;
        var arr = []
        for(var i=0;i<list.length;i++){
          var obj = {};
          obj['auto'] = false;
          obj['seeMore'] = false;
          obj['text'] = list[i].content;
          obj['name'] = list[i].title;
          obj['time'] = list[i].fromTime;
          arr.push(obj)
        }
        
        console.log(arr)
        that.setData({
          trendsList:arr,
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
    url: app.data.request_url+'/api/xcx/xcxNotice/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
    method: "get",
    data: {},
    dataType: "json",
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: res => {
      wx.stopPullDownRefresh();
      var list = res.data.data.records
      var arr = []
      for(var i=0;i<list.length;i++){
        var obj = {};
        obj['auto'] = false;
        obj['seeMore'] = false;
        obj['text'] = list[i].content;
        obj['name'] = list[i].title;
        obj['time'] = list[i].fromTime;
        arr.push(obj)
      }
      
      console.log(arr)
      that.setData({
        trendsList:that.data.trendsList.concat(arr),
      })
      console.log(list)
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