let config = require('../biz/configs');
let namespace = config.default.namespace;
let appname = config.default.appname;
let errorUploadUrl = 'https://err.ifengcloud.ifeng.com/v1/api/err';
let heartbeatUrl = 'https://err.ifengcloud.ifeng.com/v1/api/hb';
let perfUrl = 'https://err.ifengcloud.ifeng.com/v1/api/perf';
let filterJsList = [
    "/inice",
    "/fa.min.js"
]
let env = process.env.NODE_ENV;

module.exports = (level, type) => {
    let backstr = `
    <!--[if lt IE 8]>
    <!-- build:js ie8.polyfill.min.js crossorigin="anonymous"  -->
        <script src="/polyfill/querySelector.js"></script>
        <script src="/polyfill/lib/json3.min.js"></script>
    <!-- endbuild -->
    <![endif]-->`;

    if (env == 'production') {
        backstr += `
    <!-- build:js errorupload.min.js crossorigin="anonymous" -->
    <script src="/errorupload/bj-report.js"></script>
    <script src="/errorupload/bj-wrap.js"></script>
    <!-- endbuild -->
    <script>
        try {
            BJ_REPORT.init({
                namespace: '${namespace}',
                appname: '${appname}',
                url: "${errorUploadUrl}",
                hb_url: "${heartbeatUrl}",
                perf_url: "${perfUrl}",
                level: 4,
                bid: <%- JSON.stringify(bid) %>,
                router: <%- JSON.stringify(router) %>,
                perf_filter_list: ${JSON.stringify(filterJsList)},
                perf_timeout: 0,
                pref_count: 50
            });
            BJ_REPORT.tryJs().spyAll();
            BJ_REPORT.heartbeat();
            BJ_REPORT.injection();
            BJ_REPORT.alive();
            BJ_REPORT.performace();
        } catch (error){
            console && console.error(error);
        }
            
    </script>
    <script src="//p2.ifengimg.com/a/2018/0913/adview_pic_cpc_cpm_cpa_guanggao_gg_ads_300x250.js" type="text/javascript"></script> 
    <script type="text/javascript">
        if (typeof(killads) == 'undefined'){
            var err = new Error('脚本被拦截');
            if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'prevent');
        }
    </script>
    `;
    }

    return backstr;
};