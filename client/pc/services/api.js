import { jsonp, ajax } from '@ifeng/ui_base';
import { formatImage, formatUrl } from '@ifeng/public_method';
import { getSkey, handleNewstime } from '../utils/utils';

// apiUrl为webpack注入的全局变量
/* eslint-disable no-undef */
let apiBaseUrl = apiUrl;

/* eslint-enable no-undef */
if (/\.shank\.ifeng\.com/.test(window.location.hostname)) {
    apiBaseUrl = '/api';
}

const md5 = require('md5');

const createJsonpCallbackName = (str, num) => {
    num = num ? num : 0;
    let jsonpCallbackName = `_${md5(`${str}_${num}`)}`;

    while (window[jsonpCallbackName]) {
        num++;
        jsonpCallbackName = `_${md5(`${str}_${num}`)}`;
    }

    return jsonpCallbackName;
};

/* 公共 */

// 获取自选股数据
const getMyStockData = async num => {
    return await jsonp('//apiapp.finance.ifeng.com/mystock/get', {
        data: { num },
        jsonpCallback: createJsonpCallbackName('getMyStockData'),
        cache: false,
    });
};

// 获取股票数据
const getStockData = async codeList => {
    const callback = createJsonpCallbackName('getFinanceData');

    return await jsonp('//hq.finance.ifeng.com/q.php', {
        data: {
            l: codeList.join(','),
            f: 'json',
            e: `${callback}(json_q)`,
        },
        jsonpCallback: callback,
        cache: false,
    });
};

// 查询股票，资金，证券等数据
const getFinanceData = async (type, str) => {
    const callback = createJsonpCallbackName('getFinanceData');

    return await jsonp('//app.finance.ifeng.com/hq/suggest_v2.php', {
        data: {
            t: type,
            q: str,
            cb: `${callback}(suggest_json)`,
        },
        jsonpCallback: callback,
        cache: false,
    });
};

// 获取文章评论数
const getCommentCount = async url => {
    return await jsonp('//comment.ifeng.com/get.php', {
        data: {
            job: 4,
            format: 'js',
            callback: 'getAllComment1',
            docurl: url.join('|'),
        },
        jsonCallback: 'getAllComment1',
        cache: false,
    });
};

/* 财首 */

// 获取 7 * 24 数据
const getTopicData = async () => {
    return await jsonp('//api3.finance.ifeng.com/live/getnew', {
        data: {
            level: 1,
            dist: 1,
            cb: 'setNewCont',
        },
        jsonp: 'cb',
        jsonpCallback: 'setNewCont',
        cache: false,
    });
};

// 获取资金流向数据
const getFundsFlowData = async () => {
    return await jsonp('//i.finance.ifeng.com/moneyflow/flow/So', {
        jsonpCallback: 'getFundsFlowData',
        cache: false,
    });
};

// 根据自媒体账号 id 获取自媒体账号头像
const getwemediaEAccountImg = async wemediaEAccountId => {
    const data = await jsonp(
        `${apiBaseUrl}/finance/index/getwemediaEAccountImg/${wemediaEAccountId}/getwemediaEAccountImg`,
        {
            jsonpCallback: 'getwemediaEAccountImg',
            cache: false,
        },
    );

    let img = '';

    if (data.code === 0) {
        img = data.data.headImage && data.data.headImage !== '' ? formatImage(data.data.headImage, 50, 50) : '';
    }

    return img;
};

// 获取信息流首页数据
const getCustomList = async () => {
    const data = await jsonp(`${apiBaseUrl}/finance/index/customList/getCustomList`, {
        jsonpCallback: 'getCustomList',
        cache: false,
    });

    const result = data.data.map(item => ({
        thumbnails: formatImage(item.thumbnail, 144, 96),
        commentUrl: item.commentUrl,
        pcUrl: item.pcUrl,
        url: formatUrl(item.url),
        title: item.title,
        source: item.source,
        newsTime: handleNewstime(item.createdTime || item.startTime),
        skey: getSkey(item.title, item.pcUrl),
    }));

    return result;
};

