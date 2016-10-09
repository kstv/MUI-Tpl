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
    //版本更新
  exports.upDate = function(version) {
      var nwaiting = plus.nativeUI.showWaiting(); //显示原生等待框
      $.ajax({
        type: "get",
        contentType: "update.json",
        dataType: "json",
        async: false,
        url: url + "/isUpdate",
        data: {
          "vno": version
        },
        success: function(msg) {
          if(msg.data.isUpdate == 0) {
            mui.toast("您所使用的已经是最新版本")
          } else {
            if(msg.data.forcedUpdate == 0) {
              mui.toast("有新版本可选择更新");
              var btnArray = ['是', '否'];
              mui.confirm('有可更新版本' + msg.data.id + '', '提示', btnArray, function(e) {
                if(e.index == 0) {
                  var url = msg.data.downLoadUrl;
                  var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
                    mui.toast("正在下载...")
                    if(status == 200) { // 下载成功
                      var path = d.filename;
                      plus.runtime.install(path); // 安装下载的apk文件
                      console.log(d.filename);
                    } else { //下载失败
                      alert("Download failed: " + status);
                    }
                  });
                  dtask.start();
                }
              })
            } else {
              var url = msg.data.downLoadUrl;
              var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
                mui.toast("正在下载...")
                if(status == 200) { // 下载成功
                  var path = d.filename;
                  plus.runtime.install(path); // 安装下载的apk文件
                  console.log(d.filename);
                } else { //下载失败
                  alert("Download failed: " + status);
                }
              });
              dtask.start();
            }
          }
          nwaiting.close();
          console.log(JSON.stringify(msg))
        },
        error: function(e) {
          console.log(JSON.stringify(e))
        }
      });
    }
    //版本更新
  exports.upDate1 = function(version) {
    var nwaiting = plus.nativeUI.showWaiting(); //显示原生等待框
    $.ajax({
      type: "get",
      contentType: "application/json",
      dataType: "json",
      async: false,
      url: url + "/isUpdate",
      data: {
        "vno": version
      },
      success: function(msg) {
        if(msg.data.isUpdate == 0) {
          // mui.toast("已是最新版不用更新")
        } else {
          if(msg.data.forcedUpdate == 0) {
            mui.toast("有新版本可选择更新");
            var btnArray = ['是', '否'];
            mui.confirm('有可更新版本' + msg.data.id + '', '提示', btnArray, function(e) {
              if(e.index == 0) {
                var url = msg.data.downLoadUrl;
                var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
                  mui.toast("正在下载...");
                  if(status == 200) { // 下载成功
                    var path = d.filename;
                    plus.runtime.install(path); // 安装下载的apk文件
                    console.log(d.filename);
                  } else { //下载失败
                    alert("Download failed: " + status);
                  }
                });
                dtask.start();
              }
            })
          } else {
            var url = msg.data.downLoadUrl;
            var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
              mui.toast("正在下载...")
              if(status == 200) { // 下载成功
                var path = d.filename;
                plus.runtime.install(path); // 安装下载的apk文件
                console.log(d.filename);
              } else { //下载失败
                alert("Download failed: " + status);
              }
            });
            dtask.start();
          }
        }
        nwaiting.close();
        console.log(JSON.stringify(msg))
      },
      error: function(e) {
        console.log(JSON.stringify(e))
      }
    });
  }
  mui.plusReady(function() {
    var first = null;
    mui.back = function() {
      if(!first) {
        first = new Date().getTime();
        mui.toast('再按一次退出系统!');
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