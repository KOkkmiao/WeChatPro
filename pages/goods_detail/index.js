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
    const result = await request({ url: "/goods/detail", data: { goods_id: goods_id } });
    console.log(result);
    this.setData({
      goodsDetail: {
        pics: result.pics,
        goods_price: result.goods_price,
        goods_name: result.goods_name,
        goods_introduce: result.goods_introduce
      }
    });
  },
  prvViewImgeHandle(e) {
    const urls = this.data.goodsDetail.pics.map(v => v.pics_big)
    const {index}  = e.currentTarget.dataset;
    console.log(index);
    
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  }
})