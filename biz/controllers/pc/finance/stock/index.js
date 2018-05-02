const redis = require('../../../../common/redis');
const logger = require('../../../../common/logger');
const { KVProxy, SearchProxy } = require('../../../../providers/ucmsapiProxy');
const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../../services/common/common');

exports.list = {
    path: '/pc/finance/stock',
    method: 'get',
    type: 'html',
    cache: 0,
    edit: true,
    handler: async ctx => {
        // console.log('getStaticFragment 10038...');
        let navigation = KVProxy.getStaticFragment(10038).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10040...');
        let subNavigation = KVProxy.getStaticFragment(10040).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10086...');
        let stockPlate = KVProxy.getStaticFragment(10086).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10085...');
        let animationPic = KVProxy.getStaticFragment(10085).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10044...');
        let jumpLink = KVProxy.getStaticFragment(10044).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20018...');
        let headline = KVProxy.getRecommendFragment(20018).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getStaticFragment 10049...');
        let newsLiveTab = KVProxy.getStaticFragment(10049).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10052...');
        let liveLogo = KVProxy.getStaticFragment(10052).then(...handleJsonByKey(ctx, 'content'));

        let stockNews1 = SearchProxy.list('1-62-84-', '*', '*', '1', 0, 6, '', '*').then(...handleJson(ctx));

        let stockNews2 = SearchProxy.list('1-62-84-', '*', '*', '1', 6, 6, '', '*').then(...handleJson(ctx));

        let stockNews3 = SearchProxy.list('1-62-84-', '*', '*', '1', 12, 6, '', '*').then(...handleJson(ctx));

        // console.log('getStaticFragment 10050...');
        let newsTab = KVProxy.getStaticFragment(10050).then(...handleJsonByKey(ctx, 'content'));

        let news = SearchProxy.list('1-62-83-', '*', '*', '1', 0, 24, '', '*').then(...handleJson(ctx));

        // console.log('getStaticFragment 10051...');
        let answerTab = KVProxy.getStaticFragment(10051).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 20019...');
        let answerList = KVProxy.getRecommendFragment(20019).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getStaticFragment 10075...');
        let bannerPic = KVProxy.getStaticFragment(10075).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10067...');
        let hotSpotsTitle = KVProxy.getStaticFragment(10067).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10070...');
        let hotSpotsSubTitle1 = KVProxy.getStaticFragment(10070).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10071...');
        let hotSpotsSubTitle2 = KVProxy.getStaticFragment(10071).then(...handleJsonByKey(ctx, 'content'));

        let marketAnalysis = SearchProxy.list('1-62-85-', '*', '*', '1', 0, 100, '', '*').then(...handleJson(ctx));

        let hotPlate = SearchProxy.list('1-62-87-', '*', '*', '1', 0, 100, '', '*').then(...handleJson(ctx));

        // 行业概念资金流向
        let industry = KVProxy.getStaticFragment(10087).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10069...');
        let schoolTitle = KVProxy.getStaticFragment(10069).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10072...');
        let schoolSubTitle1 = KVProxy.getStaticFragment(10072).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10073...');
        let schoolSubTitle2 = KVProxy.getStaticFragment(10073).then(...handleJsonByKey(ctx, 'content'));

        let logs = SearchProxy.list('1-67-96-', '*', '*', '1', 0, 100, '', '*').then(...handleJson(ctx));

        let school = SearchProxy.list('1-67-101-', '*', '*', '1', 0, 100, '', '*').then(...handleJson(ctx));

        // console.log('getStaticFragment 10076...');
        let subjectTitle = KVProxy.getStaticFragment(10076).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10079...');
        let subject = KVProxy.getStaticFragment(10079).then(...handleJs(ctx, 'content'));

        // console.log('getStaticFragment 10077...');
        let marketTitle = KVProxy.getStaticFragment(10077).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10080...');
        let market = KVProxy.getStaticFragment(10080).then(...handleJs(ctx, 'content'));

        // console.log('getRecommendFragment 10082...');
        let courier = KVProxy.getStaticFragment(10082).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10083...');
        let playItem = KVProxy.getStaticFragment(10083).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getRecommendFragment 10084...');
        let linkList = KVProxy.getStaticFragment(10084).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10078...');
        let dayStockTitle = KVProxy.getStaticFragment(10078).then(...handleJsonByKey(ctx, 'content'));

        // console.log('getStaticFragment 10081...');
        let dayStock = KVProxy.getStaticFragment(10081).then(...handleJs(ctx, 'content'));

        // console.log('getRecommendFragment 20010...');
        let meeting = KVProxy.getRecommendFragment(20010).then(...handleJsonByKey(ctx, 'data'));

        // console.log('getRecommendFragment 10074...');
        let cooperation = KVProxy.getStaticFragment(10074).then(...handleJs(ctx, 'content'));

        [
            navigation,
            subNavigation,
            stockPlate,
            animationPic,
            jumpLink,
            headline,
            newsLiveTab,
            stockNews1,
            stockNews2,
            stockNews3,
            liveLogo,
            newsTab,
            news,
            answerTab,
            answerList,
            bannerPic,
            hotSpotsTitle,
            hotSpotsSubTitle1,
            hotSpotsSubTitle2,
            marketAnalysis,
            hotPlate,
            industry,
            schoolTitle,
            schoolSubTitle1,
            schoolSubTitle2,
            logs,
            school,
            subjectTitle,
            subject,
            marketTitle,
            market,
            courier,
            playItem,
            linkList,
            dayStockTitle,
            dayStock,
            cooperation,
        ] = await Promise.all([
            navigation,
            subNavigation,
            stockPlate,
            animationPic,
            jumpLink,
            headline,
            newsLiveTab,
            stockNews1,
            stockNews2,
            stockNews3,
            liveLogo,
            newsTab,
            news,
            answerTab,
            answerList,
            bannerPic,
            hotSpotsTitle,
            hotSpotsSubTitle1,
            hotSpotsSubTitle2,
            marketAnalysis,
            hotPlate,
            industry,
            schoolTitle,
            schoolSubTitle1,
            schoolSubTitle2,
            logs,
            school,
            subjectTitle,
            subject,
            marketTitle,
            market,
            courier,
            playItem,
            linkList,
            dayStockTitle,
            dayStock,
            cooperation,
        ]);

        let allData = {
            navigation,
            subNavigation,
            stockPlate,
            animationPic,
            jumpLink,
            headline,
            newsLiveTab,
            stockNews1,
            stockNews2,
            stockNews3,
            liveLogo,
            newsTab,
            news,
            answerTab,
            answerList,
            bannerPic,
            hotSpotsTitle,
            hotSpotsSubTitle1,
            hotSpotsSubTitle2,
            marketAnalysis,
            hotPlate,
            industry,
            schoolTitle,
            schoolSubTitle1,
            schoolSubTitle2,
            logs,
            school,
            subjectTitle,
            subject,
            marketTitle,
            market,
            courier,
            playItem,
            linkList,
            dayStockTitle,
            dayStock,
            cooperation,
        };

        await ctx.html('finance_stock', { allData });
    },
};
