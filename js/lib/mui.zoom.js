!function(o,t){var e=o.className("zoom"),n=o.className("zoom-scroller"),r="."+e,a="."+n,i="pinchstart",s="pinch",l="pinchend";"ongesturestart"in t&&(i="gesturestart",s="gesturechange",l="gestureend"),o.Zoom=function(t,e){var n=this;n.options=o.extend(o.Zoom.defaults,e),n.wrapper=n.element=t,n.scroller=t.querySelector(a),n.scrollerStyle=n.scroller&&n.scroller.style,n.zoomer=t.querySelector(r),n.zoomerStyle=n.zoomer&&n.zoomer.style,n.init=function(){o.options.gestureConfig.pinch=!0,o.options.gestureConfig.doubletap=!0,n.initEvents()},n.initEvents=function(t){var e=t?"removeEventListener":"addEventListener",r=n.scroller;r[e](i,n.onPinchstart),r[e](s,n.onPinch),r[e](l,n.onPinchend),r[e](o.EVENT_START,n.onTouchstart),r[e](o.EVENT_MOVE,n.onTouchMove),r[e](o.EVENT_CANCEL,n.onTouchEnd),r[e](o.EVENT_END,n.onTouchEnd),r[e]("drag",n.dragEvent),r[e]("doubletap",n.doubleTapEvent)},n.dragEvent=function(o){(d||u)&&o.stopPropagation()},n.doubleTapEvent=function(o){n.toggleZoom(o.detail.center)},n.transition=function(o,t){return t=t||0,o.webkitTransitionDuration=t+"ms",n},n.translate=function(o,t,e){return t=t||0,e=e||0,o.webkitTransform="translate3d("+t+"px,"+e+"px,0px)",n},n.scale=function(o,t){return t=t||1,o.webkitTransform="translate3d(0,0,0) scale("+t+")",n},n.scrollerTransition=function(o){return n.transition(n.scrollerStyle,o)},n.scrollerTransform=function(o,t){return n.translate(n.scrollerStyle,o,t)},n.zoomerTransition=function(o){return n.transition(n.zoomerStyle,o)},n.zoomerTransform=function(o){return n.scale(n.zoomerStyle,o)};var m=1,c=1,f=!1,u=!1;n.onPinchstart=function(o){u=!0},n.onPinch=function(o){f||(n.zoomerTransition(0),f=!0),m=(o.detail?o.detail.scale:o.scale)*c,m>n.options.maxZoom&&(m=n.options.maxZoom-1+Math.pow(m-n.options.maxZoom+1,.5)),m<n.options.minZoom&&(m=n.options.minZoom+1-Math.pow(n.options.minZoom-m+1,.5)),n.zoomerTransform(m)},n.onPinchend=function(o){m=Math.max(Math.min(m,n.options.maxZoom),n.options.minZoom),n.zoomerTransition(n.options.speed).zoomerTransform(m),c=m,f=!1},n.setZoom=function(o){m=c=o,n.scrollerTransition(n.options.speed).scrollerTransform(0,0),n.zoomerTransition(n.options.speed).zoomerTransform(m)},n.toggleZoom=function(t,e){if("number"==typeof t&&(e=t,t=void 0),e="undefined"==typeof e?n.options.speed:e,m&&1!==m)m=c=1,n.scrollerTransition(e).scrollerTransform(0,0);else if(m=c=n.options.maxZoom,t){var r=o.offset(n.zoomer),a=r.top,i=r.left,s=(t.x-i)*m,l=(t.y-a)*m;this._cal(),s>=x&&s<=x+p?s=x-s+p/2:s<x?s=x-s+p/2:s>x+p&&(s=x+p-s-p/2),l>=y&&l<=y+h?l=y-l+h/2:l<y?l=y-l+h/2:l>y+h&&(l=y+h-l-h/2),s=Math.min(Math.max(s,E),x),l=Math.min(Math.max(l,v),y),n.scrollerTransition(e).scrollerTransform(s,l)}else n.scrollerTransition(e).scrollerTransform(0,0);n.zoomerTransition(e).zoomerTransform(m)},n._cal=function(){p=n.wrapper.offsetWidth,h=n.wrapper.offsetHeight,z=n.zoomer.offsetWidth,w=n.zoomer.offsetHeight;var o=z*m,t=w*m;E=Math.min(p/2-o/2,0),x=-E,v=Math.min(h/2-t/2,0),y=-v};var p,h,T,d,g,M,E,v,x,y,z,w,Z,b,N,S,V,_,A,P={},k={};return n.onTouchstart=function(t){t.preventDefault(),T=!0,P.x=t.type===o.EVENT_START?t.targetTouches[0].pageX:t.pageX,P.y=t.type===o.EVENT_START?t.targetTouches[0].pageY:t.pageY},n.onTouchMove=function(t){if(t.preventDefault(),T){if(!d){p=n.wrapper.offsetWidth,h=n.wrapper.offsetHeight,z=n.zoomer.offsetWidth,w=n.zoomer.offsetHeight;var e=o.parseTranslateMatrix(o.getStyles(n.scroller,"webkitTransform"));Z=e.x||0,b=e.y||0,n.scrollerTransition(0)}var r=z*m,a=w*m;if(!(r<p&&a<h)){if(E=Math.min(p/2-r/2,0),x=-E,v=Math.min(h/2-a/2,0),y=-v,k.x=t.type===o.EVENT_MOVE?t.targetTouches[0].pageX:t.pageX,k.y=t.type===o.EVENT_MOVE?t.targetTouches[0].pageY:t.pageY,!d&&!f&&(Math.floor(E)===Math.floor(Z)&&k.x<P.x||Math.floor(x)===Math.floor(Z)&&k.x>P.x))return void(T=!1);d=!0,g=k.x-P.x+Z,M=k.y-P.y+b,g<E&&(g=E+1-Math.pow(E-g+1,.8)),g>x&&(g=x-1+Math.pow(g-x+1,.8)),M<v&&(M=v+1-Math.pow(v-M+1,.8)),M>y&&(M=y-1+Math.pow(M-y+1,.8)),N||(N=k.x),_||(_=k.y),S||(S=o.now()),V=(k.x-N)/(o.now()-S)/2,A=(k.y-_)/(o.now()-S)/2,Math.abs(k.x-N)<2&&(V=0),Math.abs(k.y-_)<2&&(A=0),N=k.x,_=k.y,S=o.now(),n.scrollerTransform(g,M)}}},n.onTouchEnd=function(o){if(o.touches.length||(u=!1),!T||!d)return T=!1,void(d=!1);T=!1,d=!1;var t=300,e=300,r=V*t,a=g+r,i=A*e,s=M+i;0!==V&&(t=Math.abs((a-g)/V)),0!==A&&(e=Math.abs((s-M)/A));var l=Math.max(t,e);g=a,M=s;var c=z*m,f=w*m;E=Math.min(p/2-c/2,0),x=-E,v=Math.min(h/2-f/2,0),y=-v,g=Math.max(Math.min(g,x),E),M=Math.max(Math.min(M,y),v),n.scrollerTransition(l).scrollerTransform(g,M)},n.destroy=function(){n.initEvents(!0),delete o.data[n.wrapper.getAttribute("data-zoomer")],n.wrapper.setAttribute("data-zoomer","")},n.init(),n},o.Zoom.defaults={speed:300,maxZoom:3,minZoom:1},o.fn.zoom=function(t){var e=[];return this.each(function(){var n=null,r=this,a=r.getAttribute("data-zoomer");a?n=o.data[a]:(a=++o.uuid,o.data[a]=n=new o.Zoom(r,t),r.setAttribute("data-zoomer",a)),e.push(n)}),1===e.length?e[0]:e}}(mui,window);