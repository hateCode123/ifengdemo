import { jsonp, ajax } from '@ifeng/ui_base';

// 获取微信分享二维码
export const getWeChatCode = async url => {
    return await jsonp(`//qrcode.ifeng.com/qrcode.php?url=${url}?_share=weixin`, {
        jsonpCallback: 'getWeChatCode',
        cache: false,
    });
};
