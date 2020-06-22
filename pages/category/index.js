import {
  request
} from "../../request/index.js";
Page({
/**
   * 页面的初始数据
   */
  data: {
    leftList:[],
    rigthList:[]
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList();
  },
  CateList:[],
  getCateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
    .then(result=>{
      console.log(result);
    
      this.CateList=result.data.message;
      //获取左边的数据
      let leftList=this.CateList.map(v=>v.cat_name);
      let rigthList=this.CateList[0].children;
      //获取右边的数据
      this.setData(
        {
          leftList,
          rigthList
        }
      )
    })
  }

})