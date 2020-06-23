import { request } from "../../request/index.js";
import runtime from "../../lib/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        tabs_name: "综合",
        isActive: true
      },
      {
        id: 1,
        tabs_name: "销量",
        isActive: false
      },
      {
        id: 2,
        tabs_name: "价格",
        isActive: false
      }
    ],
    //商品内容数据
    goodsList: []
  },
  QueryParam: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  PageNumber: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParam.cid = options.cid;
    this.getGoodsList();
  },
  //请求商品数据
  async getGoodsList() {
    const result = await request({
      url: "/goods/search", data: this.QueryParam
    });
    //一共有多少页的计算方式 总页数/每页个数取证
    this.PageNumber = Math.ceil(result.total / this.QueryParam.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    })

  },
  handleTabTapSupper(e) {
    console.log(e);
    const { index } = e.detail;
    //遍历数据将修改值
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs })
  },
  onReachBottom() {
    //判断当前数据是否还有新的数据
    if (this.QueryParam.pagenum >= this.PageNumber) {
      wx.showToast({ title: "没有数据了", duration: 1000 })
    } else {
      //加页数
      this.QueryParam.pagenum++;
      //请求数据
      this.getGoodsList();
    }
  },
  //页面下拉刷新 
  /**
   * 1 将页码重置为1
   * 2 将页面数据list清空
   * 3 重新调用getGoodsList 接口
   */
  onPullDownRefresh() {
    this.PageNumber = 0;
    this.QueryParam.pagenum = 1
    this.setData({goodsList:[]})
    this.getGoodsList();
    console.log("下拉刷新");
    wx.stopPullDownRefresh();

  }
})