// 获取信息流宏观数据
const getMacroList = async () => {
    const data = await jsonp(`${apiBaseUrl}/finance/index/macroList/getMacroList`, {
        jsonpCallback: 'getMacroList',
        cache: false,
    });

    const result = data.data.data.map(item => ({
        thumbnails:
            item.thumbnails && item.thumbnails.image && item.thumbnails.image[0]
                ? formatImage(item.thumbnails.image[0].url, 144, 96)
                : '',
        commentUrl: item.commentUrl,
        pcUrl: item.url,
        url: formatUrl(item.url),
        title: item.title,
        source: item.source,
        newsTime: handleNewstime(item.newsTime),
        skey: item.skey,
    }));

    return result;
};

// 获取信息流股票数据
const getStockList = async () => {
    const data = await jsonp(`${apiBaseUrl}/finance/index/stockList/getStockList`, {
        jsonpCallback: 'getStockList',
        cache: false,
    });

    const result = data.data.data.map(item => ({
        thumbnails:
            item.thumbnails && item.thumbnails.image && item.thumbnails.image[0]
                ? formatImage(item.thumbnails.image[0].url, 144, 96)
                : '',
        commentUrl: item.commentUrl,
        pcUrl: item.url,
        url: formatUrl(item.url),
        title: item.title,
        source: item.source,
        newsTime: handleNewstime(item.newsTime),
        skey: item.skey,
    }));

    return result;
};

// 获取信息流 imarkets 数据
const getImarketsList = async () => {
    const data = await jsonp(`${apiBaseUrl}/finance/index/imarketsList/getImarketsList`, {
        jsonpCallback: 'getImarketsList',
        cache: false,
    });

    const result = data.data.data.map(item => ({
        thumbnails:
            item.thumbnails && item.thumbnails.image && item.thumbnails.image[0]
                ? formatImage(item.thumbnails.image[0].url, 144, 96)
                : '',
        commentUrl: item.commentUrl,
        pcUrl: item.url,
        url: formatUrl(item.url),
        title: item.title,
        source: item.source,
        newsTime: handleNewstime(item.newsTime),
        skey: item.skey,
    }));

    return result;
};

// 获取信息流公司抓取数据
const getCompanyList = async () => {
    const data = await jsonp(`${apiBaseUrl}/finance/index/companyList/getCompanyList`, {
        jsonpCallback: 'getCompanyList',
        cache: false,
    });

    const result = data.data.data.map(item => ({
        thumbnails:
            item.thumbnails && item.thumbnails.image && item.thumbnails.image[0]
                ? formatImage(item.thumbnails.image[0].url, 144, 96)
                : '',
        commentUrl: item.commentUrl,
        pcUrl: item.url,
        url: formatUrl(item.url),
        title: item.title,
        source: item.source,
        newsTime: handleNewstime(item.newsTime),
        skey: item.skey,
    }));

    return result;
};

// 获取信息流 Wemoney 数据
const getWemoneyList = async () => {
    const data = await jsonp(`${apiBaseUrl}/finance/index/wemoneyList/getWemoneyList`, {
        jsonpCallback: 'getWemoneyList',
        cache: false,
    });

    const result = data.data.data.map(item => ({
        thumbnails:
            item.thumbnails && item.thumbnails.image && item.thumbnails.image[0]
                ? formatImage(item.thumbnails.image[0].url, 144, 96)
                : '',
        commentUrl: item.commentUrl,
        pcUrl: item.url,
        url: formatUrl(item.url),
        title: item.title,
        source: item.source,
        newsTime: handleNewstime(item.newsTime),
        skey: item.skey,
    }));

    return result;
};

/* 股首 */

// 获取24小时直播数据
const getLiveData = async today => {
    return await jsonp('//api3.finance.ifeng.com/live/getday', {
        data: {
            beg: Date.parse(`${today} 00:00:00`) / 1000,
            end: Date.parse(`${today} 23:59:59`) / 1000,
            level: 1,
            dist: 1,
        },
        jsonp: 'cb',
        jsonpCallback: 'getLiveData',
        cache: false,
    });
};

