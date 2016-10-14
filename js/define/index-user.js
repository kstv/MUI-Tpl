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