/**
 * 浏览器判断
 */
exports.browser = function (ctx) {
    let ua = ctx.headers['user-agent'];
    return {         //移动终端浏览器版本信息
        weChat: !!ua.match(/micromessenger/i),                          //是否微信
        qq: !!ua.match(/QQ\/\d/),                                         //是否QQ
        weiBo: !!ua.match(/WeiBo/i),                                      //微博
        trident: ua.indexOf('Trident') > -1,                             //IE内核
        presto: ua.indexOf('Presto') > -1,                               //opera内核
        webKit: ua.indexOf('AppleWebKit') > -1,                         //苹果、谷歌内核
        gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1,   //火狐内核
        mobile: !!ua.match(/AppleWebKit.*Mobile.*/),                   //是否为移动终端
        ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),               //ios终端
        android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: ua.indexOf('iPhone') > -1,                                //是否为iPhone或者QQHD浏览器
        iPad: ua.indexOf('iPad') > -1,                                     //是否iPad
        webApp: ua.indexOf('Safari') == -1                                //是否web应该程序，没有头部与底部
    }
};