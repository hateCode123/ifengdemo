const redis = require('../../../common/redis');
const logger = require('../../../common/logger');
const newsService = require('../../../services/news/news');
const http = require('../../../common/http');
const { KVProxy } = require('../../../providers/ucmsapiProxy');

exports.newsId = {
    path: '/news/:id',
    method: 'get',
    edit: true,
    handler: async ctx => {
        const id = ctx.params.id;

        console.log();
        const success = result => {
            console.log('success.response.costtime:', result.response.costtime);

            // console.log("success.response:", result.response);

            return result.response.return;
        };

        const error = result => {
            console.log('error.response.costtime:', result.response.costtime);
            console.log('error.response:', result.response.error);
        };

        console.log('document id:', id);
        const docData = {};

        try {
            // 6361923764438962523
            let docData = await KVProxy.getDocument(parseInt(id)).then(success, error);

            docData = JSON.parse(docData);
        } catch (err) {
            console.log(err);
        }

        // image 需要从thumbnails解析
        const thumbnails = docData.thumbnails;

        // console.log("thumbnails:", thumbnails)
        if (thumbnails) {
            // thumbnails = JSON.parse(thumbnails);
            if (thumbnails.image.length > 0) {
                docData.mainImage = thumbnails.image[0].url;
            }
        }

        // keywords 需要从tags解析
        const docTags = JSON.parse(docData.tags);

        // console.log("docTags:", docTags)
        if (docTags && docTags.length > 0) {
            const keywords = [];

            for (let i = 0; i < docTags.length; i++) {
                keywords.push(docTags[i][0]);
            }
            docData.keywords = keywords;
        }

        console.log('getCategory...');
        let searchPath = docData.searchPath;

        searchPath = searchPath.split('-');
        const categoryData = await KVProxy.getCategory(parseInt(searchPath[searchPath.length - 2])).then(success, error);

        console.log('getStaticFragment 31...');
        const tonglanADAdd = await KVProxy.getStaticFragment(31).then(success, error);

        console.log('getStaticFragment 34...');
        const mainTuiguang = await KVProxy.getStaticFragment(34).then(success, error);

        console.log('getStaticFragment 35...');
        const marketTuiguang = await KVProxy.getStaticFragment(35).then(success, error);

        console.log('getRecommendFragment 15006...');
        const forYouFirst = await KVProxy.getRecommendFragment(15006).then(success, error);

        // 从文章数据中获取
        const forYouClientData = [];

        // 从文章数据中获取
        const forYouVideos = [];

        console.log('getRecommendFragment 15007...');
        const forYouZongbian = await KVProxy.getRecommendFragment(15007).then(success, error);

        console.log('getRecommendFragment 15008...');
        const recommendNews = await KVProxy.getRecommendFragment(15008).then(success, error);

        console.log('getRecommendFragment 15009...');
        const recommendVideos = await KVProxy.getRecommendFragment(15009).then(success, error);

        console.log('getRecommendFragment 15010...');
        const financeStory = await KVProxy.getRecommendFragment(15010).then(success, error);

        console.log('getStaticFragment 36...');
        const iphoneExtendTitle = await KVProxy.getStaticFragment(36).then(success, error);

        console.log('getRecommendFragment 15011...');
        const iphoneExtendData = await KVProxy.getRecommendFragment(15011).then(success, error);

        console.log('getRecommendFragment 15012...');
        const ifengMall = await KVProxy.getRecommendFragment(15012).then(success, error);

        //     let otherData = await Promise.all([categoryData, tonglanADAdd, mainTuiguang, marketTuiguang, forYouFirst, forYouClientData, forYouVideos, forYouZongbian, recommendNews, recommendVideos, financeStory, iphoneExtendTitle, iphoneExtendData, ifengMall]).then(success, error);
        // console.log("otherData:", otherData)
        const data = {
            allData: {
                docData,
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
                ifengMall,
            },
        };

        await ctx.html('news', data);
    },
};
