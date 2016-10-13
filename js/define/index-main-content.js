define('', [], function (require, exports, module) {
    window.addEventListener('reLode', function () {
        window.location.reload();
    });
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: { callback: pulldownRefresh },
            up: {
                contentrefresh: '\u6B63\u5728\u52A0\u8F7D...',
                callback: pullupRefresh
            }
        }
    });
    function pulldownRefresh() {
        console.log('\u4E0B\u62C9\u4E86');
        setTimeout(function () {
            var html = $('.issue-list:nth-child(1)').clone();
            $('.issue-container').prepend(html);
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
        }, 1500);
    }
    var count = 0;
    function pullupRefresh() {
        console.log('\u4E0A\u62C9\u4E86');
        setTimeout(function () {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(++count > 2);
            var table = document.body.querySelector('.mui-table-view');
            var list = $('.issue-list');
            var html = $('.issue-list:nth-child(1)').clone();
            for (var i = list.length, len = i + 20; i < len; i++) {
                $('.issue-container').prepend(html);
            }
        }, 1500);
    }
    if (mui.os.plus) {
        mui.plusReady(function () {
            setTimeout(function () {
                mui('#pullrefresh').pullRefresh().pullupLoading();
            }, 1000);
        });
    } else {
        mui.ready(function () {
            mui('#pullrefresh').pullRefresh().pullupLoading();
        });
    }
});