!function(t,e,n){var i=0;t.Lazyload=t.Class.extend({init:function(e,n){this.container=this.element=e,this.options=t.extend({selector:"",diff:!1,force:!1,autoDestroy:!0,duration:100},n),this._key=0,this._containerIsNotDocument=9!==this.container.nodeType,this._callbacks={},this._init()},_init:function(){this._initLoadFn(),this.addElements(),this._loadFn(),t.ready(function(){this._loadFn()}.bind(this)),this.resume()},_initLoadFn:function(){var e=this;e._loadFn=this._buffer(function(){e.options.autoDestroy&&0==e._counter&&t.isEmptyObject(e._callbacks)&&e.destroy(),e._loadItems()},e.options.duration,e)},_createLoader:function(t){var e,n,i,o=[];return function(r){return n||(n=!0,t(function(t){for(e=t;i=o.shift();)try{i&&i.apply(null,[e])}catch(t){setTimeout(function(){throw t},0)}})),e?(r&&r.apply(null,[e]),e):(r&&o.push(r),e)}},_buffer:function(e,n,i){function o(){r&&(r.cancel(),r=0),s=t.now(),e.apply(i||this,arguments),a=t.now()}var r,s=0,a=0,n=n||150;return t.extend(function(){!s||a>=s&&t.now()-a>n||a<s&&t.now()-s>8*n?o():(r&&r.cancel(),r=t.later(o,n,null,arguments))},{stop:function(){r&&(r.cancel(),r=0)}})},_getBoundingRect:function(n){var i,o,r,s;if(void 0!==n){i=n.offsetHeight,o=n.offsetWidth;var a=t.offset(n);r=a.left,s=a.top}else i=e.innerHeight,o=e.innerWidth,r=0,s=e.pageYOffset;var c=this.options.diff,l=c===!1?o:c,h=0,d=l,u=c===!1?i:c,f=0,_=u,m=r+o,v=s+i;return r-=h,m+=d,s-=f,v+=_,{left:r,top:s,right:m,bottom:v}},_cacheWidth:function(t){return t._mui_lazy_width?t._mui_lazy_width:t._mui_lazy_width=t.offsetWidth},_cacheHeight:function(t){return t._mui_lazy_height?t._mui_lazy_height:t._mui_lazy_height=t.offsetHeight},_isCross:function(t,e){var n={};return n.top=Math.max(t.top,e.top),n.bottom=Math.min(t.bottom,e.bottom),n.left=Math.max(t.left,e.left),n.right=Math.min(t.right,e.right),n.bottom>=n.top&&n.right>=n.left},_elementInViewport:function(e,n,i){if(!e.offsetWidth)return!1;var o,r=t.offset(e),s=!0,a=r.left,c=r.top,l={left:a,top:c,right:a+this._cacheWidth(e),bottom:c+this._cacheHeight(e)};return o=this._isCross(n,l),o&&i&&(s=this._isCross(i,l)),s&&o},_loadItems:function(){var e=this;e._containerIsNotDocument&&!e.container.offsetWidth||(e._windowRegion=e._getBoundingRect(),e._containerIsNotDocument&&(e._containerRegion=e._getBoundingRect(this.container)),t.each(e._callbacks,function(t,n){n&&e._loadItem(t,n)}))},_loadItem:function(t,e){var n=this;if(e=e||n._callbacks[t],!e)return!0;var i=e.el,o=!1,r=e.fn;if(n.options.force||n._elementInViewport(i,n._windowRegion,n._containerRegion))try{o=r.call(n,i,t)}catch(t){setTimeout(function(){throw t},0)}return o!==!1&&delete n._callbacks[t],o},addCallback:function(e,n){var i=this,o=i._callbacks,r={el:e,fn:n||t.noop},s=++this._key;o[s]=r,i._windowRegion?i._loadItem(s,r):i.refresh()},addElements:function(e){var n=this;n._counter=n._counter||0;var o=[];!e&&n.options.selector?o=n.container.querySelectorAll(n.options.selector):t.each(e,function(e,i){o=o.concat(t.qsa(n.options.selector,i))}),t.each(o,function(t,e){e.getAttribute("data-lazyload-id")||n.addElement(e)&&(e.setAttribute("data-lazyload-id",i++),n.addCallback(e,n.handle))})},addElement:function(t){return!0},handle:function(){},refresh:function(t){t&&this.addElements(),this._loadFn()},pause:function(){var n=this._loadFn;this._destroyed||(e.removeEventListener("scroll",n),e.removeEventListener(t.EVENT_MOVE,n),e.removeEventListener("resize",n),this._containerIsNotDocument&&(this.container.removeEventListener("scrollend",n),this.container.removeEventListener("scroll",n),this.container.removeEventListener(t.EVENT_MOVE,n)))},resume:function(){var n=this._loadFn;this._destroyed||(e.addEventListener("scroll",n,!1),e.addEventListener(t.EVENT_MOVE,n,!1),e.addEventListener("resize",n,!1),this._containerIsNotDocument&&(this.container.addEventListener("scrollend",n,!1),this.container.addEventListener("scroll",n,!1),this.container.addEventListener(t.EVENT_MOVE,n,!1)))},destroy:function(){var e=this;e.pause(),e._callbacks={},t.trigger(this.container,"destroy",e),e._destroyed=1}})}(mui,window,document);