import $ from "https://cdn.bootcss.com/jquery/3.5.1/jquery.min.js"
var userAgent = navigator.userAgent.toLowerCase();
var baseUrl = !!document.getElementById('com').getAttribute('data-baseurl') ? document.getElementById('com').getAttribute('data-baseurl') : window.location.protocol + "//" + wind;
console.log(baseUrl);

// 适配H5
export function suitH5Fun(width) {
    var doc = document
    var win = window
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        // recalc = function () {
        //     var clientWidth = docEl.clientWidth;
        //     console.log(clientWidth);
        //     if (!clientWidth) return;
        //     if (clientWidth >= width) {
        //         console.log(1);
        //         docEl.style.fontSize = '1px';
        //     } else {
        //         console.log(2);
        //         docEl.style.fontSize = (clientWidth / width) + 'px';
        //     }
        // };
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            console.log(clientWidth);
            if (!clientWidth) return;
            if (clientWidth >= width) {
                console.log(1);
                docEl.style.fontSize = '100px';
            } else {
                console.log(2);
                docEl.style.fontSize = 100 * (clientWidth / width) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}

// 判断是否为ios
export function isIOS() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return true
    }
    return false
}

// 判断是否为H5
export function isH5() {
    if (
        userAgent.match(
            /(iphone|ipod|ipad|android|blackberry|bb10|windows phone|tizen|bada)/
        )
    ) {
        return true
    } else {
        return false
    }
}

// 封装ajax
export function ajaxApi(type, url, data, token , callback) {
    $.ajax({
        url: baseUrl + url,
        type: type,
        // xhrFields: {
        //     'withCredentials': true, //必须开启这个参数才会传递cookie
        // },
        dataType: 'json',
        data: data,
        headers:!!token? {
            'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'bearer ' + token
        }: {},
        success: function (data) {
            if (data.code != 0) {
                util.tips(data.msg, 2000)
            } else {
                typeof callback == 'function' && callback(data);
            }
        },
        error: function (xhr, type) {
            if (xhr.status == 302 || xhr.status == 304) {
                window.location.href = xhr.responseText;
            } else if (xhr.status == 429) {
                alert("请求频繁，请稍后再试！")
            } else if (xhr.status == 419) {
                alert("请求参数错误！")
            } else if (xhr.status == 500) {
                alert("系统繁忙，请稍后再试！")
            }else{
                alert(xhr.msg)
            }
        }
    });
}

// 判断是否为是微信
export function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

// 获取链接参数
export function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}