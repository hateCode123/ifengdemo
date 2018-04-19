const redis = require('../../../common/redis');
const logger = require('../../../common/logger');
const newsService = require('../../../services/news/news');
const http = require('../../../common/http');
const { KVProxy } = require('../../../providers/ucmsapiProxy');

const { jsonParse, handleData, handleJson, handleJsonByKey, handleJs } = require('../../../services/common/common');

exports.contentId = {
    path: '/content/:id',
    method: 'get',
    edit: true,
    type: 'html',
    cache: 10,
    handler: async ctx => {
        const id = ctx.params.id;

        // console.log('document id:', id);
        let docData = {};

        if (ctx.docData) {
            docData = ctx.docData;
        } else {
            // 6361923764438962523
            docData = await KVProxy.getDocument(parseInt(id)).then(...handleJson(ctx, true));
        }

        // image 需要从thumbnails解析
        const thumbnails = docData.thumbnails;

        // // console.log("thumbnails:", thumbnails)
        if (thumbnails) {
            // thumbnails = JSON.parse(thumbnails);
            if (thumbnails.image.length > 0) {
                docData.mainImage = thumbnails.image[0].url;
            }
        }

        // keywords 需要从tags解析
        // console.log('===================');
        console.log(docData.tags);

        // const docTags = JSON.parse(docData.tags);
        const docTags = jsonParse(docData.tags, ctx);

        // // console.log("docTags:", docTags)
        if (docTags && docTags.length > 0) {
            const keywords = [];

            for (let i = 0; i < docTags.length; i++) {
                keywords.push(docTags[i][0]);
            }
            docData.keywords = keywords;
        }

        // console.log('getCategory...');
        let searchPath = docData.searchPath;

        searchPath = searchPath.split('-');
        const categoryData = KVProxy.getCategory(parseInt(searchPath[searchPath.length - 2])).then(
            ...handleJson(ctx)
        );

        // console.log('getStaticFragment 31...');
        const tonglanADAdd = KVProxy.getStaticFragment(31).then(...handleJson(ctx));

        // console.log('getStaticFragment 34...');
        const mainTuiguang = KVProxy.getStaticFragment(34).then(...handleJson(ctx));

        // console.log('getStaticFragment 35...');
        const marketTuiguang = KVProxy.getStaticFragment(35).then(...handleJson(ctx));

        // console.log('getRecommendFragment 15006...');
        const forYouFirst = KVProxy.getRecommendFragment(15006).then(...handleJson(ctx));

        // 从文章数据中获取
        const forYouClientData = [];

        // 从文章数据中获取
        const forYouVideos = [];

        // console.log('getRecommendFragment 15007...');
        const forYouZongbian = KVProxy.getRecommendFragment(15007).then(...handleJson(ctx));

        // console.log('getRecommendFragment 15008...');
        const recommendNews = KVProxy.getRecommendFragment(15008).then(...handleJson(ctx));

        // console.log('getRecommendFragment 15009...');
        const recommendVideos = KVProxy.getRecommendFragment(15009).then(...handleJson(ctx));

        // console.log('getRecommendFragment 15010...');
        const financeStory = KVProxy.getRecommendFragment(15010).then(...handleJson(ctx));

        // console.log('getStaticFragment 36...');
        const iphoneExtendTitle = KVProxy.getStaticFragment(36).then(...handleJson(ctx));

        // console.log('getRecommendFragment 15011...');
        const iphoneExtendData = KVProxy.getRecommendFragment(15011).then(...handleJson(ctx));

        // console.log('getRecommendFragment 15012...');
        const ifengMall = KVProxy.getRecommendFragment(15012).then(...handleJson(ctx));

        // let otherData = await Promise.all([categoryData, tonglanADAdd, mainTuiguang, marketTuiguang, forYouFirst, forYouClientData, forYouVideos, forYouZongbian, recommendNews, recommendVideos, financeStory, iphoneExtendTitle, iphoneExtendData, ifengMall]).then(success(ctx,''), error);
        const otherData = await Promise.all([
            categoryData,
            tonglanADAdd,
            mainTuiguang,
            marketTuiguang,
            forYouFirst,
            forYouClientData,
            forYouVideos,
            forYouZongbian,
            recommendNews,
            recommendVideos,
            financeStory,
            iphoneExtendTitle,
            iphoneExtendData,
            ifengMall,
        ]);

        // // console.log("otherData:", otherData)
        // // console.log(otherData);

        const data = {
            allData: {
                docData,
                categoryData: otherData[0],
                tonglanADAdd: otherData[1],
                mainTuiguang: otherData[2],
                marketTuiguang: otherData[3],
                forYouFirst: otherData[4],
                forYouClientData: otherData[5],
                forYouVideos: otherData[6],
                forYouZongbian: otherData[7],
                recommendNews: otherData[8],
                recommendVideos: otherData[9],
                financeStory: otherData[10],
                iphoneExtendTitle: otherData[11],
                ifengMall: otherData[12],
            },
        };

        await ctx.html('content', data);
    },
};
