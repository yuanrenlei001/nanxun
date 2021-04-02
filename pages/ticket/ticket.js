// pages/tourist-guide/tourist-guide.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baselineShow: false,
    baseLoading: false,
    latitude: 30.84979,
    longitude: 120.41847,
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
    active:'度假酒店,精品民宿',
    showLists:[],
    url:app.data.request_img,
    pageNum:1,
    pageSize:8,
    hasMoreData: true,
    message:'正在加载数据...',
    img:null,
    specialty:null,
    token:'',
    latitude:'',
    longitude:'',
    distance:'',
    mylatitude:'',
    mylongitude:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
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

  /**
   * 生命周期函数--监听页面显示
   */
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
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
           that.setData({
            mylatitude:res.latitude,
            mylongitude:res.longitude,
           })
           console.log(that.data)
          }
        })
        var arr = []
        var arrjl = [];
        setTimeout(function(){
          for(var i=0;i<list.length;i++){
            var _latitude = list[i].latitude;
            var _longitude = list[i].longitude;
            var distance = that.distance(that.data.mylatitude,that.data.mylongitude,_latitude,_longitude);
            arrjl.push(distance)
            if(list[i].pictureUrl){
              var img = list[i].pictureUrl.split(',');
              arr.push(img)
            }
          }
          that.setData({
            showLists:list,
            img:arr,
            distance:arrjl
          })
          if(list.length>=pageSize){
            that.setData({
              pageNum:that.data.pageNum+1,
              hasMoreData:true
            })
          }
        },800)
        
        
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
        var arrjl = []
        for(var i=0;i<list.length;i++){
          var _latitude = list[i].latitude;
            var _longitude = list[i].longitude;
            var distance = that.distance(that.data.mylatitude,that.data.mylongitude,_latitude,_longitude);
            arrjl.push(distance)
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
          img:that.data.img.concat(arr),
          distance:that.data.distance.concat(arrjl),
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



  sort:function(e){
    this.setData({
      baselineShow: false,
      baseLoading: false,
      active:e.currentTarget.dataset.type,
      specialty:null,
      pageNum:1,
      pageSize:8,
      hasMoreData: true,
      img:null,
      showLists:''
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
      this.setData({
        baseLoading: true
      })
      this.addList();
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