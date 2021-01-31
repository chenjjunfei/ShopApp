// index.js
// 获取应用实例
// const app = getApp()
import { request } from "../../request/index"
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    cateList: [],
    floorList: []
  },
  onLoad() {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // })
    this.getSwiperData(),
      this.getCateData(),
      this.getfloorData()
  },
  // 获取轮播图数据
  getSwiperData() {
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  // 获取首页导航数据
  getCateData() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          cateList: result.data.message
        })
      })
  },
  // 获取首页楼层数据
  getfloorData() {
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  }
})
