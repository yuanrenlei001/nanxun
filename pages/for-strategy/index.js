// pages/for-strategy/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        name: '推荐路线一',
        text: '湖笔文化园 - 申浩科技农场',
        text2: '感受农庄四季美景 品尝江南名肴',
        starStatus: false
      },
      {
        name: '推荐路线二',
        text: '湖笔文化园 - 申浩科技农场',
        text2: '感受农庄四季美景 品尝江南名肴',
        starStatus: false
      },
      {
        name: '推荐路线三',
        text: '湖笔文化园 - 申浩科技农场',
        text2: '感受农庄四季美景 品尝江南名肴',
        starStatus: false
      },
      {
        name: '推荐路线四',
        text: '湖笔文化园 - 申浩科技农场',
        text2: '感受农庄四季美景 品尝江南名肴',
        starStatus: true
      }
    ],
    showLists:[],
    url:app.data.request_img,
    pageNum:1,
    pageSize:8,
    hasMoreData: false,
    message:'正在加载数据...',
    img:null,
    total:0,
    baselineShow: false,
    baseLoading: false,
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
    // this.getList();
    wx.setNavigationBarTitle({title: app.data.common_page_title.for_strategy});
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
      url: app.data.request_url+'/api/com/comRoute/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
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
        if(list.total>=pageSize){

          this.setData({
            pageNum:this.data.pageNum+1,
            hasMoreData:true
          })
        }else{
          this.setData({
            baselineShow: true
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
    url: app.data.request_url+'/api/com/comRoute/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
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
      this.setData({
        baselineShow: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  starShow: function(e) {
    let i = e.currentTarget.dataset.index
    let text = 'list['+i+'].starStatus'
    console.log(text)
    this.setData({
      [text]: true
    })
  },
  starHidder: function (e) {
    let i = e.currentTarget.dataset.index
    let text = 'list['+i+'].starStatus'
    console.log(text)
    this.setData({
      [text]: false
    })
  },
  customizedFun: function(){
    var user = app.get_user_info(this, "init"),
    self=this;
      wx.checkSession({
       success:function(res){
        console.log(res,'登录未过期')
           if(user){
      wx.navigateTo({
        url: "../customized/customized"
      })
    }
       },
       fail:function(res){
        console.log(res,'登录过期')
        app.user_login_copy(this, "favorite");
       }
      })
 
    
  },
  /**
   * 初始化获 取列表
   */
  getList: function () {
    wx.request({
      url: app.data.request_url+'/api/com/comRoute/getAll?pageNum=1&pageSize=6',
      method: "get",
      dataType: "json",
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        console.log('markers++++',res);
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    })
  },
  /**
   * 根据id获取列表
   */
  getIDList: function () {
    wx.request({
      url: app.data.request_url+'/api/com/comRoute/getById?id=1',
      method: "get",
      dataType: "json",
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        console.log('markers++++',res);
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    })
  }
})