/**
 * @func 根据接口数据，获取账号权限
 * @desc 字段值：1.原创 2.原创保护 3.插入商品 4. 插入链接功能 5.流量+ 6.评论功能 7 双标题/双封面 8.正版图库 9外图封面 10.MCN管理  11.荣誉体系管理
 */
// import {} from './index';
import { privilegeListOpened } from '../services/';
import store from '../common/store';
import { actions } from '../common/models/user';

const accountPrivilegeHandler = sourceData => {
    try {
        // const __data = sourceData;

        // @todo 模拟数据
        const __data = {
            code: 1000,
            success: true,
            data: {
                rows: [3, 1, 6, 7, 9, 2, 5, 8, 4, 10, 11],
            },
        };

        const rows = __data.data && __data.data.rows ? __data.data.rows : [];

        const matchJSON = {
            original: 1,
            originalProtection: 2,
            insertProduct: 3,
            insertLink: 4,
            flowPlus: 5,
            comment: 6,
            doubleTitleAndCover: 7,
            authorisedImages: 8,
            outsideCover: 9,
            mcn: 10,
            honor: 11,
        };

        const result = Object.keys(matchJSON).forEach(item => {
            matchJSON[item] = rows.includes(matchJSON[item]);
        });

        console.log(matchJSON);

        return matchJSON;
    } catch (e) {
        console.error(e);
    }
};

/**
 * @func 从接口获取用户信息，根据状态进行页面跳转
 */

export const getAccountPrivilegeListOpened = async () => {
    try {
        console.log('getAccountPrivilegeListOpened');

        // @todo  接口
        // const result = await privilegeListOpened();

        const result = {};

        const __privilegeList = accountPrivilegeHandler(result);

        console.log('__privilegeList', __privilegeList);

        await store.dispatch(
            actions.updatePrivilegeList({
                ...__privilegeList,
            }),
        );
    } catch (e) {
        console.error(e);

        throw new Error(e);
    }
};
