import { loadScript } from '@ifeng/ui_base';

/**
 * 解析广告信息，返回广告回调方法
 * @param { Object } ad
 */
const handleAd = async ad => {
    let callbackFn = null;

    try {
        if (ad.preload) {
            let list = [];
            let index = 0;

            if (typeof ad.preload === 'string') {
                list = [ad.preload];
            } else {
                list = ad.preload;
            }

            while (list.length > index) {
                const scriptUrl = list[index];

                console.log('load', scriptUrl);

                await loadScript(scriptUrl, { cache: false, reload: false });
                ++index;
            }
        }

        callbackFn = new Function(`return ${ad.callback}`)();
    } catch (error) {
        error.message = `AdError - ${error.message}`;

        console.error(error);
        console.error('AdError - AdData', ad);

        if (window && window.BJ_REPORT) window.BJ_REPORT.report(error);
    }

    return callbackFn;
};

const md5 = require('md5');
/**
 * 计算文章评论 skey
 * @param {string} title 文章标题
 * @param {string} pcUrl 文章 pcUrl
 */
const getSkey = (title, pcUrl) => {
    const str = `Ifeng888${encodeURI(title)}${encodeURI(pcUrl)}`;
    const skey = md5(str);

    return skey.substr(2, 6).toLowerCase();
};

/**
 * 处理新闻时间
 * @param {string} time 新闻时间
 */
const handleNewstime = time => {
    const d = new Date();

    time = time.substr(0, time.length - 3);
    const year = Number(time.split('-')[0]);

    if (year < d.getFullYear()) {
        return time;
    } else {
        return time.substr(5, time.length);
    }
};

export { handleAd, getSkey, handleNewstime };
