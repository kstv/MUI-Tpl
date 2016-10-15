define('', [], function (require, exports, module) {
    window.addEventListener('reLode', function () {
        window.location.reload();
    });
    mui.init({
        gestureConfig: { doubletap: true },
        subpages: [{
                url: 'index-main.html',
                id: 'index-main.html',
                styles: {
                    top: '0',
                    bottom: '45px',
                    bounce: 'vertical'
                }
            }]
    });
});