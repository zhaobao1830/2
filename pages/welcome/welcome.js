Page({
  onTap:function () {
    // 父页面跳转到子页面
    // wx.navigateTo({
    //   url: '../posts/post'
    // })
    // 一个页面跳转到平行页面
    wx.redirectTo({
      url: '../posts/post'
    })
  }
})