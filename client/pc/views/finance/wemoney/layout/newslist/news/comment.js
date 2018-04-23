import { jsonp } from '@ifeng/ui_base';

const getData = async function getData(url, options) {
    try {
        const data = await jsonp(url, options);

        console.log(data);

        return data;
    } catch (e) {
        console.error(e);
    }
};

// 导出处理函数
export default {
    getData
};
