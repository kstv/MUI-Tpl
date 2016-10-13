define('', [], function (require, exports, module) {
    window.addEventListener('reLode', function () {
        window.location.reload();
    });
    mui.init({
        gestureConfig: { doubletap: true },
        subpages: [{
                url: 'index-main-content.html',
                id: 'index-main-content.html',
                styles: {
                    top: '45px',
                    bottom: '0',
                    bounce: 'vertical'
                }
            }]
    });
    mui.plusReady(function () {
        plus.screen.lockOrientation('portrait-primary');
    });
    var contentWebview = null;
    document.querySelector('header').addEventListener('doubletap', function () {
        if (contentWebview == null) {
            contentWebview = plus.webview.currentWebview().children()[0];
        }
        contentWebview.evalJS('mui(\'#pullrefresh\').pullRefresh().scrollTo(0,0,100)');
    });
});