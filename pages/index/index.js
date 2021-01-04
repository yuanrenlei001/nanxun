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
    videoUrl:'https://nanxun.zjtoprs.com/minio/old-town/com/info/propagandafilm1.mp4',
    imgList:[],
    currentIndex: 0,
    swiperH: '',//swiper高度
    　　nowIdx: 0,//当前swiper索引
    texts:'',
    titles:'',
    showLists:[],
    pageNum:1,
    pageSize:8,
    hasMoreData: false,
    url:app.data.request_img,
    message:'正在加载数据...',
    img:null,
    news:null,
    whater:'',
    newList:'',
    imgss:'',
    ycimg:''
  },
  onLoad:function(){
    if(options.url){
 
      let url = decodeURIComponent(options.url);
 
      wx.navigateTo({
        url
      })
 
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({title: app.data.common_page_title.index});
    this.setData({
      pageNum:1
    })
    this.list();
    this.news();
  //  查询热门景点
    this.scenic();
    // 天气
    this.Weather();
    // 最新资讯
    this.newss();
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
        ycimg:that.data.ycimg.concat(img),
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
          console.log(img)
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
// 跳转景点详情
goscenic(e){
  var id = e.target.dataset.id;
  wx.navigateTo({
    url: '../tourist-detail/tourist-detail?id='+id
  })
},
onReachBottom: function () {
  if (this.data.hasMoreData) {
    this.addList();
  } else {
      wx.showToast({
          title: '没有更多数据',
      })
  }
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
        var list = res.data.data.records;
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
    wx.navigateTo({
      url: '/pages/web/web?url='+this.data.newList[0].webUrl,
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