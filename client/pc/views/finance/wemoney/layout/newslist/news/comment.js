import { jsonp } from '@ifeng/ui_base';

export const getData = async function getData(url, options) {
    try {
        const data = await jsonp(url, options);

        console.log(data);
    } catch (e) {
        console.error(e);
    }
};