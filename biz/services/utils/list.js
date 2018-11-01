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
