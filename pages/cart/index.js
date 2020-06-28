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
      goodsDetail:[],
      totalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从本地内存中获取用户的的购物车内容将内容放到本地
    let goodDeatil=wx.getStorageSync("cart")||[];
    console.log(goodDeatil);
    if(goodDeatil.length===0){
      //请求后台去查看用户的购物车信息
    }else{
      this.setData({
        goodsDetail:goodDeatil
      });
    }
  },
  btnadd(e) {
    const {index} =e.currentTarget.dataset;
    this.countChange(index,1);
  },
  btnsub(e) {
    const {index} =e.currentTarget.dataset;
    this.countChange(index,-1);
  },
  countChange(index,num){
    let goods =this.data.goodsDetail;
    goods[index].num+=num;
    this.setData(
      {
        goodsDetail:goods
      }
    )
  },
  skipClick(e) {
    console.log(e);
  },
  //结算金额
  countPrice(e){

  }
})