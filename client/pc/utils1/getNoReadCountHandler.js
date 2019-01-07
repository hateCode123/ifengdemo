/**
 * @func 根据接口给的数据，计算出账号状态，格式和接口返回一直，code和接口提供规则一致
 */

import store from '../common/store';
import { actions } from '../common/models/user';
import { getNoReadCount } from '../services';

/**
 * @func 根据接口数据更新消息未读数
 * @param {*}
 */

export const getNoReadCountHandler = async () => {
    try {
        // @todo  接口
        // const result = await getNoReadCount();

        const result = {
            count: 4,
        };

        console.log('getNoReadCountHandler', result);

        const noReadCount = result.count;

        await store.dispatch(actions.updateMessageNum(noReadCount));
    } catch (e) {
        console.error(e);

        throw e;
    }
};
