import {
  request
} from "../../request/index.js";
import runtime  from "../../lib/runtime.js";
Page({
  /**
     * 页面的初始数据
     */
  data: {
    leftList: [],
    rigthList: [],
    currentIndex: 0,
    //右侧内容滚动条每次点击回到页面首页
    scrollTop:0
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    const cates = wx.getStorageSync("cates");
    //判断是否有数据 
    if (!cates) {
      //请求接口
      this.getCateList()
    } else if (Date.now() - cates.time > 1000 * 60 * 5) {//如果超出5分钟则需要重新请求数据
      this.getCateList();
    } else {
      //如果到这里表示数据还能用
      this.CateList = cates.data;
      let leftList = this.CateList.map(v => v.cat_name);
      let rigthList = this.CateList[0].children;
      //获取右边的数据
      this.setData(
        {
          leftList,
          rigthList
        }
      )
    }
  },
  CateList: [],
 async  getCateList() {
    // request({ url: "/categories" })
    //   .then(result => {
    //     this.CateList = result.data.message;
    //     wx.setStorageSync("cates", { time: Date.now(), data: this.CateList });
    //     //获取左边的数据
    //     let leftList = this.CateList.map(v => v.cat_name);
    //     let rigthList = this.CateList[0].children;
    //     //获取右边的数据
    //     this.setData(
    //       {
    //         leftList,
    //         rigthList
    //       }
    //     )
    //   })
      const result = await request({ url: "/categories" })
      this.CateList = result;
      wx.setStorageSync("cates", { time: Date.now(), data: this.CateList });
      //获取左边的数据
      let leftList = this.CateList.map(v => v.cat_name);
      let rigthList = this.CateList[0].children;
      //获取右边的数据
      this.setData(
        {
          leftList,
          rigthList
        }
      )
  },
  //左侧点击切换样式
  onhandleItemTap(e) {
    const { index } = e.target.dataset;
    let rigthList = this.CateList[index].children;
    this.setData({
      currentIndex: index,
      rigthList: rigthList,
      scrollTop:0
    })
  }

})