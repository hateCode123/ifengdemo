const currentURL = window.location.pathname;

const responseFailHandler = result => {
    console.log('要跳啦');
    let url = '/login';

    switch (result.code) {
        case 1001:
            // 账号未登录
            url = '/login';
            break;
        case 1002:
            // 账号未注册
            url = '/register/chooseType';
            break;
        case 1003:
            //  账号审核中
            url = '/wait';
            break;
        case 1004:
            // 账号已下线
            url = '/offline';
            break;
        case 1005:
            // 账号审核失败
            url = '/fail';
            break;
        case 1009:
        case 4001:
        case 5001:
        case 0:
            // 非法请求
            // 暂无权限访问
            url = '/index';
            break;

        default:
            throw new Error(result.message);
    }

    if (currentURL !== url) window.location.href = url;
};

/**
 * @func 根据接口返回的code码，决定页面跳转去哪里
 * @param {*} result
 */

export const requestResponseHandler = result => {
    try {
        console.log('requestResponseHandler', result);

        switch (result.status) {
            case 'fail':
                if (result.code === 5001) {
                    return result;
                } else {
                    // responseFailHandler(result);
                }
                break;
            case 'success':
                return result;
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
};
