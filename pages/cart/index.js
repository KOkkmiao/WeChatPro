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
    goodsDetail: [],
    totalPrice: 0,//总金额
    isAllcheck: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    //从本地内存中获取用户的的购物车内容将内容放到本地
    let goodDeatil = wx.getStorageSync("cart") || [];
    console.log(goodDeatil);
    //遍历将给所有的数据加上checked 字段
    //将金额值为空
    goodDeatil.forEach((v, i) => v.isChecked = false);
    this.data.totalPrice = 0;
    if (goodDeatil.length === 0) {
      //请求后台去查看用户的购物车信息
    } else {
      this.setData({
        goodsDetail: goodDeatil,
        isAllcheck: false
      });
    }
  },
  //当页面隐藏的时候将购物车信息存起来
  onHide: function () {
    if (this.data.goodsDetail.length !== 0) {
      wx.setStorageSync("cart", { data: this.data.goodsDetail });
    }
  },
  btnadd(e) {
    const { index } = e.currentTarget.dataset;
    this.countChange(index, 1);
    //循环所有内容查询所有checked 的对象
    let num = 0;
    let cart = this.data.goodsDetail;
    cart.forEach((v, i) => v.isChecked ? num += v.goods_price * v.num : 0)
    this.setData({
      totalPrice: num
    })
  },
  //如果商品的num 个数为1 的时候将商品提示删除信息
  btnsub(e) {
    const { index } = e.currentTarget.dataset;

    //循环所有内容查询所有checked 的对象
    let cart = this.data.goodsDetail;
    if (cart[index].num == 1) {
      //打印提示框
      wx.showModal({
        title: '提示',
        content: '是否删除当前商品',
        success(res) {
          if (res.confirm) {
            cart.del[index];
          } else if (res.cancel) {
            //点击取消不做任何操作
            return;
          }
        }
      })
    } else {
      this.countChange(index, -1);
    }
    let num = 0;
    cart.forEach((v, i) => v.isChecked ? num += v.goods_price * v.num : 0)
    let check = false;
    cart.forEach((v, i) => v.isChecked == true ? check = true : check = false)
    this.setData({
      totalPrice: num,
      isAllcheck: check,
      goodsDetail: cart
    })
  },
  //添加商品的个数
  countChange(index, num) {
    let goods = this.data.goodsDetail;
    goods[index].num += num;
    this.setData(
      {
        goodsDetail: goods
      }
    )
  },
  skipClick(e) {
  },
  countadd(e) {
    //将数据取反然后从新计算
    const { index } = e.currentTarget.dataset;
    let cart = this.data.goodsDetail;
    let goods = cart[index];
    goods.isChecked = !goods.isChecked;
    this.setData({
      goodsDetail: cart
    })
    //循环所有内容查询所有checked 的对象
    let num = 0;
    cart.forEach((v, i) => v.isChecked ? num += v.goods_price * v.num : 0)
    let check = false;
    cart.forEach((v, i) => v.isChecked == true ? check = true : check = false)
    console.log(check, cart);
    this.setData({
      totalPrice: num,
      isAllcheck: check
    })
  },
  //结算金额
  countPrice(e) {

  },
  countAll(e) {
    let check = !this.data.isAllcheck;
    let cart = this.data.goodsDetail;
    //循环所有内容将check 取反
    cart.forEach((v, i) => v.isChecked = check)
    //计算总价
    let num = 0;
    cart.forEach((v, i) => v.isChecked ? num += v.goods_price * v.num : 0)
    this.setData({
      totalPrice: num,
      isAllcheck: check,
      goodsDetail: cart
    })
  }
})