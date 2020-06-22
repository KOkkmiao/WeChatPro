// pages/goods_list/index.js
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  handleTabTapSupper(e) {
    console.log(e);

    const { index } = e.detail;
    //遍历数据将修改值
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs })
  }
})