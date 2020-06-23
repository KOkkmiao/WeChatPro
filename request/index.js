let ajaxtimes = 0;
let showLoading=false;
export const request = (params) => {
  //https://api-hmugo-web.itheima.net/api/public/v1/categories
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  ajaxtimes++;
  if(!showLoading){
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    showLoading=true;
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (res) => {
        reject(res);
      },
      complete: (res) => {
        ajaxtimes--;
        if(ajaxtimes===0){
          wx.hideLoading();
          showLoading=false;
        }
       },
    })
  })
}