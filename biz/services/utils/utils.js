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

module.exports = {
    randomSort,
    recommendRandomSort,
};
