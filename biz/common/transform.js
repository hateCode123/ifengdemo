const { recommendRandomSort, formatImage, formatUrl } = require('@ifeng/public_method');

module.exports = {
    jsonParse: data => {
        return JSON.parse(data);
    },
    handleHeadlinePicData: data => {
        return recommendRandomSort(data, 6).map(item => ({
            url: item.url,
            title: item.title,
        }));
    },
    handleFinanceListPicData: data => {
        return recommendRandomSort(data, 5).map(item => ({
            url: item.url,
            title: item.title,
        }));
    },
    handleBannerPicData: data => {
        return recommendRandomSort(data, 4).map(item => ({
            thumbnail: item.thumbnail ? formatImage(item.thumbnail, 570, 260) : item.thumbnail,
            url: item.url,
            title: item.title,
        }));
    },
    handleDayStockData: data => {
        return recommendRandomSort(data, 1).map(item => ({
            thumbnail: item.thumbnail ? formatImage(item.thumbnail, 300, 166) : item.thumbnail,
            url: item.url,
            title: item.title,
        }));
    },
};
