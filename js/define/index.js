define("./common",[],function(require,exports,module){exports.formatNum=function(e){if(e.length<=3)return e;if(!/^(\+|-)?(\d+)(\.\d+)?$/.test(e))return e;var t=RegExp.$1,n=RegExp.$2,i=RegExp.$3,o=new RegExp;for(o.compile("(\\d)(\\d{3})(,|$)");o.test(n);)n=n.replace(o,"$1,$2$3");return t+""+n+i},Date.prototype.formatDate=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e},mui.plusReady(function(){var e=null;mui.back=function(){e?(new Date).getTime()-e<2e3&&plus.runtime.quit():(e=(new Date).getTime(),mui.toast("再按一次退出系统!"),setTimeout(function(){e=null},2e3))}})}),define("",["./common"],function(require,exports,module){window.addEventListener("reLode",function(){window.location.reload()});require("./common");mui.init(),function($){var e=mui.os.ios?.003:9e-4;$(".mui-scroll-wrapper").scroll({bounce:!1,indicators:!0,deceleration:e}),$.ready(function(){$.each(document.querySelectorAll(".mui-slider-group .mui-scroll"),function(t,n){$(n).pullToRefresh({down:{callback:function(){var n=this;setTimeout(function(){var i=n.element.querySelector(".mui-table-view");i.insertBefore(e(i,t,10,!0),i.firstChild),n.endPullDownToRefresh()},1e3)}},up:{callback:function(){var n=this;setTimeout(function(){var i=n.element.querySelector(".mui-table-view");i.appendChild(e(i,t,5)),n.endPullUpToRefresh()},1e3)}}})});var e=function(e,t,n,i){for(var o,r=e.querySelectorAll("li").length,l=document.createDocumentFragment(),u=0;u<n;u++)o=document.createElement("li"),o.className="mui-table-view-cell",o.innerHTML="第"+(t+1)+"个选项卡子项-"+(r+(i?n-u:u+1)),l.appendChild(o);return l}})}(mui)});