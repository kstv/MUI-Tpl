define(function(require, exports, module) {
  window.addEventListener('reLode', function() {
    window.location.reload();
  });
  //var common = require('./common');
  mui.init({
    pullRefresh: {
      container: '#pullrefresh',
      down: {
        callback: pulldownRefresh
      },
      up: {
        contentrefresh: '正在加载...',
        callback: pullupRefresh
      }
    }
  });
  /**
   * 下拉刷新具体业务实现
   */
  function pulldownRefresh() {
    console.log("下拉了");
    setTimeout(function() {
      var html = $('.issue-list:nth-child(1)').clone();
      $('.issue-container').prepend(html);
      mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
    }, 1500);
  }
  var count = 0;
  /**
   * 上拉加载具体业务实现
   */
  function pullupRefresh() {
    console.log("上拉了");
    setTimeout(function() {
      mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
      var table = document.body.querySelector('.mui-table-view');
      var list = $('.issue-list');
      var html = $('.issue-list:nth-child(1)').clone();
      for(var i = list.length, len = i + 20; i < len; i++) {
        $('.issue-container').prepend(html);
      }
    }, 1500);
  }
  if(mui.os.plus) {
    mui.plusReady(function() {
      setTimeout(function() {
        mui('#pullrefresh').pullRefresh().pullupLoading();
      }, 1000);

    });
  } else {
    mui.ready(function() {
      mui('#pullrefresh').pullRefresh().pullupLoading();
    });
  }
});