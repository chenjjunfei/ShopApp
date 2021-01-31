// pages/goods_list/index.js
import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: [],
    // 当前页码
    total: 1
  },
  // 接口要的参数
  QueryPasrams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryPasrams })
    const total = res.data.message.total
    // 计算总页数
    this.total = Math.ceil(total / this.QueryPasrams.pagesize)
    this.setData({
      // 拼接数组
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
  },
  handleItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryPasrams.cid = options.cid
    this.getGoodsList()
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
    this.setData({
      goodsList: []
    })
    this.QueryPasrams.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断有没有下一页
    if (this.QueryPasrams.pagenum >= this.total) {
      wx.showToast({ title: '没有下一页数据了' });
    } else {
      this.QueryPasrams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})