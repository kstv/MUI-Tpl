define('./common', [], function (require, exports, module) {
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
                mui.toast('\u518D\u6309\u4E00\u6B21\u9000\u51FA\u7CFB\u7EDF!');
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
define('', ['./common'], function (require, exports, module) {
    window.addEventListener('reLode', function () {
        window.location.reload();
    });
    var common = require('./common');
    mui.init();
    (function ($) {
        var deceleration = mui.os.ios ? 0.003 : 0.0009;
        $('.mui-scroll-wrapper').scroll({
            bounce: false,
            indicators: true,
            deceleration: deceleration
        });
        $.ready(function () {
            $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function (index, pullRefreshEl) {
                $(pullRefreshEl).pullToRefresh({
                    down: {
                        callback: function () {
                            var self = this;
                            setTimeout(function () {
                                var ul = self.element.querySelector('.mui-table-view');
                                ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);
                                self.endPullDownToRefresh();
                            }, 1000);
                        }
                    },
                    up: {
                        callback: function () {
                            var self = this;
                            setTimeout(function () {
                                var ul = self.element.querySelector('.mui-table-view');
                                ul.appendChild(createFragment(ul, index, 5));
                                self.endPullUpToRefresh();
                            }, 1000);
                        }
                    }
                });
            });
            var createFragment = function (ul, index, count, reverse) {
                var length = ul.querySelectorAll('li').length;
                var fragment = document.createDocumentFragment();
                var li;
                for (var i = 0; i < count; i++) {
                    li = document.createElement('li');
                    li.className = 'mui-table-view-cell';
                    li.innerHTML = '\u7B2C' + (index + 1) + '\u4E2A\u9009\u9879\u5361\u5B50\u9879-' + (length + (reverse ? count - i : i + 1));
                    fragment.appendChild(li);
                }
                return fragment;
            };
        });
    }(mui));
});