define("",[],function(require,exports,module){function e(){console.log("下拉了"),setTimeout(function(){var e=$(".issue-list:nth-child(1)").clone();$(".issue-container").prepend(e),mui("#pullrefresh").pullRefresh().endPulldownToRefresh()},1500)}function l(){console.log("上拉了"),setTimeout(function(){mui("#pullrefresh").pullRefresh().endPullupToRefresh(++n>2);for(var e=(document.body.querySelector(".mui-table-view"),$(".issue-list")),l=$(".issue-list:nth-child(1)").clone(),u=e.length,i=u+20;u<i;u++)$(".issue-container").prepend(l)},1500)}window.addEventListener("reLode",function(){window.location.reload()}),mui.init({pullRefresh:{container:"#pullrefresh",down:{callback:e},up:{contentrefresh:"正在加载...",callback:l}}});var n=0;mui.os.plus?mui.plusReady(function(){setTimeout(function(){mui("#pullrefresh").pullRefresh().pullupLoading()},1e3)}):mui.ready(function(){mui("#pullrefresh").pullRefresh().pullupLoading()})});