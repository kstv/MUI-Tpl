!function(){var e=1,t=null,i=0,n=0,s={question:document.getElementById("question"),contact:document.getElementById("contact"),imageList:document.getElementById("image-list"),submitBtn:document.getElementById("submit")},a="https://service.dcloud.net.cn/feedback";s.files=[],s.uploader=null,s.deviceInfo=null,mui.plusReady(function(){s.deviceInfo={appid:plus.runtime.appid,imei:plus.device.imei,images:s.files,p:mui.os.android?"a":"i",md:plus.device.model,app_version:plus.runtime.version,plus_version:plus.runtime.innerVersion,os:mui.os.version,net:""+plus.networkinfo.getCurrentType()}}),s.clearForm=function(){s.question.value="",s.contact.value="",s.imageList.innerHTML="",s.newPlaceholder(),s.files=[],e=0,t=0,i=0,n=0,mui(".icons i").each(function(e,t){t.classList.contains("mui-icon-star-filled")&&(t.classList.add("mui-icon-star"),t.classList.remove("mui-icon-star-filled"))})},s.getFileInputArray=function(){return[].slice.call(s.imageList.querySelectorAll(".file"))},s.addFile=function(t){s.files.push({name:"images"+e,path:t}),e++},s.newPlaceholder=function(){var e=s.getFileInputArray();if(!(e&&e.length>0&&e[e.length-1].parentNode.classList.contains("space"))){i++;var n=document.createElement("div");n.setAttribute("class","image-item space");var a=document.createElement("div");a.setAttribute("class","image-up");var o=document.createElement("div");o.setAttribute("class","image-close"),o.innerHTML="X",o.addEventListener("tap",function(e){return setTimeout(function(){s.imageList.removeChild(n)},0),!1},!1);var l=document.createElement("div");l.setAttribute("class","file"),l.setAttribute("id","image-"+i),l.addEventListener("tap",function(e){var i=this,o=this.id.substr(-1);plus.gallery.pick(function(e){var l=e.substr(e.lastIndexOf("/")+1);console.log("name:"+l),plus.zip.compressImage({src:e,dst:"_doc/"+l,overwrite:!0,quality:50},function(l){return t+=l.size,console.log("filesize:"+l.size+",totalsize:"+t),t>10485760?mui.toast("文件超大,请重新选择~"):(i.parentNode.classList.contains("space")?(n.classList.remove("space"),s.addFile(l.target),s.newPlaceholder()):s.files.splice(o-1,1,{name:"images"+o,path:e}),a.classList.remove("image-up"),void(n.style.backgroundImage="url("+l.target+")"))},function(e){mui.toast("压缩失败！")})},function(e){mui.toast(e.message)},{})},!1),n.appendChild(o),n.appendChild(a),n.appendChild(l),s.imageList.appendChild(n)}},s.newPlaceholder(),s.submitBtn.addEventListener("tap",function(e){return""==s.question.value||""!=s.contact.value&&0!=s.contact.value.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|([1-9]\d{4,9})$/)?mui.toast("信息填写不符合规范"):s.question.value.length>200||s.contact.value.length>200?mui.toast("信息超长,请重新填写~"):plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE?mui.toast("连接网络失败，请稍后再试"):void s.send(mui.extend({},s.deviceInfo,{content:s.question.value,contact:s.contact.value,images:s.files,score:""+n}))},!1),s.send=function(e){s.uploader=plus.uploader.createUpload(a,{method:"POST"},function(e,t){if(console.log("upload cb:"+e.responseText),200==t){var i=JSON.parse(e.responseText);0===i.ret&&"Success"===i.desc&&console.log("upload success")}else console.log("upload fail")}),mui.each(e,function(e,t){"images"!==e&&(console.log("addData:"+e+","+t),s.uploader.addData(e,t))}),mui.each(s.files,function(e,t){var i=s.files[e];console.log("addFile:"+JSON.stringify(i)),s.uploader.addFile(i.path,{key:i.name})}),s.uploader.start(),mui.alert("感谢反馈，点击确定关闭","问题反馈","确定",function(){s.clearForm(),mui.back()})},mui(".icons").on("tap","i",function(){var e=parseInt(this.getAttribute("data-index")),t=this.parentNode,i=t.children;if(this.classList.contains("mui-icon-star"))for(var s=0;s<e;s++)i[s].classList.remove("mui-icon-star"),i[s].classList.add("mui-icon-star-filled");else for(var s=e;s<5;s++)i[s].classList.add("mui-icon-star"),i[s].classList.remove("mui-icon-star-filled");n=e}),mui(".mui-popover").on("tap","li",function(e){document.getElementById("question").value=document.getElementById("question").value+this.children[0].innerHTML,mui(".mui-popover").popover("toggle")})}();