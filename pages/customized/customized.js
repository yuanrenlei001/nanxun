// pages/customized/customized.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 30.84979,
    longitude: 120.41847,
    loading: true,
    mapShow: false,
    list: [
      {
        name: '历史人文',
        status: true
      },
      {
        name: '水乡漫步',
        status: false
      },
      {
        name: 'AR体验',
        status: false
      },
      {
        name: '艺术演出',
        status: false
      },
      {
        name: '文艺写生',
        status: false
      },
      {
        name: '民风民俗',
        status: false
      },
      {
        name: '网红打卡',
        status: false
      }
    ],
    dayNum:'',
    label:'',
    touristNum:'',
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('user_token')
    this.setData({
      list:'',
      dayNum:'',
      label:'',
    label:'',
    touristNum:'',
    token:token
    })
    this.type();
  },
  // 生成喜好
  type:function(){
    var that = this;
    var url = ''
    var data={

    }
    wx.request({
      url: app.data.request_url+'/api/com/comRoute/getLabelList',
      method: "get",
      data: {},
      dataType: "json",
      header: { 
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer '+that.data.token
       },
      success: res => {
        wx.stopPullDownRefresh();
        var list = res.data.data.data;
        var arr = [];
        console.log(list)
        for(var i=0;i<list.length;i++){
          var obj = {};
            obj['name'] = list[i]
            obj['status'] = false
            arr.push(obj)
        }
        that.setData({
          list:arr
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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

  },
  likeClick: function (e){
    let num = e.currentTarget.dataset.index;
    let label = e.currentTarget.dataset.label;
    let key = 'list['+ num + '].status'
    this.setData({
      [key]: !this.data.list[num].status
    })
    var arr = []
    for(var i=0;i<this.data.list.length;i++){
      
      if(this.data.list[i].status == true){
        arr.push(this.data.list[i].name)
      }
      
    }
    this.setData({
      label:arr.toString()
    })
    console.log(this.data.label)
  },
  dayNumInput:function(e){
    this.setData({
      dayNum:e.detail.value
    })
  },
  touristNumInput:function(e){
    this.setData({
      touristNum:e.detail.value
    })
  },
  saveFun: function (){
    var that = this;
  var url = ''
  var data={
    dayNum:this.data.dayNum,
    touristNum:this.data.touristNum,
    label:this.data.label
  }
  if(data.dayNum == ''){
    app.showToast("游玩天数不能为空！");                                      
  }else if(data.touristNum == ''){
    app.showToast("游玩人数不能为空！");
  }else {
    this.setData({
      loading: false
    })
    setTimeout(()=> {
      this.setData({
        loading: true,
        mapShow: true
      })
        wx.request({
    url: app.data.request_url+'/api/xcx/xcxTravel/add',
    method: "post",
    data: data,
    dataType: "json",
    header: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization':'Bearer '+that.data.token
     },
    success: res => {
      wx.stopPullDownRefresh();
      var id = res.data.message
      wx.request({
        url: app.data.request_url+'/api/xcx/xcxTravel/getById?id='+id,
        method: "get",
        data: {},
        dataType: "json",
        header: { 
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':'Bearer '+that.data.token
         },
        success: res => {
          wx.stopPullDownRefresh();
          
        },
        fail: () => {
          wx.stopPullDownRefresh();
          app.showToast("服务器请求出错");
        }
      });
    },
    fail: () => {
      wx.stopPullDownRefresh();
      app.showToast("服务器请求出错");
    }
  });
    },1000)
  }

      


  }
})