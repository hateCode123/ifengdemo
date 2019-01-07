/**
 * @func 根据接口给的数据，计算出账号状态，格式和接口返回一直，code和接口提供规则一致
 */

import store from '../common/store';
import { actions } from '../common/models/user';

/**
 * @func 用户数据存入store-user
 * @param {*} data
 *
 * */
export const setUserInfoStore = async data => {
    try {
        console.log('setUserInfoStore', data);
        if (Object.keys(data).length === 0) return;

        await store.dispatch(actions.login(data));
    } catch (e) {
        console.error(e);

        throw e;
    }
};

/**
 * @func 根据接口数据，返回账号状态
 * @param {*} sourceData
 * @desc  该函数的判断顺序：1、空对象：账号未注册 2、判断上下线 3、账号类型 4、审核状态
 * 
 * online 上下线状态  （0:默认 1：下线，2：上线）
 * 
 * accountType 账号类型（1：凤凰账号，2：签约账号，3：视频账号，4：一点账号 , 5: UGC账号 ，6:  体验账号,）
 * status 审核状态（1：待审核 ，2：审核通过，,3：审核未通过,4:永久审核不通过）
 * 
 * isMcnManager 是否是mcn管理员  2：mcn管理员；1:mcn成员；0：普通账号
 * honorName 荣誉体系名称  没有荣誉体系的 该字段返回空
 * 
 * 接口最终给出的账号状态所需三个字段之间关系，判断逻辑：
status：账号状态（1：待审核 ，2：审核通过，,3：审核未通过,4:永久审核不通过）
accountType：账号类型（1：凤凰账号，2：签约账号，3：视频账号，4：一点账号 , 5: UGC账号 ，6:  体验账号,）
isExperience：是否是体验期账号，（1：体验账号，null：非体验账号）

体验期账号：accountType=6，status=2，isExperience=1, 体验期未提交正式申请状态，这时默认给的status是2
体验期账号申请转正审核中：accountType=1，status=1，isExperience=1
体验期账号申请转正审核通过：accountType=1，status=2，isExperience=1
体验期账号申请转正审核不通过：accountType=6，status=3，isExperience=1
体验期账号申请转正审核永久不通过：accountType=6，status=4，isExperience=1
普通账号审核中：accountType=1，status=1，isExperience=null
普通账号审核通过：accountType=1，status=2，isExperience=null
普通账号审核不通过：accountType=1，status=3，isExperience=null
普通账号审核永久不通过：accountType=1，status=4，isExperience=null

 */

export const queryinfoHandler = sourceData => {
    const result = {
        code: 201, // 如果没有根据接口判断出状态，就返回201，在下一步中只抛错不跳转
        status: 201,
        message: '接口未提供',
    };

    if (Object.keys(sourceData).length === 0) {
        return {
            code: 1002,
            status: 7,
            message: '账号未注册',
        };
    }

    const isOffline = sourceData.online && sourceData.online === 1;

    const isTiyanqi =
        (sourceData.accountType && parseInt(sourceData.accountType, 10) === 6) ||
        (sourceData.status &&
            parseInt(sourceData.status, 10) === 1 &&
            sourceData.isExperience &&
            parseInt(sourceData.isExperience, 10) === 1);

    const status = parseInt(sourceData.status || 2, 10);

    if (isOffline) {
        result.code = 1004;
        result.message = '账号已下线';
        result.status = 0;
    } else {
        // isMcnManager

        const isMcnManager = sourceData.isMcnManager && sourceData.isMcnManager === '2';
        const isMcnStaff = sourceData.isMcnManager && sourceData.isMcnManager === '1';

        const isHonor = sourceData.honorName && sourceData.honorName !== '';

        result.isMcnManager = isMcnManager;
        result.isMcnStaff = isMcnStaff;
        result.isHonor = isHonor;

        if (isTiyanqi) {
            result.code = 0;
            result.isTiyanqi = true;
            switch (status) {
                case 1:
                    result.message = '体验期账号审核中';
                    result.status = 1;
                    break;
                case 2:
                    result.message = '体验期账号未提交正式申请';
                    result.status = 2;
                    break;
                case 3:
                case 4:
                    result.message = '体验期账号审核不通过';
                    result.status = 3;
                    break;
            }
        } else {
            switch (status) {
                case 1:
                    result.code = 1003;
                    result.message = '非体验期账号正式申请审核中';
                    result.status = 4;

                    break;
                case 2:
                    result.code = 0;
                    result.message = '(非)体验期账号审核通过';
                    result.status = 5;
                    break;
                case 3:
                case 4:
                    result.code = 1005;
                    result.message = '非体验期账号审核不通过';
                    result.status = 6;
                    break;
            }
        }
    }

    return result;
};

/**
 * @func 根据接口数据更新用户和账号store,返回账号最新状态
 * @param {*} sourceData
 */
export const checkAccountStatus = async sourceData => {
    try {
        // @todo: 数据正确就把这的计算结果存储到localstorage和store里面

        await setUserInfoStore(sourceData);

        const accountInfo = queryinfoHandler(sourceData);

        await store.dispatch(actions.setAccountInfo(accountInfo));

        return accountInfo;
    } catch (e) {
        console.error(e);

        throw e;
    }
};

/**
 * @func 清空所有store
 */

export const resetStore = () => {
    try {
        store.dispatch(actions.login({}));
        store.dispatch(actions.setAccountInfo({}));
    } catch (e) {
        console.error(e);

        throw e;
    }
};
