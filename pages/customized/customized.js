// pages/customized/customized.js
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    mapShow: false,
    list: [
      {
        name: '历史人文',
        status: true
      },
      {
        name: '水乡漫步',
        status: false
      },
      {
        name: 'AR体验',
        status: false
      },
      {
        name: '艺术演出',
        status: false
      },
      {
        name: '文艺写生',
        status: false
      },
      {
        name: '民风民俗',
        status: false
      },
      {
        name: '网红打卡',
        status: false
      }
    ],
    dayNum:'',
    label:'',
    touristNum:'',
    token:'',
    showList:'',
    address:'',
    longitude: [],
    latitude: [],
    markers: [],
    polyline: '',
    url:app.data.request_img,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('user_token')
    qqmapsdk = new QQMapWX({
      key: 'JZOBZ-GTUCW-RSSRB-OKNKJ-ECML2-OFBL6'
  });
    this.setData({
      list:'',
      dayNum:'',
      label:'',
    label:'',
    touristNum:'',
    token:token
    })
    this.type();
  },
  // 生成喜好
  type:function(){
    var that = this;
    var url = ''
    var data={

    }
    wx.request({
      url: app.data.request_url+'/api/com/comRoute/getLabelList',
      method: "get",
      data: {},
      dataType: "json",
      header: { 
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer '+that.data.token
       },
      success: res => {
        wx.stopPullDownRefresh();
        if(res.data.code == '200'){
          var list = res.data.data.data;
          var arr = [];
          console.log(list)
          for(var i=0;i<list.length;i++){
            var obj = {};
              obj['name'] = list[i]
              obj['status'] = false
              arr.push(obj)
          }
          that.setData({
            list:arr
          })
        }else if(res.data.code == '402'){
          app.showToast("参数检验失败！");
        }else if(res.data.code == '403'){
          app.showToast("没有相关权限！");
        }else if(res.data.code == '500'){
          app.showToast("操作失败！");
        }
        else if(res.data.code == '500'){
          app.showToast("操作失败！");
        }
        else{
          if(res.data.code =='401'){
            console.log(1)
            app.user_auth_login(this,'favorite')
          }
        }
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  likeClick: function (e){
    let num = e.currentTarget.dataset.index;
    let label = e.currentTarget.dataset.label;
    let key = 'list['+ num + '].status'
    this.setData({
      [key]: !this.data.list[num].status
    })
    var arr = []
    for(var i=0;i<this.data.list.length;i++){
      
      if(this.data.list[i].status == true){
        arr.push(this.data.list[i].name)
      }
      
    }
    this.setData({
      label:arr.toString()
    })
    console.log(this.data.label)
  },
  dayNumInput:function(e){
    this.setData({
      dayNum:e.detail.value
    })
  },
  touristNumInput:function(e){
    this.setData({
      touristNum:e.detail.value
    })
  },
  goUrl:function(){
    var url = this.data.showList.detailsUrl
    wx.navigateTo({
      url: "/pages/webs/webs?url="+url,
    })
  },
  goUrls:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/tourist-detail/tourist-detail?id="+id
    })
  },
  saveFun: function (){
    var that = this;
  var url = ''
  var data={
    dayNum:this.data.dayNum,
    touristNum:this.data.touristNum,
    label:this.data.label
  }
  if(data.dayNum == ''){
    app.showToast("游玩天数不能为空！");                                      
  }else if(data.touristNum == ''){
    app.showToast("游玩人数不能为空！");
  }else {
    this.setData({
      loading: false
    })
    setTimeout(()=> {
      this.setData({
        loading: true,
        mapShow: true
      })
        wx.request({
    url: app.data.request_url+'/api/xcx/xcxTravel/add',
    method: "post",
    data: data,
    dataType: "json",
    header: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization':'Bearer '+that.data.token
     },
    success: res => {
      wx.stopPullDownRefresh();
      var id = res.data.message
      wx.request({
        url: app.data.request_url+'/api/xcx/xcxTravel/getById?id='+id,
        method: "get",
        data: {},
        dataType: "json",
        header: { 
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':'Bearer '+that.data.token
         },
        success: res => {
          wx.stopPullDownRefresh();
          if(res.data.code =='401'){
            console.log(1)
            app.user_login_copy(this, "favorite");
          }else{
            var list = res.data.data;
            var data = res.data.data.pointList;
            var arr = []
            for(var i=0;i<list.pointList.length;i++){
                arr.push(list.pointList[i].name)
            }
                // 获取当前地理位置
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var markers = new Array();
          var add = []
                  for (var i = 0; i < data.length; i++) {
                    var obj ={};
                    var name = data[i].name; //名称
                    var lat = data[i].latitude; //经度
                    var lon = data[i].longitude;//纬度
                    obj['latitude'] = data[i].latitude;
                    obj['longitude'] = data[i].longitude;
                    add.push(obj)
                    var info = {
                      id: 0,
                      iconPath: "/images/dw.png",
                      latitude: '',
                      longitude: '',
                      width: 20,
                      height: 25,
                      title: "",
                    };
                    info.id = i
                    info.latitude = lat
                    info.longitude = lon
                    info.title = name
      
                    markers.push(info);
                  }
                  var form = add[0].latitude+','+add[0].longitude
                  var last = add.slice(-1);
                  qqmapsdk.direction({
                    mode:'walking',
                    from: form,
                    to: last[0].latitude+','+last[0].longitude, 
                    success:function(res){
                      console.log(res)
                      console.log(res);
                        var ret = res;
                        var coors = ret.result.routes[0].polyline, pl = [];
                        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                        var kr = 1000000;
                        for (var i = 2; i < coors.length; i++) {
                          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                        }
                        //将解压后的坐标放入点串数组pl中
                        for (var i = 0; i < coors.length; i += 2) {
                          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
                        }
                        console.log(pl)
                        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
                        that.setData({
                          latitude:pl[0].latitude,
                          longitude:pl[0].longitude,
                          polyline: [{
                            points: pl,
                            color: '#FF0000DD',
                            width: 4,
                            dottedLine: true,
                            borderWidth:2
                          }]
                        })
                    }
                  })
                  var str = JSON.stringify(markers);
              that.setData(
                {
                  latitude: latitude,
                  longitude: longitude,
                  markers: markers,
                }
              )
        }
      })
            this.setData({
              showList:list,
              address:arr.join('-')
            })
          }
        },
        fail: () => {
          wx.stopPullDownRefresh();
          app.showToast("服务器请求出错");
        }
      });
    },
    fail: () => {
      wx.stopPullDownRefresh();
      app.showToast("服务器请求出错");
    }
  });
    },1000)
  }

      


  }
})