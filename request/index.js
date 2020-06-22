export const request = (params) => {
  //https://api-hmugo-web.itheima.net/api/public/v1/categories
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (res) => {
        reject(res);
      },
      complete: (res) => {},
    })
  })
}