// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    pageSize:10,
    list:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageNum:1,
      list:null,
    })
    this.list();
  },
  list(){
    var that = this;
    wx.request({
      url: app.data.request_url+'/api/com/comPlace/getCurrentTypes',
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var detail = res.data.data.records;
        that.setData({
          // list:detail
        })
        // if(list.length>=pageSize){
        //   that.setData({
        //     pageNum:that.data.pageNum+1,
        //     hasMoreData:true
        //   })
        // }
        
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
    var pageSize = 10;
    wx.request({
      url: app.data.request_url+'/api/com/comPlace/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&keyword='+value,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var list = res.data.data.records;
      // console.log(arr)
      // console.log(list)
      that.setData({
        list:list,
      })
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.search});
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