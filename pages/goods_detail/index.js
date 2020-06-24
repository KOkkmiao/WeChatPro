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
    this.getGoodsDetail(goods_id);

  },
  async getGoodsDetail(goods_id) {
    const result = await request({ url: "/goods/detail", data: { goods_id: goods_id } });
    this.setData({
      goodsDetail: {
        pics: result.pics,
        goods_price: result.goods_price,
        goods_name: result.goods_name,
        goods_introduce: result.goods_introduce,
        goods_id: result.goods_id
      }
    });
  },
  prvViewImgeHandle(e) {
    const urls = this.data.goodsDetail.pics.map(v => v.pics_big)
    const { index } = e.currentTarget.dataset;
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  /**
   * 购物车逻辑
   * 0用户如果登录进来就去服务器拉取用户对应的购物车信息（Appload中取做）
   *  1如果未登录则不用管
   * 1查询本地缓存中是否存在对应的数据
   * 2如果没有就直接进行添加
   * 3定时将缓存发到服务器上
   */
  handleCartAdd(e) {
    //1查询本地缓存中是否存在对应的数据
    let cart = wx.getStorageSync("cart") || [];
    //如果为空
    let result = this.data.goodsDetail;
    let goodsDetail = {
      pics: result.pics,
      goods_price: result.goods_price,
      goods_name: result.goods_name,
      goods_introduce: result.goods_introduce,
      goods_id:result.goods_id
    }
    let index = cart.findIndex(v => v.goods_id === goodsDetail.goods_id);
    if (index !== -1) {//表示没有在数据中 直接push进去并替换
      cart[index].num++;
    } else {
      goodsDetail.num = 1;
      cart.push(goodsDetail);
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //防手抖
      mask: true
    });
  }

})