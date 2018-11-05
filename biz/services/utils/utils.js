/**
 * 排重，去掉推荐位数据
 * @param {Array} recommendData 推荐位数据数组
 * @param {Array} originArray 需要排重的数组
 * @param {Number} needNum 需要的总条数
 * @returns {Array} filterArr 去重后数组
 */
const filterRecommendData = (recommendData, originArray, needNum) => {
    const rLen = recommendData.length;

    const filterArr = originArray.filter(each => {
        const originId = each.id;
        let flag = true;

        recommendData.forEach(item => {
            if (item.id === originId) {
                flag = false;

                return;
            }
        });

        return flag;
    });

    return filterArr.slice(0, needNum - rLen);
};

/**
 * 对信息流做单图靠前处理
 * @param {Array} listData 信息流数据
 */
const singlePicList = listData => {
    const haveThumbnail = [];
    const noThumbnail = [];

    // 先找到有缩略图的最靠前的
    listData.forEach(item => {
        if (item.thumbnail) {
            haveThumbnail.push(item);
        } else {
            noThumbnail.push(item);
        }
    });

    return [...haveThumbnail, ...noThumbnail];
};

const { formatUrl, formatImage } = require('@ifeng/public_method');

/**
 * 格式化数据
 * @param {Array} dataArray 数组数据
 * @param {Number} needNum 需要的条数
 * @param {Boolean} picTileOnly 是否仅需要图片标题和链接，默认为false
 * @param {Number} picWidth 图片宽，默认大图模式，宽698
 * @param {Number} picHeight 图片高，默认大图模式，高392
 */
const formatData = (dataArray, needNum, picTileOnly = false, picWidth = 698, picHeight = 392) => {
    const simpleFormatData = [];

    // 容错处理
    if (!dataArray) {
        return [];
    }

    for (let i = 0, len = dataArray.length; i < len; i++) {
        const item = dataArray[i];
        const { id, newsTime, title, url, commentUrl, source } = item;
        let thumbnail = '';

        if (simpleFormatData.length < needNum) {
            const { thumbnails, thumbnailsCount } = item;

            thumbnail =
                Number(thumbnailsCount) > 0
                    ? thumbnails && thumbnails.image && thumbnails.image[0] && thumbnails.image[0].url
                    : '';
            simpleFormatData.push({
                id: picTileOnly ? undefined : id,
                newsTime: picTileOnly ? undefined : newsTime,
                commentUrl: picTileOnly ? undefined : commentUrl,
                source: picTileOnly ? undefined : source,
                title,
                url: formatUrl(url),
                thumbnail: thumbnail ? formatImage(thumbnail, picWidth, picHeight) : thumbnail,
            });
        } else {
            // 避免造成性能浪费
            break;
        }
    }

    return simpleFormatData;
};

module.exports = {
    filterRecommendData,
    singlePicList,
    formatData,
};
