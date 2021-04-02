// pages/foryou/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '景点',
    rightImg: true,
    hiider: false,
    listModel: false,
    index: '0',
    latitude: 30.84979,
    longitude: 120.41847,
    shouAll: false,
    modelShow: false,
    scale: 16,
    markers1: [],
    markers: [
      {
        id: 0,
        iconPath: "/images/map/Unchecked/scenic_spot.png",
        latitude: 30.84979,
    longitude: 120.41847,
        anchor: {
          x : 1,
          y : .5
        },
        label:{
          content: '金宅',
          color: '#333',
          fontSize: 18,
          textAlign: "center",
          anchorX: -32,
          anchorY: -45
        },
        anchor: {
          x : 1,
          y : .5
        },
        width: 31,
        height: 38
      }
    ],
    navList: [
      {
        name: '公共厕所',
        address: '200m  |  南浔古镇东大街38号'
      },
      {
        name: '公共厕所1',
        address: '200m  |  南浔古镇东大街38号'
      },
      {
        name: '公共厕所2',
        address: '200m  |  南浔古镇东大街38号'
      }
    ],
    modelInfo: {
      name: '',
      type: 0,
      address: '',
      describe: '',
      run: '',
      star: ''
    },
    userToken:'',
    islogin:null,
    mapListDate:null,
    bindUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log(Math.round(Math.random() * 10000))
    wx.setNavigationBarTitle({title: app.data.common_page_title.for_you});
    this.init();
    // this.setData ({
    //   bindUrl:'https://leyou.chinananxun.com/drawing/?token={{userToken}}&mapList={{mapListDate}}'
    // })
  },
  init(e){
    var user = app.get_user_info(this, "init"),
    self=this;
    if(user){
        this.setData({
          islogin:true
        })
      var that =this;
        wx.getStorage({
 
      key: 'user_token',
      
      success: function(res) {
        that.setData({
          userToken:res.data
        })
        that.setData ({
          bindUrl:null
        })
        var token = that.data.userToken;
        // setTimeout(() => {

          if(app.globalData.mapDate){
            var mapList = JSON.stringify(app.globalData.mapDate);
            var mapListId = JSON.stringify(app.globalData.mapDate.id);
            var mapListType = JSON.stringify(app.globalData.mapDate.type);
            var mapListName = JSON.stringify(app.globalData.mapDate.name);
              console.log('https://leyou.chinananxun.com/drawing/?token='+token+'&mapListId='+mapListId+'&mapListType='+mapListType+'&mapListName='+mapListName+'&time='+Math.round(Math.random() * 10000))
            that.setData ({
              bindUrl:'https://leyou.chinananxun.com/drawing/?token='+token+'&mapListId='+mapListId+'&mapListType='+mapListType+'&mapListName='+mapListName+'&time='+Math.round(Math.random() * 10000)
            })
          }else{
            that.setData ({
              bindUrl:'https://leyou.chinananxun.com/drawing/?token='+token+'&time='+Math.round(Math.random() * 10000)
            })
          }
          
      
        // }, 100);
        
      }
      
     })
    }
    console.log(user)
  },
  gooutUrl: function () {
    console.log('2321312wdsa')
    wx.navigateTo({
      url: '/pages/webMap/map', //
      success: function () {

      },       //成功后的回调；
      fail: function () { },         //失败后的回调；
      complete: function () { }      //结束后的回调(成功，失败都会执行)
    })
  },
  /**
   * 获取markers模块信息
   */
  getMarks: function () {
    wx.request({
      url: app.data.request_url+'/api/com/comPlace/getAll?type='+ this.data.type,
      method: "get",
      dataType: "json",
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: res => {
        let data = res.data.data;
        let list = data.records;
        let item = list[0]
        var regex1 =new RegExp('(?<=\()\S+(?=\))','/g');
        let str = '1111(120.374334027394 30.8560762051528)'
        console.log('point',item)
        console.log('point',item.point.match(regex1))
        // console.log('markers++++',data);
      },
      fail: () => {
        wx.stopPullDownRefresh();
        app.showToast("服务器请求出错");
      }
    })
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
    console.log('wolalalalalalala')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 头部点击
  headerTap: function(e){
    let curreIndex = e.currentTarget.dataset.index
    this.getMarks()
    this.setData({
      index: curreIndex
    })
    if(curreIndex === '0'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/scenic_spot.png",
            longitude: 116.411885,
            latitude: 39.92492,
            label:{
              content: '金宅',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            anchor: {
              x : 1,
              y : .5
            },
            width: 31,
            height: 38
          },
          // {
          //   id: 1,
          //   iconPath: "/images/map/Unchecked/scenic_spot.png",
          //   longitude: 116.411885,
          //   latitude: 39.92392,
          //   label:{
          //     content: '小何饭店',
          //     color: '#333',
          //     fontSize: 20,
          //     textAlign: "center",
          //     // anchorX: -10,
          //     anchorY: -70
          //   },
          //   width: 31,
          //   height: 38
          // }
        ]
      })
    }
    if(curreIndex === '1'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/restaurant.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '澳门豆捞',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '2'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/hotel.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '龙门客栈1',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '3'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/server.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '服务站',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '4'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/p.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '停车场1',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '5'){
      const myMap = wx.createMapContext('map', this);
      console.log('1232321',myMap)
      // myMap.removeMarkers({
      //   markerIds: [0,1],
      //   success: (res)=>{
      //     console.log('ok',res)
      //   },
      //   fail: (res)=>{
      //     console.log('error',res)
      //   },
      //   complete: (res)=>{
      //     console.log('callback',res)
      //   }
      // })
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/yuyin.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '语音导航',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '6'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/yanchu.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '演出点',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '7'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/matou.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '游船码头',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '8'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/wc.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '厕所',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '9'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/qixi.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '游客休息',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '10'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/bj.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '报警柱',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '11'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/sos.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: 'AED急救',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '12'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/zhong.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '游客中心',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
    if(curreIndex === '13'){
      this.setData({
        markers: [
          {
            id: 0,
            iconPath: "/images/map/Unchecked/characteristic.png",
            longitude: 116.411885,
            latitude: 39.92492,
            anchor: {
              x : 1,
              y : .5
            },
            label:{
              content: '特色商铺',
              color: '#333',
              fontSize: 20,
              textAlign: "center",
              anchorX: -32,
              anchorY: -45
            },
            width: 31,
            height: 38
          }
        ]
      })
    }
  },
  // 展开
  showAllFun: function(){
    this.setData({
      shouAll: true
    })
  },
  // 关闭
  closeFun: function(){
    this.setData({
      shouAll: false
    })
  },
  // markers点击
  gotohere: function(e){
    console.log('点击了markers！！！')
    wx.hideTabBar()
    this.setData({
      rightImg: false
    })
    if(this.data.index === "0"){
      this.setData({
        modelInfo: {
          name: '金宅',
          type: this.data.index,
          address: '200m  |  南浔古镇东大街38号',
          lable: '',
          describe: '南浔金家，位于南浔古镇东大街38号，为南浔近代丝商“八牛”之一，人称小金山',
          run: true,
          star: false
        },
        hiider: true
      })
    }
    if(this.data.index === "1"){
      this.setData({
        modelInfo: {
          name: '小何饭店',
          type: this.data.index,
          address: '200m  |  南浔古镇东大街38号',
          lable: '特色店铺',
          describe: '',
          run: false,
          star: true
        },
        hiider: true
      })
    }
    if(this.data.index === "2"){
      this.setData({
        modelInfo: {
          name: '小何饭店',
          type: this.data.index,
          address: '200m  |  南浔古镇东大街38号',
          lable: '特色店铺',
          describe: '',
          run: false,
          star: true
        },
        hiider: true
      })
    }
    if(this.data.index === "3"){
      this.setData({
        modelInfo: {
          name: '小何饭店',
          type: this.data.index,
          address: '200m  |  南浔古镇东大街38号',
          lable: '特色店铺',
          describe: '',
          run: false,
          star: true
        },
        hiider: true
      })
    }
    if(this.data.index === "4"){
      this.setData({
        modelInfo: {
          name: '酒店停车场',
          type: this.data.index,
          address: '200m  |  南浔古镇东大街38号',
          lable: '',
          describe: '',
          run: false,
          star: false
        },
        hiider: true
      })
    }
    
  },
  mapclick: function(e){
    wx.showTabBar()
    this.setData({
      hiider: false
    })
  },
  goNotice:function(){
    wx.navigateTo({
      url: '../notice/notice',
    })
  }
})