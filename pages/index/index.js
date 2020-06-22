import {
  request
} from "../../request/index.js";
import runtime from "../../lib/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    cateList: [],
    //获取楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  async getFloorList() {
    const result = await request({
      url: "/home/floordata"
    });
    this.setData({
      floorList: result
    });
  },
  async getSwiperList() {
    const result = await request({
      url: "/home/swiperdata"
    });
    console.log(37,result);
    
    this.setData({
      swiperList: result
    });
  },
  async getCateList() {
    const result = await request({
      url: "/home/catitems"
    });
    this.setData({
      cateList: result
    });
  }
})