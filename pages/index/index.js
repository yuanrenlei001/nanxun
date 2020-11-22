// pages/foryou/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:'http://img1.imgtn.bdimg.com/it/u=1563980539,1672265910&fm=26&gp=0.jpg'

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({title: app.data.common_page_title.index});
  },

  // 跳转最新公告
  goNotice:function(){
    wx.navigateTo({
      url: '../notice/notice',
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