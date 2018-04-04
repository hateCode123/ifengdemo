const redis = require('../../common/redis');
const logger = require('../../common/logger');
const newsService = require('../../services/news/news');
const http = require('../../common/http');
const Tars = require("@tars/rpc").client;
const {Tarsapi} = require("../../providers/ucmsapiProxy");
Tars.initialize("./config.conf");
const KVProxy = Tars.stringToProxy(Tarsapi.KVProxy, Tars.configure.get("main.KVServer"));

exports.news_id = {
    path: '/news/:id',
    method: 'get',
    edit:true,
    handler: async (ctx) => {
        let id = ctx.params.id;
        console.log();
        var success = function(result) {
            console.log('success.response.costtime:', result.response.costtime);
            //console.log("success.response:", result.response);
            return result.response.return;
        };

        var error = function(result) {
            console.log('error.response.costtime:', result.response.costtime);
            console.log('error.response:', result.response.error);
        };

        console.log('document id:', id);
        var docData = {};
        try {
            var docData = await KVProxy.getDocument(parseInt(id)).then(success, error); //6361923764438962523
            docData = JSON.parse(docData);
        } catch (e) {}

        //image 需要从thumbnails解析
        var thumbnails = docData.thumbnails;
        // console.log("thumbnails:", thumbnails)
        if (thumbnails) {
            // thumbnails = JSON.parse(thumbnails);
            if (thumbnails.image.length > 0) {
                docData.mainImage = thumbnails.image[0].url;
            }
        }

        //keywords 需要从tags解析
        var docTags = JSON.parse(docData.tags);
        // console.log("docTags:", docTags)
        if (docTags && docTags.length > 0) {
            var keywords = [];
            for (var i = 0; i < docTags.length; i++) {
                keywords.push(docTags[i][0]);
            }
            docData.keywords = keywords;
        }

        console.log('getCategory...');
        var searchPath = docData.searchPath;
        searchPath = searchPath.split('-');
        var categoryData = await KVProxy.getCategory(parseInt(searchPath[searchPath.length - 2])).then(success, error);

        console.log('getStaticFragment 31...');
        var tonglanADAdd = await KVProxy.getStaticFragment(31).then(success, error);

        console.log('getStaticFragment 34...');
        var mainTuiguang = await KVProxy.getStaticFragment(34).then(success, error);

        console.log('getStaticFragment 35...');
        var marketTuiguang = await KVProxy.getStaticFragment(35).then(success, error);

        console.log('getRecommendFragment 15006...');
        var forYouFirst = await KVProxy.getRecommendFragment(15006).then(success, error);

        var forYouClientData = []; //从文章数据中获取
        var forYouVideos = []; //从文章数据中获取

        console.log('getRecommendFragment 15007...');
        var forYouZongbian = await KVProxy.getRecommendFragment(15007).then(success, error);

        console.log('getRecommendFragment 15008...');
        var recommendNews = await KVProxy.getRecommendFragment(15008).then(success, error);

        console.log('getRecommendFragment 15009...');
        var recommendVideos = await KVProxy.getRecommendFragment(15009).then(success, error);

        console.log('getRecommendFragment 15010...');
        var financeStory = await KVProxy.getRecommendFragment(15010).then(success, error);

        console.log('getStaticFragment 36...');
        var iphoneExtendTitle = await KVProxy.getStaticFragment(36).then(success, error);

        console.log('getRecommendFragment 15011...');
        var iphoneExtendData = await KVProxy.getRecommendFragment(15011).then(success, error);

        console.log('getRecommendFragment 15012...');
        var ifengMall = await KVProxy.getRecommendFragment(15012).then(success, error);

        //     var otherData = await Promise.all([categoryData, tonglanADAdd, mainTuiguang, marketTuiguang, forYouFirst, forYouClientData, forYouVideos, forYouZongbian, recommendNews, recommendVideos, financeStory, iphoneExtendTitle, iphoneExtendData, ifengMall]).then(success, error);
        // console.log("otherData:", otherData)
        let data =  {
                allData: {
                    docData: docData,
                    categoryData: categoryData,
                    tonglanADAdd: tonglanADAdd,
                    mainTuiguang: mainTuiguang,
                    marketTuiguang: marketTuiguang,
                    forYouFirst: forYouFirst,
                    forYouClientData: forYouClientData,
                    forYouVideos: forYouVideos,
                    forYouZongbian: forYouZongbian,
                    recommendNews: recommendNews,
                    recommendVideos: recommendVideos,
                    financeStory: financeStory,
                    iphoneExtendTitle: iphoneExtendTitle,
                    ifengMall: ifengMall,
                },
            }
        await ctx.html('news', data);
    }
};