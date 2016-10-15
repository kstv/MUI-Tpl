define('', [], function (require, exports, module) {
    window.addEventListener('reLode', function () {
        window.location.reload();
    });
    mui.init({
        gestureConfig: { doubletap: true },
        subpages: [{
                url: 'index-3.html',
                id: 'index-3.html',
                styles: {
                    top: '0',
                    bottom: '45px',
                    bounce: 'vertical'
                }
            }]
    });
});