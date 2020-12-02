//app.js
App({
  data:{
    // 用户登录缓存key
    cache_user_login_key: "null",
    
    // 用户信息缓存key
    cache_user_info_key: "null",

    // 用户站点信息缓存key
    cache_user_merchant_key: "null",
    // 页面标题
    common_page_title:{
      'index':'浔开心',
      'for_you':'浔找你',
      'for_strategy':'浔攻略',
      'user':'我的',
      'notice':'最新公告',
      'index_more':'首页更多',
      'notice_list':'资讯列表',
      'scenic':'热门景点列表',
      'show_list':'演出列表',
      'tourist_guide':'景点',
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
      'phone':'景区电话',
      'show_detail':'演出详情'
    },
    // tabbar页面
      tabbar_pages: [
        "/pages/index/index",
        "/pages/for-strategy/index",
        "/pages/foryou/index",
        "/pages/user/index",
      ],
    // 请求地址
    request_url: "https://nanxun.zjtoprs.com",
    // 文件类地址
    request_img: "https://nanxun.zjtoprs.com/minio",
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
   /**
   * 从缓存获取用户信息
   */
  get_user_cache_info() {
    let user = wx.getStorageSync(this.data.cache_user_info_key);
    // console.log(user)
    if (user == '') {
      return false;
    }
    return user;
  },
  // 用户登录
  user_auth_login(object, method, auth_data) {
    var self = this;
    wx.checkSession({
      success: function () {
        console.log(auth_data)
        wx.setStorage({
          key:self.data.cache_user_info_key,
          data:auth_data,
          success: (res) => {
            wx.getStorage({
              key: self.data.cache_user_info_key,
              success (res) {
                if (typeof object === 'object' && (method || null) != null) {
                  object[method]();
                }
              }
            })
          },
        })
      },
      fail: function () {
        self.user_login(object, method);
      }
    });
  },
  user_login(object, method) {
    var openid = wx.getStorageSync(this.data.cache_user_login_key);
    console.log(openid == '')
    if (openid == ''){
      console.log(1)
      var self = this;
      // 加载loding
      wx.showLoading({ title: "授权中..." });

      wx.login({
        success: (res) => {
          if (res.code) {
            console.log(res.code)

            wx.request({
              url: this.data.request_url+'/api/xcx/xcxUser/login',
              method: 'POST',
              data: { code: res.code },
              dataType: 'json',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success: (res) => {
                wx.hideLoading();
                if (res.data.code == 200) {
                  var data = res.data.data;
                    wx.setStorage({
                      key: self.data.cache_user_login_key,
                      data: data.openid
                    });
                    self.login_to_auth();
                  // if ((data.is_user_exist || 0) == 1) {
                  //   wx.setStorage({
                  //     key: self.data.cache_user_info_key,
                  //     data: data,
                  //     success: (res) => {
                  //       if (typeof object === 'object' && (method || null) != null) {
                  //         object[method]();
                  //       }
                  //     },
                  //     fail: () => {
                  //       self.showToast('用户信息缓存失败');
                  //     }
                  //   });
                  // } else {
                  //   wx.setStorage({
                  //     key: self.data.cache_user_login_key,
                  //     data: data.openid
                  //   });
                  //   self.login_to_auth();
                  // }
                } else {
                  wx.hideLoading();
                  self.showToast(res.data.msg);
                }
              },
              fail: () => {
                wx.hideLoading();
                self.showToast('服务器请求出错');
              },
            });
          }
        },
        fail: (e) => {
          wx.hideLoading();
          self.showToast('授权失败');
        }
      });
    } else {
      console.log(2)
      this.login_to_auth();
    }
  },
  user_is_need_login(user) {
    // 用户信息是否正确
    if (user == false)
    {
      return true;
    }

    
    return false;
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
  showToast(msg, status)
  {
    if ((status || 'error') == 'success')
    {
      wx.showToast({
        title: msg,
        duration: 3000
      });
    } else {
      wx.showToast({
        image: '/images/default-toast-error.png',
        title: msg,
        duration: 3000
      });
    }
  },
  globalData: {
    userInfo: null
  }
})