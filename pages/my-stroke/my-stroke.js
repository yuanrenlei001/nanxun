// pages/my-stroke/my-stroke.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'',
    token:'',
    pageNum:1,
    pageSize:10,
    url:app.data.request_img,
    showLists:''
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
    wx.setNavigationBarTitle({title: app.data.common_page_title.my_stroke});
   var that =this
    wx.getStorage({
      key: 'active',
      success: function(res){
        // success
        console.log(res)
        that.setData({
          active:res.data
        })
      },
      fail:function(res){
        console.log(res)
        that.setData({
          active:type
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that =this;
    var token = wx.getStorageSync('user_token');
    console.log(token)
    this.setData({
    token:token
    })
    wx.getStorage({
      key: 'active',
      success: function(res){
        // success
        console.log(res)
        that.setData({
          active:res.data
        })
        that.list(res.data);
      },
      fail:function(res){
        console.log(res)
        that.list('经典游线');
      }
    })
    
  },
  sort:function(e){
    let type = e.currentTarget.dataset.type;
    wx.setStorageSync('active',type)
    this.setData({
      active:type,
      showLists:''
    })
    this.list(type);
    // if(e.currentTarget.dataset.type == '全部行程'){
    //   // this.specialtys('特产')
    // }else{
    //   this.list(e.currentTarget.dataset.type)
    // }
    
  },
  list:function(e){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that = this;
    var url = ''
    console.log(this.data.token)
    if(e == '经典游线'){
       url = app.data.request_url+'/api/xcx/xcxFavorite/getSelf?pageNum='+pageNum+'&pageSize='+pageSize+'&type='+this.data.active
    }else{
      url = app.data.request_url+'/api/xcx/xcxTravel/getSelf?pageNum='+pageNum+'&pageSize='+pageSize+'&type='+this.data.active
    }
    wx.request({
      url: url,
      method: "get",
      data: {},
      dataType: "json",
      header: { 
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer '+this.data.token
       },
      success: res => {
        wx.stopPullDownRefresh();
        if(res.data.code =='401'){
          app.user_login_copy(this, "favorite");
        }else{
          var list = res.data.data.records;
          console.log(list)
          that.setData({
            showLists:list,
          })
        }
      
        
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  goDetail(e){
    let id  = e.currentTarget.dataset.type;
    console.log(this.data.active)
    if(this.data.active == '经典游线'){
      wx.navigateTo({
            url: '../customizedDetail/customizedDetail?id='+id,
          })
    }else{
      wx.navigateTo({
        url: '../customizedDetail2/customizedDetail2?id='+id,
      })
    }
    
    
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