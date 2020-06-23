/**
 * 1 获取页面数据 
 * 2 将数据渲染到页面上
 */
import { request } from "../../request/index.js";
import runtime from "../../lib/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    console.log(goods_id);
    this.getGoodsDetail(goods_id);

  },
  async getGoodsDetail(goods_id) {
    const result = await request({url:"/goods/detail",data:{goods_id:goods_id}});
    console.log(result);
    this.setData({
      goodsDetail:result
    });
  }
})