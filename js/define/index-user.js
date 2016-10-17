define('', [], function (require, exports, module) {
    window.addEventListener('reLode', function () {
        window.location.reload();
    });
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
                                console.log('\u4E0B\u62C9');
                                self.endPullDownToRefresh();
                            }, 1000);
                        }
                    },
                    up: {
                        callback: function () {
                            var self = this;
                            setTimeout(function () {
                                console.log('\u4E0A\u62C9');
                                self.endPullUpToRefresh();
                            }, 1000);
                        }
                    }
                });
            });
        });
    }(mui));
});