// 刷新24小时直播数据
const refreshLiveData = async lastid => {
    return await jsonp('//api3.finance.ifeng.com/live/getnew', {
        data: {
            lastid,
            level: 1,
            dist: 1,
        },
        jsonp: 'cb',
        jsonpCallback: 'addNewData',
        cache: false,
    });
};

// 获取股票涨跌排行数据
const getStockRank = async type => {
    const data = await jsonp('//app.finance.ifeng.com/stockindex/getStockRank.php', {
        data: {
            type,
        },
        jsonpCallback: 'getStockRank',
        cache: false,
    });

    if (data.data) {
        data.data.forEach(item => {
            if (item.news !== '') {
                item.news = formatUrl(item.news);
            }
        });
    }

    return data;
};

// 获取资金流向排行数据
const getFundsFlowRank = async type => {
    const data = await jsonp('//app.finance.ifeng.com/stockindex/getZijinRank.php', {
        data: {
            type,
        },
        jsonpCallback: 'getFundsFlowRank',
        cache: false,
    });

    if (data.data) {
        data.data.forEach(item => {
            if (item.news !== '') {
                item.news = formatUrl(item.news);
            }
        });
    }

    return data;
};

// 获取热门股票数据
const getHotStockData = async () => {
    return await jsonp('//apiapp.finance.ifeng.com/hotstockrank', {
        data: {
            type: 'wx',
            callback: 'getHotStockData',
        },
        jsonpCallback: 'getHotStockData',
        cache: false,
    });
};

// 获取分析师数据
const getAnalyzerInfo = async (name, type) => {
    const callback = createJsonpCallbackName('updateAnalyzerInfo');

    const data = await jsonp('//app.finance.ifeng.com/gszb/user_ol.php', {
        data: {
            name,
            type,
            cb: callback,
        },
        jsonpCallback: callback,
        cache: false,
    });

    return data.map(item => ({
        url: item.url === '' ? '' : formatUrl(item.url),
        image: formatImage(item.image, 60, 60),
    }));
};

// 获取分析师答疑数据
const getQAData = async (name, type) => {
    const callback = createJsonpCallbackName('getQAData');

    return await jsonp('//app.finance.ifeng.com/gszb/a_data.php', {
        data: {
            name,
            type,
            cb: callback,
        },
        jsonpCallback: callback,
        cache: false,
    });
};

// 投资观察，获取分析师答疑，参数与股票首页不同

const getQADataTzgc = async (user, type) => {
    const callback = createJsonpCallbackName('getQAData');

    return await jsonp('//app.finance.ifeng.com/gszb/a_data.php', {
        data: {
            user,
            type,
            cb: callback,
        },
        jsonpCallback: callback,
        cache: false,
    });
};

// imarkets 直播室标题
const getZhiboTitle = async () => {
    return await jsonp('http://api3.finance.ifeng.com/live/getnew', {
        data: {
            level: 1,
            dist: 1,
            cb: 'setNewCont',
        },
        cache: false,
        jsonpCallback: 'setNewCont',
    });
};

/**
 * 港股首页搜索股票推荐接口
 * @param {string} keyword
 */
const searchStockSuggest = async keyword => {
    const timestamp = Date.parse(new Date());
    const token = md5(`${timestamp}#ifeng`);

    return await jsonp(
        `http://ifeng.szfuit.com:83/hkquote/api/search.php?keyword=${keyword}&number=20&_callback=search_suggest&_timestamp=${timestamp}&_token=${token}`,
        {
            cache: false,
            jsonpCallback: 'search_suggest',
        },
    );
};

export {
    getMyStockData,
    getStockData,
    getFinanceData,
    getCommentCount,
    getTopicData,
    getFundsFlowData,
    getwemediaEAccountImg,
    getCustomList,
    getMacroList,
    getStockList,
    getImarketsList,
    getCompanyList,
    getWemoneyList,
    getLiveData,
    refreshLiveData,
    getStockRank,
    getFundsFlowRank,
    getHotStockData,
    getAnalyzerInfo,
    getQAData,
    getQADataTzgc,
    getZhiboTitle,
    searchStockSuggest,
};
