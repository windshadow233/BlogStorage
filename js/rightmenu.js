function setMask(){
    if(document.getElementsByClassName("rmMask")[0]!=undefined){
        return document.getElementsByClassName("rmMask")[0];
    }
    mask = document.createElement('div');
    mask.className = "rmMask";
    mask.style.width = window.innerWidth + 'px';
    mask.style.height = window.innerHeight + 'px';
    mask.style.background = '#fff';
    mask.style.opacity = '.0';
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.zIndex = 998;
    document.body.appendChild(mask);
    document.getElementById("rightMenu").style.zIndex=19198;
    return mask;
}
function removeMask(){
    if(document.getElementsByClassName("rmMask")[0]!=undefined){
        document.body.removeChild(mask);
    }
}
function isFullScreen() {
  return  !! (
      document.fullscreen || 
      document.mozFullScreen ||                         
      document.webkitIsFullScreen ||       
      document.webkitFullScreen || 
      document.msFullScreen 
   );
}
function fullScreen() {
    const body = document.body;
    if (isFullScreen()) {
        if(document.exitFullScreen) {
            document.exitFullScreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if(element.msExitFullscreen) {
            element.msExitFullscreen();
        }
        return;
    }
    if (body.requestFullscreen) {
        body.requestFullscreen();
    } else if (body.mozRequestFullScreen) { // Firefox
      body.mozRequestFullScreen();
    } else if (body.webkitRequestFullscreen) { // Chrome, Safari and Opera
      body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) { // Internet Explorer and Edge
      body.msRequestFullscreen();
    }
}
function insertAtCursor(myField, myValue) {

    //IE 浏览器
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }

    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
}
function downloadImageAsBlob(imageUrl) {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = imageUrl.split('/').pop();  
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);  // 清理用完的URL
            a.remove();  // 移除<a>标签
        })
        .catch(e => console.error(e));
}
let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
}
rmf.switchDarkMode = function () {
    $("#darkmode").click();
}
rmf.copyPageLink = function () {
    let url = window.location.href
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa)
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    Snackbar.show({
        text: '链接复制成功！快去分享吧！',
        pos: 'top-right',
        showAction: false
    });
}
rmf.switchReadMode = function () {
    $("#readmode").click();
}
rmf.copySelect = function () {
    document.execCommand('Copy', false, null);
    Snackbar.show({
        text: '复制成功！记得加上出处哦～',
        pos: 'top-right',
        showAction: false
    });
}
rmf.scrollToTop = function () {
    btf.scrollToDest();
}
rmf.translate = function () {
    $("#translateLink").click();
}
rmf.searchinThisPage = function () {
    removeMask();
    document.getElementsByClassName("search")[0].click();
    document.getElementsByClassName("DocSearch-Input")[0].value=window.getSelection().toString();
    var evt = document.createEvent("HTMLEvents");evt.initEvent("input", false, false);
    document.getElementsByClassName("DocSearch-Input")[0].dispatchEvent(evt);
}

function showLinkMenu(href) {
    $('#menu-to').show();
    rmf.open = function () {
        if(href.indexOf("http://")==-1&&href.indexOf("https://")==-1||href.indexOf(location.host)!=-1){
            pjax.loadUrl(href);
        }
        else{
            location.href = href;
        }
    }
    rmf.openInNewTab = function () {
        window.open(href);
    }
    rmf.copyLink = function () {
        let url = href;
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa);
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
        Snackbar.show({
            text: '链接复制成功！快去分享吧！',
            pos: 'top-right',
            showAction: false
        });
    }
}
function showImgMenu(src) {
    $('#menu-img').show();
    rmf.openImageInNewTab = function () {
        window.open(src);
    }
    rmf.copyImageLink = function () {
        let url = src;
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa);
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
        Snackbar.show({
            text: '图片链接复制成功！',
            pos: 'top-right',
            showAction: false
        });
    }
    rmf.saveAs=function(){
        downloadImageAsBlob(src);
    }
}
function popupMenu() {
    window.oncontextmenu = function (event) {
        if(event.ctrlKey) return true;
        $('#rightMenu .hide').hide();
        if (document.getSelection().toString()) {
            $('#menu-text').show();
        }
        if (document.getElementById('post-comment')) {
            $('#menu-comment').show();
        }
        if (document.getElementById('readmode')) {
            $('#menu-read').show();
        }
        el = event.target;
        var a=/^http(s)?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
        if (a.test(window.getSelection().toString())&&el.tagName!="A"){
            $('#menu-too').show();
        }
        if (el.tagName == 'A') {
            showLinkMenu(el.href);
        } else if (el.parentNode.tagName == 'A') {
            if (!(el.tagName == 'IMG' && el.src == el.parentNode.href))
                showLinkMenu(el.parentNode.href);
        }
        if (el.tagName == 'IMG') {
            showImgMenu(el.src);
        } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
            $('#menu-paste').show();
            rmf.paste = function () {
                navigator.permissions
                    .query({
                        name: 'clipboard-read'
                    })
                    .then(result => {
                        if (result.state == 'granted' || result.state == 'prompt') {
                            navigator.clipboard.readText().then(text => {
                                insertAtCursor(el, text)
                            })
                        } else {
                            Snackbar.show({
                                text: '请允许读取剪贴板！',
                                pos: 'top-center',
                                showAction: false,
                            })
                        }
                    })
            }
        }
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight + 10 - window.innerHeight;
        }
        mask=setMask();
        window.onscroll=()=>{
            rmf.showRightMenu(false);
            window.onscroll=()=>{};
            removeMask();
        }
        $(".rightMenu-item").click(()=>{
            removeMask();
        });
        $(window).resize(()=>{
            rmf.showRightMenu(false);
            removeMask();
        });
        mask.onclick=()=>{
            removeMask();
        }
        rmf.showRightMenu(true, pageY, pageX);
        return false;
    }
    window.addEventListener('click', function () {
        rmf.showRightMenu(false);
    });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    popupMenu()
}
const box = document.documentElement;

function addLongtabListener(target, callback) {
    let timer = 0;

    target.ontouchstart = () => {
        timer = 0;
        timer = setTimeout(() => {
            callback();
            timer = 0;
        }, 380);
    }

    target.ontouchmove = () => {
        clearTimeout(timer);
        timer = 0;
    }

    target.ontouchend = () => {
        if (timer) {
            clearTimeout(timer);
        }
    }
}

addLongtabListener(box, popupMenu);
