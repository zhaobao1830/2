Page({
  onTap:function () {
    console.log('oooo')
    // 父页面跳转到子页面
    // wx.navigateTo({
    //   url: '../posts/post'
    // })
    // 要跳转到有tab的页面，就需要用switchTab
    // 一个页面跳转到平行页面
    wx.switchTab({
      url: '../posts/post'
    })
  }
})