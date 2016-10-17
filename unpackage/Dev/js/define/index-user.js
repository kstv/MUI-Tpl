define(function(require, exports, module) {
  window.addEventListener('reLode', function() {
    window.location.reload();
  });
  //var common = require('./common');
  mui.init();
  mui('body').on('tap', 'a', function() {
      document.location.href = this.href;
    });
  (function($) {
    //阻尼系数
    var deceleration = mui.os.ios ? 0.003 : 0.0009;
    $('.mui-scroll-wrapper').scroll({
      bounce: false,
      indicators: true, //是否显示滚动条
      deceleration: deceleration
    });
    $.ready(function() {
      //循环初始化所有下拉刷新，上拉加载。
      $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
        $(pullRefreshEl).pullToRefresh({
          down: {
            callback: function() {
              var self = this;
              setTimeout(function() {
                console.log("下拉");
                self.endPullDownToRefresh();
              }, 1000);
            }
          },
          up: {
            callback: function() {
              var self = this;
              setTimeout(function() {
                console.log("上拉");
                self.endPullUpToRefresh();
              }, 1000);
            }
          }
        });
      });
    });
  })(mui);
});