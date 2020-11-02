//app.js
App({
  data:{
    // 页面标题
    common_page_title:{
      'index':'浔开心',
      'for_you':'浔找你',
      'for_strategy':'浔攻略',
      'user':'我的',
      'notice':'最新公告'
    },
    // tabbar页面
      tabbar_pages: [
        "/pages/index/index",
        "/pages/for-strategy/index",
        "/pages/foryou/index",
        "/pages/user/index",
      ],
    // 请求地址
    request_url: "",
  },
  onLaunch: function () {

  },
  // 获取用户信息,信息不存在则唤醒授权
  get_user_info(object, method) {
    var user = this.get_user_cache_info();
    if (user == false) {
      // 唤醒用户授权
      this.user_login(object, method);

      return false;
    } else {
      return user;
    }
  },
  // 用户登录
  user_auth_login(object, method, auth_data) {
    var self = this;
    wx.checkSession({
      success: function () {
        var openid = wx.getStorageSync(self.data.cache_user_login_key) || null;
        if (openid == null)
        {
          self.user_login(object, method);
        } else {
          self.get_user_login_info(object, method, openid, auth_data);
        }
      },
      fail: function () {
        self.user_login(object, method);
      }
    });
  },
  user_login(object, method) {
    var openid = wx.getStorageSync(this.data.cache_user_login_key) || null;
    if (openid == null)
    {
      var self = this;
      // 加载loding
      wx.showLoading({ title: "授权中..." });

      wx.login({
        success: (res) => {
          if (res.code) {
            
          }
        },
        fail: (e) => {
          wx.hideLoading();
          self.showToast('授权失败');
        }
      });
    } else {
      this.login_to_auth();
    }
  },
  // 用户跳转授权
  login_to_auth() {
    wx.showModal({
      title: '温馨提示',
      content: '授权用户信息',
      confirmText: '确认',
      cancelText: '暂不',
      success: (result) => {
        if (result.confirm) {
          wx.navigateTo({
            url: "/pages/login/login"
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})