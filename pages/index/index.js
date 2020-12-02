// pages/foryou/index.js
const app = getApp()
<<<<<<< HEAD
=======

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
>>>>>>> 17435522891ce0e01e17ce47af4911c25ca71a0d
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    videoUrl:'http://img1.imgtn.bdimg.com/it/u=1563980539,1672265910&fm=26&gp=0.jpg'

=======
    videoUrl:'http://img1.imgtn.bdimg.com/it/u=1563980539,1672265910&fm=26&gp=0.jpg',
    　　imgList:[],
    currentIndex: 0,
    swiperH: '',//swiper高度
    　　nowIdx: 0,//当前swiper索引
    texts:'',
    titles:'',
    showLists:[],
    pageNum:1,
    pageSize:8,
    hasMoreData: true,
    url:app.data.request_img,
    message:'正在加载数据...',
    img:null
>>>>>>> 17435522891ce0e01e17ce47af4911c25ca71a0d
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({title: app.data.common_page_title.index});
<<<<<<< HEAD
  },

=======
    this.setData({
      pageNum:1
    })
    this.list();
  //  查询热门景点
    this.scenic()
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
        that.setData({
          showLists:list,
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
      var list = res.data.data.records;
      that.setData({
        imgList:list,
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
  // getHeight: function (e) {
  //   　　var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50;//获取当前屏幕的宽度
  //   　　var imgh = e.detail.height;//图片高度
  //   　　var imgw = e.detail.width;
  //   　　var sH = winWid * imgh / imgw + "px"
  //   　　this.setData({
  //   　　　　swiperH: sH//设置高度
  //   　　})
  //   },
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
>>>>>>> 17435522891ce0e01e17ce47af4911c25ca71a0d
  // 跳转最新公告
  goNotice:function(){
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
<<<<<<< HEAD
=======
  goScenic:function(){
    wx.navigateTo({
      url: '../scenic/scenic',
    })
  },
  
  goUrl:function(){
    wx.navigateBackMiniProgram({

      appId:'wx0e6ed4f51db9d078',
      
      path: 'pages/market/web/index?AllianceID=1294595&sid=3672763&ouid=link&from=https%3A%2F%2Fm.ctrip.com%2Fwebapp%2Fhotel%2Fhoteldetail%2F8300215.html%3Fdaylater%3D2%26AllianceID%3D1294595%26sid%3D3672763%26ouid%3Dlink',
      
      envVersion: 'trial',
      
      extraData: {
      
      openId: '123'    //需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      
      },
      
      success(res) {
      
      // 打开其他小程序成功同步触发
      
      wx.showToast({
      
      title: '跳转成功'
      
      })
      
      
      
      
      }
      
      })
  },
>>>>>>> 17435522891ce0e01e17ce47af4911c25ca71a0d
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
})