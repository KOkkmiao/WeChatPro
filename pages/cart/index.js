/**
 * 根据淘宝的购物车页面样式来写
 * 用户打开的时候获取缓存中的数据拉进行商品内容渲染
 */
import { request } from "../../request/index.js";
import runtime from "../../lib/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  btnadd(e){
    console.log(e);
    
  },
  btnsub(e){
    console.log(e);
    
  }
})