// pages/category/index.js
import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    ScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    // 先判断本地存储中有没有旧的数据
    if (!Cates) {
      // 没有旧数据，发送请求获取数据
      this.getCates()
    } else {
      this.cateList = Cates.data
      // 左侧菜单数据
      let leftMenuList = this.cateList.map(v => v.cat_name);
      // 右侧商品数据
      let rightContent = this.cateList[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    }
  },
  async getCates() {
    const result = await request({ url: "/categories" })
    this.cateList = result.data.message;
    // 把接口的数据存入到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.cateList });


    // 左侧菜单数据
    let leftMenuList = this.cateList.map(v => v.cat_name);
    // 右侧商品数据
    let rightContent = this.cateList[0].children
    this.setData({
      leftMenuList,
      rightContent
      // request({ url: "/categories" })
      //   .then(result => {
      //     this.cateList = result.data.message;
      //     // 把接口的数据存入到本地存储中
      //     wx.setStorageSync("cates", { time: Date.now(), data: this.cateList });


      //     // 左侧菜单数据
      //     let leftMenuList = this.cateList.map(v => v.cat_name);
      //     // 右侧商品数据
      //     let rightContent = this.cateList[0].children
      //     this.setData({
      //       leftMenuList,
      //       rightContent
      //     })
    })
  },
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.cateList[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 点击后，右侧数据重新置顶
      ScrollTop: 0
    })
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

  }
})