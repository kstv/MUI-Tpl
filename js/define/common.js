define('', [], function (require, exports, module) {
    exports.formatNum = function (strNum) {
        if (strNum.length <= 3) {
            return strNum;
        }
        if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
            return strNum;
        }
        var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
        var re = new RegExp();
        re.compile('(\\d)(\\d{3})(,|$)');
        while (re.test(b)) {
            b = b.replace(re, '$1,$2$3');
        }
        return a + '' + b + '' + c;
    };
    Date.prototype.formatDate = function (fmt) {
        var o = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S': this.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        return fmt;
    };
    mui.plusReady(function () {
        var first = null;
        mui.back = function () {
            if (!first) {
                first = new Date().getTime();
                mui.toast('\u518D\u6309\u4E00\u6B21\u9000\u51FA');
                setTimeout(function () {
                    first = null;
                }, 2000);
            } else {
                if (new Date().getTime() - first < 2000) {
                    plus.runtime.quit();
                }
            }
        };
    });
});