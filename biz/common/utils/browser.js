/**
 * 浏览器判断
 */
const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];

exports.browser = ctx => {
    const ua = ctx.headers['user-agent'];

    return {
        // 是否微信
        weChat: !!ua.match(/micromessenger/i),

        // 是否QQ
        qq: !!ua.match(/QQ\/\d/),

        // 微博
        weiBo: !!ua.match(/WeiBo/i),

        // IE内核
        trident: ua.indexOf('Trident') > -1,

        // opera内核
        presto: ua.indexOf('Presto') > -1,

        // 苹果、谷歌内核
        webKit: ua.indexOf('AppleWebKit') > -1,

        // 火狐内核
        gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,

        // 是否为移动终端
        mobile: !!ua.match(/AppleWebKit.*Mobile.*/),

        // ios终端
        ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),

        // android终端或uc浏览器
        android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,

        // 是否为iPhone或者QQHD浏览器
        iPhone: ua.indexOf('iPhone') > -1,

        // 是否iPad
        iPad: ua.indexOf('iPad') > -1,

        // 是否web应该程序，没有头部与底部
        webApp: ua.indexOf('Safari') === -1,
    };
};

// 判断是否是pc浏览器
exports.isPC = ua => {
    let flag = true;

    for (let v = 0; v < Agents.length; v++) {
        if (ua.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }

    return flag;
};
