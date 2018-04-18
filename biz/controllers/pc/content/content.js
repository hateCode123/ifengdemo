const redis = require('../../../common/redis');
const logger = require('../../../common/logger');
const newsService = require('../../../services/news/news');
const http = require('../../../common/http');
const { KVProxy } = require('../../../providers/ucmsapiProxy');

const success = result => {
    // console.log('success.response.costtime:', result.response.costtime);

    // // console.log("success.response:", result.response);

    return result.response.return;
};

const error = result => {
    // console.log('error.response.costtime:', result.response.costtime);
    // console.log('error.response:', result.response.error);
};

exports.contentId = {
    path: '/pc/content/:id',
    method: 'get',
    edit: true,
    type: 'html',
    handler: async ctx => {
        const id = ctx.params.id;

        // console.log('document id:', id);
        let docData = {};

        if (ctx.docData) {
            docData = ctx.docData;
        } else {
            try {
                // 6361923764438962523
                docData = await KVProxy.getDocument(parseInt(id)).then(success, error);
                docData = JSON.parse(docData);
            } catch (err) {
                // console.log(err);
            }
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
        const docTags = JSON.parse(docData.tags);

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
        const categoryData = KVProxy.getCategory(parseInt(searchPath[searchPath.length - 2])).then(success, error);

        // console.log('getStaticFragment 31...');
        const tonglanADAdd = KVProxy.getStaticFragment(31).then(success, error);

        // console.log('getStaticFragment 34...');
        const mainTuiguang = KVProxy.getStaticFragment(34).then(success, error);

        // console.log('getStaticFragment 35...');
        const marketTuiguang = KVProxy.getStaticFragment(35).then(success, error);

        // console.log('getRecommendFragment 15006...');
        const forYouFirst = KVProxy.getRecommendFragment(15006).then(success, error);

        // 从文章数据中获取
        const forYouClientData = [];

        // 从文章数据中获取
        const forYouVideos = [];

        // console.log('getRecommendFragment 15007...');
        const forYouZongbian = KVProxy.getRecommendFragment(15007).then(success, error);

        // console.log('getRecommendFragment 15008...');
        const recommendNews = KVProxy.getRecommendFragment(15008).then(success, error);

        // console.log('getRecommendFragment 15009...');
        const recommendVideos = KVProxy.getRecommendFragment(15009).then(success, error);

        // console.log('getRecommendFragment 15010...');
        const financeStory = KVProxy.getRecommendFragment(15010).then(success, error);

        // console.log('getStaticFragment 36...');
        const iphoneExtendTitle = KVProxy.getStaticFragment(36).then(success, error);

        // console.log('getRecommendFragment 15011...');
        const iphoneExtendData = KVProxy.getRecommendFragment(15011).then(success, error);

        // console.log('getRecommendFragment 15012...');
        const ifengMall = KVProxy.getRecommendFragment(15012).then(success, error);

        // let otherData = await Promise.all([categoryData, tonglanADAdd, mainTuiguang, marketTuiguang, forYouFirst, forYouClientData, forYouVideos, forYouZongbian, recommendNews, recommendVideos, financeStory, iphoneExtendTitle, iphoneExtendData, ifengMall]).then(success, error);
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
