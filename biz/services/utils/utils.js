/**
 * 数组随机排序
 * @param { Array } arr 要排序的数组
 * @param { Number } length 排序后生成的新数组的长度
 */
const randomSort = (arr, length) => {
    const result = [];
    let count = arr.length;
    const array = [...Array(count).keys()];

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.ceil(Math.random() * count) - 1;

        result[i] = array[randomIndex];
        array.splice(randomIndex, 1);
        count--;
    }

    return result.sort().map(i => arr[i]);
};

/**
 * 推荐位数据，置顶与固定的数据位置固定，其他随机排序
 * @param {*} arr 推荐位数据
 * @param {*} length 推荐位数据数量
 */
const recommendRandomSort = (arr, length) => {
    if (arr.length === length) return arr;

    const result = [];
    let sortLength = 0;
    let sortArr = arr.filter(item => item.top === 0 && item.fix === 0);
    let sortIndex = arr.map((item, index) => {
        if (item.top === 0 && item.fix === 0) {
            return index;
        } else {
            if (index < length - 1) sortLength++;

            return null;
        }
    });

    sortIndex = sortIndex.filter(item => item !== null);

    sortArr = randomSort(sortArr, length - sortLength);

    let ind = 0;

    for (let i = 0; i < length; i++) {
        if (!sortIndex.includes(i)) {
            result[i] = arr[i];
        } else {
            result[i] = sortArr[ind];

            ind++;
        }
    }

    return result;
};

/**
 * 将前面的裁图前缀,参数以及协议头去掉
 * @param {*} url 要清洗的 url
 */
const clear = url => {
    if (url.includes('d.ifengimg.com/')) {
        url = url.split('d.ifengimg.com/').pop();
        const paths = url.split('/');

        paths.shift();
        url = paths.join('/');
    }

    if (url.includes('http://')) {
        url = url.substring(7);
    }

    if (url.includes('https://')) {
        url = url.substring(8);
    }

    if (url.includes('//')) {
        url = url.substring(2);
    }

    return url;
};

/**
 * 判断域名是否为公司的
 * @param {string} url
 */
const checkDomain = url => {
    const domain = url.split('/')[0];

    if (domain.includes('.ifengimg.com') || domain.includes('.ifeng.com')) {
        return true;
    }

    return false;
};

/**
 * 裁剪图片方法
 * @param {string} url 系统提供的图片地址
 * @param {number} width 图片裁切宽度
 * @param {number} height 图片裁切高度
 * @param {number} quality 图片裁切质量，最大值100，一般可以不填，不建议写100
 */
const formatImage = (url, width, height, quality) => {
    url = clear(url);

    const params = [];

    if (width) {
        params.push(`w${width}`);
    }

    if (height) {
        params.push(`h${height}`);
    }

    if (quality) {
        params.push(`q${quality}`);
    }

    return `//d.ifengimg.com/${params.join('_')}/${clear(url)}`;
};

/**
 * url 预处理
 * @param { String } url
 */
const handleUrl = url => {
    if (!url) return;

    if (url.indexOf('http:') === 0) {
        return url.replace('http:', '');
    } else if (url.indexOf('https:') === 0) {
        return url.replace('https:', '');
    } else if (url.indexOf('/') === 0) {
        return `/${url}`;
    } else {
        return `//${url}`;
    }
};

module.exports = {
    randomSort,
    recommendRandomSort,
    checkDomain,
    formatImage,
    handleUrl,
};
