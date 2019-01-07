/**
 * @func 根据接口数据，判断用户账号状态，处理后续逻辑
 * @desc 状态1、未注册账号，跳转到选择类型页面 chooseType
 * @desc 状态2、个人极速入驻成功，未提交正式申请，跳转体验期页面引导填写正式申请
 * @desc 状态3、个人极速入驻成功，已提交正式申请，审核中状态，跳转体验期页面
 * @desc 状态4、个人极速入驻成功，已提交正式申请，审核未通过，跳转引导修改体验期页面
 * @desc 状态5、正式入驻，审核中，跳转等待审核页面
 * @desc 状态6、正式入驻，审核未通过，跳转反馈审核原因页面
 * @desc 状态7、审核通过，跳转首页
 * @desc 状态8、下线
 */
import { cookie } from '@ifeng/ui_base';
import { accountStatusHandler, checkAccountStatus, setUserInfoStore, getNoReadCountHandler } from './index';

/**
 * @func 从接口获取用户信息，根据状态进行页面跳转
 */

export const getAccountStatus = async () => {
    try {
        console.log('getAccountStatus');

        const userName = cookie.get('IF_USER');
        const IFUserInfo = {
            weMediaName: userName,
        };

        await setUserInfoStore(IFUserInfo);

        // @todo  接口
        // const accountInfo = await queryinfo();

        // accountType非6， status=1,2,3,4
        // accountType=6， status=2，体验期未提交正式申请状态，这时默认给的status是2
        // accountType=6，status=3,4  体验期申请转正被拒的情况

        const accountInfo = {
            weMediaId: '58576cb2951f464ba7828d01', // 自媒体账号id
            eAccountId: 370804, // 自媒体账号数值id
            weMediaName: '苹果冬瓜茄子', // 自媒体名称
            weMediaImg:
                'http://d.ifengimg.com/q100/img1.ugc.ifeng.com/newugc/20180730/16/wemedia/e80ed7b4e871e0de9085ca727283460e24e0241c_size59_w200_h200.png', // 自媒体头像
            fhtId: '76916822', // 凤凰通id
            status: '3', // 账号状态（1：待审核 ，2：审核通过，,3：审核未通过,4:永久审核不通过）
            accountLevel: '6', // 账号等级
            isExperience: '1', // 是否是体验期账号，（1：体验账号，null：非体验账号）
            systemOfflineReason: '', // 系统下线原因
            accountType: '6', // 账号类型（1：凤凰账号，2：签约账号，3：视频账号，4：一点账号 , 5: UGC账号 ，6:  体验账号,）
            remainingPubNum: '0', // 当前剩余体验文章数
            mcnInfo: '苹果冬瓜茄子MCN组织管理员', // mcn信息描述
            subId: '370804', // mcn子账号id
            mcnId: '370804', // mcn母账号id
            mcnName: '苹果冬瓜茄子', // mcn名称
            isMcnManager: '0', // 是否是mcn管理员  2：是mcn主账号；1:是mcn子账号；0：不是mcn主账号或者不属于任何MCN组
            honorName: '', // 荣誉体系名称
            honorImg: 'http://p0.ifengimg.com/a/2018/0929/8c6f0f95dd440aesize5_w54_h54.png', // 荣誉体系头像
            online: 2, // 上下线状态  （0:默认 1：下线，2：上线）
            offlineReason: '资料不全被下线', // 账号下线原因
            auditReason: '资料不合规审核不通过', // 审核不通过原因
        };

        const status = await checkAccountStatus(accountInfo);

        console.log('status=', status);

        return accountStatusHandler(status);
    } catch (e) {
        console.error(e);

        throw new Error(e);
    }
};

/**
 * @func 头部所需所有请求，列于此，在header组件初始化时调用
 */

export const initGetHeaderData = async () => {
    try {
        // 获取自媒体用户账号信息

        getAccountStatus();

        // 获取未读消息数

        getNoReadCountHandler();
    } catch (e) {
        throw e;
    }
};
