// pages/specialty/specialty.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLists:[],
    baselineShow: false,
    baseLoading: false,
    url:app.data.request_img,
    pageNum:1,
    pageSize:8,
    hasMoreData: true,
    message:'正在加载数据...',
    img:null,
    specialty:null
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.specialty});
    this.setData({
      specialty:null,
      pageNum:1,
    pageSize:8,
    hasMoreData: true,
    img:null
    })
    this.specialtys();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 特产
  specialtys:function(){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that = this;
    var url = ''
    wx.request({
      url: app.data.request_url+'/api/com/comSpecialty/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
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
          img:arr
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
// 特产加载更多
addTC(){
  var pageNum = this.data.pageNum;
  var pageSize = this.data.pageSize;
  var that = this;
  console.log(pageNum)
  wx.request({
    url:app.data.request_url+'/api/com/comSpecialty/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&type=特产',
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
      // var arr = []
      // for(var i=0;i<list.length;i++){
      //     arr.push(list[i])
      // }
      // that.showLists.push(arr)
      console.log(list)
      that.setData({
        showLists:that.data.showLists.concat(list),
        img:that.data.img.concat(img),
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
      this.setData({
        baseLoading: false
      })
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
    var type = '';
    wx.request({
      url: app.data.request_url+'/api/com/comSpecialty/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&keyword='+value,
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
      this.setData({
        baseLoading: true
      })
      this.addTC();
    } else {
      this.setData({
        baselineShow: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})