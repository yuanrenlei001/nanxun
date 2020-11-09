//app.js
App({
  data:{
    // 页面标题
    common_page_title:{
      'index':'浔开心',
      'for_you':'浔找你',
      'for_strategy':'浔攻略',
      'user':'我的',
      'notice':'最新公告',
      'index_more':'首页更多',
      'notice_list':'资讯列表',
      'show_list':'演出列表',
      'tourist_guide':'美景导游',
      'tourist_detail':'美景详情',
      'food':'美食餐饮',
      'food_detail':'美食详情',
      'specialty':'景区特产',
      'specialty_detail':'特产详情',
      'ar':'AR看史',
      'vr':'VR看景',
      'voice':'语音导览',
      'tourist':'游客中心',
      'address':'写生基地',
      'address_detail':'写生基地详情',
      'traffic':'交通出行',
      'phone':'景区电话'
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