// pages/ar/ar.js
const app = getApp();
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
    message:'正在加载数据...'
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
goAr:function(){
  console.log()
  var type = wx.getSystemInfoSync().platform
  wx.showModal({
    title: '提示',
    content: '为了增强体验效果，建议下载乐游南浔APP哦',
    success(res) {
      
    }
  });
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({title: app.data.common_page_title.ar});
    this.setData({
      showLists:[],
      pageNum:1,
    pageSize:8,
    hasMoreData: true,
    img:null
    })
    this.list();
  },
  list(){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that = this;
    wx.request({
      url: app.data.request_url+'/api/xcx/xcxPropaganda/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&type=AR',
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
  addList(){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that = this;
    console.log(pageNum)
    wx.request({
      url: app.data.request_url+'/api/xcx/xcxPropaganda/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&type=AR',
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var list = res.data.data.records;
        var arr = []
        console.log(arr)
        // var arr = []
        // for(var i=0;i<list.length;i++){
        //     arr.push(list[i])
        // }
        // that.showLists.push(arr)
        console.log(list)
        that.setData({
          showLists:that.data.showLists.concat(list),
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
  wx.request({
    url: app.data.request_url+'/api/xcx/xcxPropaganda/getAll?pageNum=1&pageSize=20&type=AR&keyword='+value,
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