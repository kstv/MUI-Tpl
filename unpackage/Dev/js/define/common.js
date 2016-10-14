define(function(require, exports, module) {
  /*
   * 三位一逗号数字处理
   */
  exports.formatNum = function(strNum) {
      if(strNum.length <= 3) {
        return strNum;
      }
      if(!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
        return strNum;
      }
      var a = RegExp.$1,
        b = RegExp.$2,
        c = RegExp.$3;
      var re = new RegExp();
      re.compile("(\\d)(\\d{3})(,|$)");
      while(re.test(b)) {
        b = b.replace(re, "$1,$2$3");
      }
      return a + "" + b + "" + c;
    }
    /*
     * 时间格式化
     */
  Date.prototype.formatDate = function(fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  mui.plusReady(function() {
    var first = null;
    mui.back = function() {
      if(!first) {
        first = new Date().getTime();
        mui.toast('再按一次退出');
        setTimeout(function() {
          first = null;
        }, 2000);
      } else {
        if(new Date().getTime() - first < 2000) {
          plus.runtime.quit();
        }
      }
    };
  })
});