//app.js
App({
  data:{
    // 用户登录缓存key
    cache_user_login_key: "cache_user_login_key",
    cache_system_info_key:'cache_system_info_key',
    
    // 用户信息缓存key
    cache_user_info_key: "cache_user_info_key",

    // 用户站点信息缓存key
    cache_user_merchant_key: "cache_user_merchant_key",
    // 用户token
    user_token:'user_token',
    isPhoneX:'123',
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
      'food':'景区商铺',
      'food_detail':'商铺详情',
      'specialty':'景区特产',
      'specialty_detail':'特产详情',
      'ar':'AR看史',
      'vr':'VR看景',
      'search':'搜索',
      'voice':'语音导览',
      'tourist':'游客中心',
      'address':'写生基地',
      'address_detail':'写生基地详情',
      'traffic':'交通出行',
      'phone':'景区电话',
      'web':'乐游南浔',
      'my_collection':'我的收藏',
      'show_detail':'演出详情',
      'ticket':'酒店名宿',
      'ticket_detail':'酒店名宿详情',
      'web_map':'地图',
      'dp':'店铺',
      'dp_detail':'店铺详情',
      'weather':'天气',
      'rg':'智能客服',
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
    // wx.getSystemInfo({
    //   success (res) {
    //     let { model:modelmes} = res;
    //     let _this = this;
    //     let iphoneArr = new Set(['iPhone X', 'iPhone 11', 'iPhone 11 Pro Max']); //机型
    //     console.log(_this.data)
    //     // if(iphoneArr.has(modelmes)) _this.globalData.isIphoneX = true; 
    //   }
    // })
  },
 
  
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  },
  // 获取用户信息,信息不存在则唤醒授权
  get_user_info(object, method) { 
    console.log(object)
    console.log(method)
    var user = this.get_user_cache_info() || null;
    console.log(user)
    
    if (user == null) {
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
    console.log(user)
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
                 // wx.navigateBack();
       var page = getCurrentPages()  ;// 获取当前页面栈
 
 var beforePage = page[page.length - 2]; // 跳转页面的栈
 wx.navigateBack({
     success: function () {
       beforePage.onLoad(); // 执行前一个页面的onLoad方法
 
    }
 
 })
              }
            })
          },
        })
      },
      fail: function () {
        console.log(123)
        self.user_login(object, method);
      }
    });
  },
  user_login_copy(){
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
                  console.log(res.data.message)
                    wx.setStorage({
                      key: self.data.cache_user_login_key,
                      data: data.openId
                    });
                    wx.setStorage({
                      key: self.data.user_token,
                      data: res.data.message
                    });
                    self.login_to_auth();
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
  },
  user_login(object, method) {
    var openid = wx.getStorageSync(this.data.cache_user_login_key) || null;
    console.log(openid)
    if (openid == null){
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
                  console.log(res.data.message)
                    wx.setStorage({
                      key: self.data.cache_user_login_key,
                      data: data.openId
                    });
                    wx.setStorage({
                      key: self.data.user_token,
                      data: res.data.message
                    });
                    self.login_to_auth();
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
  alert(e)
  {
    var msg = e.msg || null;
    if (msg != null)
    {
      var title = e.title || '';
      var is_show_cancel = (e.is_show_cancel == 0) ? false : true;
      var cancel_text = e.cancel_text || '取消';
      var confirm_text = e.confirm_text || '确认';
      var cancel_color = e.cancel_color || '#000000';
      var confirm_color = e.confirm_color || '#576B95';

      wx.showModal({
        title: title,
        content: msg,
        showCancel: is_show_cancel,
        cancelText: cancel_text,
        cancelColor: cancel_color,
        confirmText: confirm_text,
        confirmColor: confirm_color,
        success(res) {
          if ((e.object || null) != null && typeof e.object === 'object' && (e.method || null) != null) {
            e.object[e.method](res.confirm ? 1 : 0);
          }
        }
      });
    } else {
      self.showToast('提示信息为空 alert');
    }
  },
  set_system_info() {
    var system_info = wx.getSystemInfoSync();
    console.log(system_info)
    wx.setStorage({
      key: this.data.cache_system_info_key,
      data: system_info
    });
    return system_info;
  },
  globalData: {
    userInfo: null
  }
})