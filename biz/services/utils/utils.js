/**
 * 数组随机排序
 * @param { Array } arr 要排序的数组
 * @param { Number } length 排序后生成的新数组的长度
 */
const randomSort = (arr, length) => {
    if (arr.length === length) return arr;

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

module.exports = {
    randomSort,
};
