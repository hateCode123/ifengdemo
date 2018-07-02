import { jsonp, ajax } from '@ifeng/ui_base';

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

// 获取自选股数据
const getMyStockData = async num => {
    return await jsonp('//apiapp.finance.ifeng.com/mystock/get', {
        data: { num },
        jsonpCallback: 'getMyStockData',
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
        jsonpCallback: 'getStock',
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

// 查询股票，资金，证券等数据
const getFinanceData = async str => {
    return await jsonp('//app.finance.ifeng.com/hq/suggest_v2.php', {
        data: {
            t: 'all',
            q: str,
            cb: 'getFinanceData(suggest_json)',
        },
        jsonpCallback: 'getFinanceData',
        cache: false,
    });
};

export { getCommentCount, getTopicData, getMyStockData, getStockData, getFundsFlowData, getFinanceData };
