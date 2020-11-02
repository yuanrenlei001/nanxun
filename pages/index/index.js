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
  }
})