/* 格式化新闻的url地址 */

const formatUrl = url => {
    let formatUrl = url;

    // 凤凰网已经支持https，所以对https开头的地址不进行处理
    if (!/^ht{2}ps?:\/{2}/.test(url)) {
        formatUrl = `//${formatUrl}`;
    }

    return formatUrl;
};

export { formatUrl };
