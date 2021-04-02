const app = getApp();

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    currentIndex1: 0,
    currentIndex2: 0,
    videoUrl:'',
    imgList:[],
    swiperH: '',//swiper高度
    　　nowIdx: 0,//当前swiper索引
    texts:'',
    titles:'',
    showLists:[],
    wea:'',
    move:'',
    pageNum:1,
    pageSize:8,
    hasMoreData: false,
    baselineShow: false,
    baseLoading: false,
    url:app.data.request_img,
    message:'正在加载数据...',
    img:null,
    news:null,
    whater:'',
    newList:'',
    imgss:'',
    ycimg:'',
    imgList1: [
      {img: "/images/strategy/fj.jpg"},
      {img: "/images/strategy/fj.jpg"},
      {img: "/images/strategy/fj.jpg"},
      
    ],
    aa:[
      {
       nickName:"wang",
       reward:"2"
      },
      {
        nickName:"wang",
        reward:"2"
       },
       {
         nickName:"wang",
         reward:"2"
        }
     ],
     text: "",
     animation: null,
     timer: null,
     duration: 0,
     textWidth: 0,
     wrapWidth: 0
  },

  onLoad:function(){

    if(options.url){
 
      let url = decodeURIComponent(options.url);
 
      wx.navigateTo({
        url
      })
 
    }
    
  },
  getWifiEnv: function () {
    var that = this
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'wifi') {
          that.videoContext.play()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initAnimation(this.data.text)
    app.set_system_info();
    this.getWifiEnv();
    this.videoContext = wx.createVideoContext('myVideo')
    wx.setNavigationBarTitle({title: app.data.common_page_title.index});
    this.setData({
      pageNum:1
    })
    this.list();
    this.newsMove();
    this.news();
  //  查询热门景点
    this.scenic();
    // 天气
    this.Weather();
    // 最新资讯
    this.newss();
  },
  onHide() {
    this.destroyTimer()
    this.setData({
     timer: null
    })
   },
   onUnload() {
    this.destroyTimer()
    this.setData({
     timer: null
    })
   },
   destroyTimer() {
    if (this.data.timer) {
     clearTimeout(this.data.timer);
    }
   },
   /**
    * 开启公告字幕滚动动画
    * @param {String} text 公告内容
    * @return {[type]} 
    */
   initAnimation(text) {
    let that = this
    this.data.duration = 15000
    this.data.animation = wx.createAnimation({
     duration: this.data.duration,
     timingFunction: 'linear'  
    })
    let query = wx.createSelectorQuery()
    query.select('.content-box').boundingClientRect()
    query.select('#text').boundingClientRect()
    query.exec((rect) => {
     that.setData({
      wrapWidth: rect[0].width,
      textWidth: rect[1].width
     }, () => {
      this.startAnimation()
     })
    })
   },
   // 定时器动画
   startAnimation() {
    //reset
    // this.data.animation.option.transition.duration = 0
    const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step({ duration: 0 })
    this.setData({
     animationData: resetAnimation.export()
    })
    // this.data.animation.option.transition.duration = this.data.duration
    const animationData = this.data.animation.translateX(-this.data.textWidth).step({ duration: this.data.duration })
    setTimeout(() => {
     this.setData({
      animationData: animationData.export()
     })
    }, 100)
    const timer = setTimeout(() => {
     this.startAnimation()
    }, this.data.duration)
    this.setData({
     timer
    })
   },
  changeSwiper1: function (e) {
    console.log(e.detail.current)
    this.setData({
      currentIndex1: e.detail.current,
      texts:this.data.imgList[e.detail.current].name,
      titles:this.data.imgList[e.detail.current].intro
    })
  },
  onLoad:function(){
  },
  newss(){
    var that = this;
    wx.request({
      url: app.data.request_url+'/api/xcx/xcxNews/getAll',
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        that.setData({
          newList:res.data.data
        })
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  Weather(){
    var that = this;
    wx.request({
      url: app.data.request_url+'/api/com/comInfo/getTodayWeather',
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        that.setData({
          whater:res.data.data
        })
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  list(){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that = this;
    wx.request({
      url: app.data.request_url+'/api/com/comActivity/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var list = res.data.data.records;
        var arr=[]
      for(var i=0;i<list.length;i++){
        if(list[i].pictureUrl){
          var img = list[i].pictureUrl.split(',');
          console.log(img)
          arr.push(img)
        }
      
      }
        that.setData({
          showLists:list,
          ycimg:arr
        })
        console.log(list.length)
        if(list.length>=pageSize){
          that.setData({
            pageNum:that.data.pageNum+1,
            hasMoreData:true
          })
          console.log(that.data.pageNum+1)
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
    url: app.data.request_url+'/api/com/comActivity/getAll?pageNum='+pageNum+'&pageSize='+pageSize,
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
      var arr = []
        for(var i=0;i<list.length;i++){
          if(list[i].pictureUrl){
            var img = list[i].pictureUrl.split(',');
            arr.push(img)
          }
        }
      console.log(img)
      that.setData({
        showLists:that.data.showLists.concat(list),
        ycimg:that.data.ycimg.concat(arr),
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

// 景点
scenic(){
  var that = this;
  var type='景点'
  wx.request({
    url: app.data.request_url+'/api/com/comPlace/getAll?type='+type+'&pageSize=5',
    method: "get",
    data: {},
    dataType: "json",
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: res => {
      wx.stopPullDownRefresh();
      var list = res.data.data;
      var arr=[]
      for(var i=0;i<list.length;i++){
        if(list[i].pictureUrl){
          var img = list[i].pictureUrl.split(',');
          arr.push(img)
        }
      
      }
      that.setData({
        imgList:list,
        imgss:arr,
        texts:list[0].name,
        titles:list[0].intro
      })
      
    },
    fail: () => {
      wx.stopPullDownRefresh();
      app.showToast("服务器请求出错");
    }
  });
},
gourl(e){
  var id = e.currentTarget.dataset.imgid.id;
  wx.navigateTo({
    url: '../tourist-detail/tourist-detail?id='+id
  })
  console.log(id)
},
// 跳转景点详情
goscenic(e){
  var id = e.target.dataset.id;
  wx.navigateTo({
    url: '../tourist-detail/tourist-detail?id='+id
  })
},
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
  // else {
  //     wx.showToast({
  //         title: '没有更多数据',
  //     })
  // }
},
    //swiper滑动事件
    swiperChange: function (e) {
    　　this.setData({
    　　　　nowIdx: e.detail.current,
            texts:this.data.imgList[e.detail.current].name,
            titles:this.data.imgList[e.detail.current].intro
    　　})
    },
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current,
      bgColor: getRandomColor()
    })
  },
    // 最新公告
    newsMove(){
      var that = this;
      wx.request({
        url: app.data.request_url+'/api/xcx/xcxPropaganda/getByName?name=南浔宣传片',
        method: "get",
        data: {},
        dataType: "json",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: res => {
          wx.stopPullDownRefresh();
        var list = res.data.data;
        var url = that.data.url
        that.setData({
          videoUrl:url+list.videoUrl
        })
        },
        fail: () => {
          wx.stopPullDownRefresh();
          app.showToast("服务器请求出错");
        }
      });
    },
  // 最新公告
  news(){
    var pageNum = this.data.pageNum;
    var pageSize = this.data.pageSize;
    var that = this;
    wx.request({
      url: app.data.request_url+'/api/xcx/xcxNotice/getAll',
      method: "get",
      data: {},
      dataType: "json",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        wx.stopPullDownRefresh();
        var list = res.data.data;
        that.setData({
          news:list
        })
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
  },
  // 跳转最新公告
  goNotice:function(){
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  goScenic:function(){
    wx.navigateTo({
      url: '../scenic/scenic',
    })
  },
  sortList:function(){
    wx.navigateTo({
      url: '../index-more/index-more',
    })
  },
  // 跳转资讯列表
  noticeList:function(){
    wx.navigateTo({
      url: '../notice-list/notice-list',
    })
  },
   // 跳转演出列表
   showList:function(){
    wx.navigateTo({
      url: '../show-list/show-list',
    })
  },
  // 跳转寻找你 
  goMap:function(){
    wx.switchTab({
      url: '../foryou/index',
    })
  },
  search:function(){
    wx.navigateTo({
      url:'/pages/search/search'
    })
  },
  // 最新资讯
  goUrlNews:function(){
    const url = this.data.newList[0].webUrl; 
    const navtitle =  this.data.newList[0].title;
    console.log(`/pages/web/web?url=${url}&nav=${navtitle}`,)

    var urls = encodeURIComponent(this.data.newList[0].webUrl);
    // var teacherExamName = e.currentTarget.dataset.workname;
    wx.navigateTo({
      // 跳转到webview页面
      url: '/pages/web/web?url='+urls
    });
  },
  gowae:function(e){
    var data = JSON.stringify(e.currentTarget.dataset.type);
    wx.navigateTo({
      url:'/pages/weather/index?data='+data
    })
  },
  goUrls:function(){
    wx.navigateToMiniProgram({
      appId: 'wx10ffa35365b728b8',
      envVersion:'release'
    })
  },
  goRg:function(){
    wx.navigateTo({
      url: '/pages/rg/rg'
    })
  }
})