var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    movies: {},
    navigateTitle: '',
    isEmpty: true,
    requestUrl: "",
    totalCount: 0
  },
  onLoad:function (options) {
    // 页面初始化options为页面跳转所带来的参数
    var category = options.category;
    this.data.navigateTitle = category;
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },
  processDoubanData:function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = {}

    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    }
    else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
  },
  onScrollLower:function (event) {
    var nextUrl = this.data.requestUrl +
        "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  onShow:function () {
    // 页面显示
  },
  onReady:function () {
    // 页面渲染完成
  },
  onHide:function () {
    // 页面隐藏
    console.log("this is onHide")
  },
  onUnload:function () {
   // 页面关闭
    console.log("this is onUnload")
  }
})