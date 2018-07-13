import { jsonp, ajax } from '@ifeng/ui_base';

const createJsonpCallbackName = (str, num) => {
    const md5 = require('md5');

    num = num ? num : 0;
    const jsonpCallbackName = `_${md5(`${str}_${num}`)}`;

    if (window[jsonpCallbackName]) {
        num++;
        createJsonpCallbackName(str, num);
    } else {
        return jsonpCallbackName;
    }
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
    return await jsonp('//hq.finance.ifeng.com/q.php', {
        data: {
            l: codeList.join(','),
            f: 'json',
            e: 'getStock(json_q)',
        },
        jsonpCallback: createJsonpCallbackName('getStock'),
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

// 获取信息流首页数据
const getCustomList = async () => {
    return await ajax('/api/finance/index/customList');
};

// 获取信息流宏观数据
const getMacroList = async () => {
    return await ajax('/api/finance/index/macroList');
};

// 获取信息流股票数据
const getStockList = async () => {
    return await ajax('/api/finance/index/stockList');
};

// 获取信息流 imarkets 数据
const getImarketsList = async () => {
    return await ajax('/api/finance/index/imarketsList');
};

// 获取信息流公司抓取数据
const getCompanyList = async () => {
    return await ajax('/api/finance/index/companyList');
};

// 获取信息流 Wemoney 数据
const getWemoneyList = async () => {
    return await ajax('/api/finance/index/wemoneyList');
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
    return await jsonp('//app.finance.ifeng.com/stockindex/getStockRank.php', {
        data: {
            type,
        },
        jsonpCallback: 'getStockRank',
        cache: false,
    });
};

// 获取资金流向排行数据
const getFundsFlowRank = async type => {
    return await jsonp('//app.finance.ifeng.com/stockindex/getZijinRank.php', {
        data: {
            type,
        },
        jsonpCallback: 'getFundsFlowRank',
        cache: false,
    });
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
    return await jsonp('//app.finance.ifeng.com/gszb/user_ol.php', {
        data: {
            name,
            type,
            cb: createJsonpCallbackName('updateAnalyzerInfo'),
        },
        jsonpCallback: createJsonpCallbackName('updateAnalyzerInfo'),
        cache: false,
    });
};

// 获取分析师答疑数据
const getQAData = async (name, type) => {
    return await jsonp('//app.finance.ifeng.com/gszb/a_data.php', {
        data: {
            name,
            type,
            cb: createJsonpCallbackName('getQAData'),
        },
        jsonpCallback: createJsonpCallbackName('getQAData'),
        cache: false,
    });
};

export {
    getMyStockData,
    getStockData,
    getFinanceData,
    getCommentCount,
    getTopicData,
    getFundsFlowData,
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
};
