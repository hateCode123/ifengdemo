/**
 * 排重，去掉推荐位数据
 * @param {Array} recommendIds 推荐位数据数组
 * @param {Array} originArray 需要排重的数组
 * @returns {Array} filterArr 去重后数组
 */
const filterRecommendData = (recommendData, originArray) => {
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

    return filterArr;
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

module.exports = {
    filterRecommendData,
    singlePicList
};
