
const redis = require('../../../common/redis');
const logger = require('../../../common/logger');
const { KVProxy } = require('../../../providers/ucmsapiProxy');

const success= key => {
   return result => {
    // console.log('success.response.costtime:', result.response.costtime);
    // console.log("success.response:", result.response);
        try {
            if (typeof result.response.return === 'string') {
                result.response.return = JSON.parse(result.response.return);
            }

            //console.dir(result.response.return,{depth:null})

            if (key && typeof result.response.return[key] === 'string') {
                return JSON.parse(result.response.return[key]);
            }
        } catch (err) {
            //console.log(err)
            return null;
        }

        return result.response.return;

    }
};

const error = result => {
    console.log('error.response.costtime:', result.response.costtime);
    console.log('error.response:', result.response.error);
};

exports.finance_wemoney = {
    path: '/pc/finance_wemoney',
    method: 'get',
    edit:true,
    type:'html',
    handler: async ctx => {
        //wemoney导航静态碎片
        console.log('getStaticFragment 10003...')
        const wemoneyNav = KVProxy.getStaticFragment(10003).then(success(), error);
        const wemoneyLunbo = KVProxy.getStaticFragment(10006).then(success('content'), error);
        const wemoneyNewsRanking = KVProxy.getStaticFragment(10005).then(success('content'), error);
        const wemoneyNewsFlow = KVProxy.getStaticFragment(10007).then(success('content'), error);


        const otherData = await Promise.all([
            wemoneyNav,
            wemoneyLunbo,
            wemoneyNewsFlow,
            wemoneyNewsRanking
        ]);

        //console.log("11111 : ", otherData)
        //const data = {
         const  allData= {
                wemoneyNav: otherData[0],
                wemoneyLunbo: otherData[1],
                wemoneyNewsFlow: otherData[2],
                wemoneyNewsRanking: otherData[3],
            }
        //};
        //console.log(allData)
        await ctx.html('finance_wemoney', {allData});
    },
};
