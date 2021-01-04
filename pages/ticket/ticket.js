// pages/tourist-guide/tourist-guide.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    zoom:false,
    compass:false,
    scroll:false,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }],
    active:'度假酒店',
    showLists:[],
    url:app.data.request_img,
    pageNum:1,
    pageSize:8,
    hasMoreData: true,
    message:'正在加载数据...',
    img:null,
    specialty:null,
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({title: app.data.common_page_title.ticket});
    var token = wx.getStorageSync('user_token')
    this.setData({
      specialty:null,
      pageNum:1,
    pageSize:8,
    hasMoreData: true,
    img:null,
    token:token
    })
    this.list(this.data.active);
  },
  // 餐馆/酒吧
  list:function(e){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that = this;
    var url = ''
    // if(e == '特产'){
    //    url = app.data.request_url+'/api/com/comSpecialty/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&type='+e
    // }else{
    //   url = 
    // }
    wx.request({
      url: app.data.request_url+'/api/com/comPlace/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&type='+e,
      method: "get",
      data: {},
      dataType: "json",
      header: { 
        'content-type': 'application/x-www-form-urlencoded',
       },
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
        that.setData({
          showLists:list,
          img:arr
        })
        console.log(arr)
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
    var e = this.data.active;
    console.log(pageNum)
    wx.request({
      url:app.data.request_url+'/api/com/comPlace/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&type='+e,
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
        })
        console.log(this.data.showLists)
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



  sort:function(e){
    this.setData({
      active:e.currentTarget.dataset.type,
      specialty:null,
      pageNum:1,
      pageSize:8,
      hasMoreData: true,
      img:null
    })
      this.list(e.currentTarget.dataset.type)
    
  },
  // 搜索
  inputTyping:function(e){
    var value  = e.detail.value
    var that = this;
    var url = null;
    var pageNum = 1;
    var pageSize = 20;
    var type = this.data.active;
    if(type !== '特产'){
      url = app.data.request_url+'/api/com/comPlace/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&type='+type+'&keyword='+value
    }else{
      url = app.data.request_url+'/api/com/comSpecialty/getAll?pageNum='+pageNum+'&pageSize='+pageSize+'&type=特产'+'&keyword='+value
    }
    wx.request({
      url: url,
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