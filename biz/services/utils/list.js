// 格式化函数
const formatList = function formatList (list, simpler = false) {
    return list.map(item => {
        const newItem = {
            id: item.id,
            title: item.title,
            url: item.url,
        };
        let etc = {};

        if (!simpler) {
          etc = {
              commentUrl: item.commentUrl, // 获取评论用
              skey: item.skey,
              newsTime: item.newsTime,
              source: item.source,
              type: item.type,
              thumbnails: item.thumbnails, // 图片地址
              videoCount: item.videoCount, // 是否有视频
          };
        }

        return {
            ...newItem,
            ...etc,
        };
    });
};

exports.formatList = formatList;

/* 格式化imarkets数据并返回指定数量的数据 */
exports.imarketslist = function imarketslist(list, noFormat = false) {
    const topnews = [];
    const newsstream = [];

    // 置顶新闻
    topnews.push(...noFormat ? list.slice(0, 6) : formatList(list.slice(0, 6), true));
    newsstream.push(...noFormat ? list.slice(7, 7 + 36) : formatList(list.slice(7, 7 + 36)));

    return { topnews, newsstream };
};
