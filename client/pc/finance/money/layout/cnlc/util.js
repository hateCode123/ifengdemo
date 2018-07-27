import { jsonp } from '@ifeng/ui_base';

const url = '';

export const getData = async type => {
    try {
        const type = 'trust';
        const data = await jsonp(`http://app.finance.ifeng.com/gszb/ana_list.php?type=${type}`, {
            data: {
                level: 1,
                dist: 1,
                cb: 'setNewCont',
            },
            jsonp: 'cb',
            jsonpCallback: 'setNewCont',
            timeout: 10000,
        });
    } catch (e) {
        console.error(e);
    }
};
