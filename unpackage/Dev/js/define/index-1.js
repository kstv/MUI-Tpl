define(function(require, exports, module) {
  window.addEventListener('reLode', function() {
    window.location.reload();
  });
  var common = require('./common');
  mui.init();
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
                var ul = self.element.querySelector('.mui-table-view');
                ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);
                self.endPullDownToRefresh();
              }, 1000);
            }
          },
          up: {
            callback: function() {
              var self = this;
              setTimeout(function() {
                var ul = self.element.querySelector('.mui-table-view');
                ul.appendChild(createFragment(ul, index, 5));
                self.endPullUpToRefresh();
              }, 1000);
            }
          }
        });
      });
      var createFragment = function(ul, index, count, reverse) {
        var length = ul.querySelectorAll('li').length;
        var fragment = document.createDocumentFragment();
        var li;
        for(var i = 0; i < count; i++) {
          li = document.createElement('li');
          li.className = 'mui-table-view-cell';
          li.innerHTML = '第' + (index + 1) + '个选项卡子项-' + (length + (reverse ? (count - i) : (i + 1)));
          fragment.appendChild(li);
        }
        return fragment;
      };
    });
  })(mui);
});