export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: (result) => {
        resolve(result);
      },
      fail: (res) => {
        reject(res);
      },
      complete: (res) => {},
    })
  })
}