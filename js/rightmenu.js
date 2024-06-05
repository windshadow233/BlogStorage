function setMask(){return null!=document.getElementsByClassName("rmMask")[0]?document.getElementsByClassName("rmMask")[0]:(mask=document.createElement("div"),mask.className="rmMask",mask.style.width=window.innerWidth+"px",mask.style.height=window.innerHeight+"px",mask.style.background="#fff",mask.style.opacity=".0",mask.style.position="fixed",mask.style.top="0",mask.style.left="0",mask.style.zIndex=998,document.body.appendChild(mask),document.getElementById("rightMenu").style.zIndex=19198,mask)}function removeMask(){null!=document.getElementsByClassName("rmMask")[0]&&document.body.removeChild(mask)}function isFullScreen(){return!!(document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen||document.webkitFullScreen||document.msFullScreen)}function fullScreen(){const e=document.body;isFullScreen()?document.exitFullScreen?document.exitFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():element.msExitFullscreen&&element.msExitFullscreen():e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function insertAtCursor(e,t){var n,o,s;document.selection?(e.focus(),sel=document.selection.createRange(),sel.text=t,sel.select()):e.selectionStart||"0"==e.selectionStart?(n=e.selectionStart,o=e.selectionEnd,s=e.scrollTop,e.value=e.value.substring(0,n)+t+e.value.substring(o,e.value.length),0<s&&(e.scrollTop=s),e.focus(),e.selectionStart=n+t.length,e.selectionEnd=n+t.length):(e.value+=t,e.focus())}function downloadImageAsBlob(n){fetch(n).then(e=>e.blob()).then(e=>{var t=window.URL.createObjectURL(e),e=document.createElement("a");e.style.display="none",e.href=t,e.download=n.split("/").pop(),document.body.appendChild(e),e.click(),window.URL.revokeObjectURL(t),e.remove()}).catch(e=>console.error(e))}let rmf={};function showLinkMenu(e){$("#menu-to").show(),rmf.open=function(){-1==e.indexOf("http://")&&-1==e.indexOf("https://")||-1!=e.indexOf(location.host)?pjax.loadUrl(e):location.href=e},rmf.openInNewTab=function(){window.open(e)},rmf.copyLink=async function(){try{await navigator.clipboard.writeText(e),Snackbar.show({text:"链接复制成功！快去分享吧！",pos:"top-right",showAction:!1})}catch(e){Snackbar.show({text:"复制失败了QAQ，再试一试吧！",pos:"top-right",showAction:!1})}}}function showImgMenu(e){$("#menu-img").show(),rmf.openImageInNewTab=function(){window.open(e)},rmf.copyImageLink=async function(){try{await navigator.clipboard.writeText(e),Snackbar.show({text:"图片链接复制成功！",pos:"top-right",showAction:!1})}catch(e){Snackbar.show({text:"复制失败了QAQ，再试一试吧！",pos:"top-right",showAction:!1})}},rmf.saveAs=function(){downloadImageAsBlob(e)}}function popupMenu(){window.oncontextmenu=function(e){if(e.ctrlKey)return!0;$("#rightMenu .hide").hide(),document.getSelection().toString()&&$("#menu-text").show(),document.getElementById("post-comment")&&$("#menu-comment").show(),document.getElementById("readmode")&&$("#menu-read").show(),el=e.target;/^http(s)?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(window.getSelection().toString())&&"A"!=el.tagName&&$("#menu-too").show(),"A"==el.tagName?showLinkMenu(el.href):"A"==el.parentNode.tagName&&("IMG"==el.tagName&&el.src==el.parentNode.href||showLinkMenu(el.parentNode.href)),"IMG"==el.tagName?showImgMenu(el.src):"TEXTAREA"!=el.tagName&&"INPUT"!=el.tagName||($("#menu-paste").show(),rmf.paste=function(){navigator.permissions.query({name:"clipboard-read"}).then(e=>{"granted"==e.state||"prompt"==e.state?navigator.clipboard.readText().then(e=>{insertAtCursor(el,e)}):Snackbar.show({text:"请允许读取剪贴板！",pos:"top-center",showAction:!1})})});let t=e.clientX+10,n=e.clientY;var o=$("#rightMenu").width(),e=$("#rightMenu").height();return t+o>window.innerWidth&&(t-=o+10),n+e>window.innerHeight&&(n-=n+e+10-window.innerHeight),mask=setMask(),window.onscroll=()=>{rmf.showRightMenu(!1),window.onscroll=()=>{},removeMask()},$(".rightMenu-item").click(()=>{removeMask()}),$(window).resize(()=>{rmf.showRightMenu(!1),removeMask()}),mask.onclick=()=>{removeMask()},rmf.showRightMenu(!0,n,t),!1},window.addEventListener("click",function(){rmf.showRightMenu(!1)})}rmf.showRightMenu=function(e,t=0,n=0){let o=$("#rightMenu");o.css("top",t+"px").css("left",n+"px"),e?o.show():o.hide()},rmf.switchDarkMode=function(){$("#darkmode").click()},rmf.copyPageLink=async function(){try{await navigator.clipboard.writeText(window.location.href),Snackbar.show({text:"链接复制成功！快去分享吧！",pos:"top-right",showAction:!1})}catch(e){Snackbar.show({text:"复制失败了QAQ，再试一试吧！",pos:"top-right",showAction:!1})}},rmf.switchReadMode=function(){$("#readmode").click()},rmf.copySelect=async function(){try{await navigator.clipboard.writeText(document.getSelection()),Snackbar.show({text:"复制成功！记得加上出处哦～",pos:"top-right",showAction:!1})}catch(e){Snackbar.show({text:"复制失败了QAQ，再试一试吧！",pos:"top-right",showAction:!1})}},rmf.scrollToTop=function(){btf.scrollToDest()},rmf.translate=function(){$("#translateLink").click()},rmf.searchinThisPage=function(){removeMask(),document.getElementsByClassName("search")[0].click(),document.getElementsByClassName("DocSearch-Input")[0].value=window.getSelection().toString();var e=document.createEvent("HTMLEvents");e.initEvent("input",!1,!1),document.getElementsByClassName("DocSearch-Input")[0].dispatchEvent(e)},navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)||popupMenu();const box=document.documentElement;function addLongtabListener(e,t){let n=0;e.ontouchstart=()=>{n=0,n=setTimeout(()=>{t(),n=0},380)},e.ontouchmove=()=>{clearTimeout(n),n=0},e.ontouchend=()=>{n&&clearTimeout(n)}}addLongtabListener(box,popupMenu);