let config = require('../biz/configs');
let namespace = config.default.namespace;
let appname = config.default.appname;
let errorUploadUrl = 'https://test.err.ifengcloud.ifeng.com/v1/api/err';
let perfUploadUrl = '';
let env = process.env.NODE_ENV;
env = 'production';
module.exports = (level, type) => {
    let backstr = `
    <!--[if lt IE 8]>
    <!-- build:js ie8.polyfill.min.js crossorigin -->
        <script src="/polyfill/querySelector.js"></script>
        <script src="/polyfill/lib/json3.min.js"></script>
    <!-- endbuild -->
    <![endif]-->`;

    if (env == 'production') {
        backstr += `
    <script>
        var bid = <%- JSON.stringify(bid) %>;
        var router = <%- JSON.stringify(router) %>;
        var uid = (function(){
            return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        })();
    </script>
    <!-- build:js errorupload.min.js crossorigin -->
    <script src="/errorupload/bj-report.js"></script>
    <script src="/errorupload/bj-wrap.js"></script>
    <!-- endbuild -->
    <script>
        
        BJ_REPORT.init({
            namespace: '${namespace}',
            appname: '${appname}',
            url: "${errorUploadUrl}",
            // perf_url: "${perfUploadUrl}",
            level: 4
        });
        BJ_REPORT.tryJs().spyAll();

        var domreadyStatus = false;
        addListener()(document, "DOMContentLoaded", function(event) {
            domreadyStatus = true;
        });
        var loadStatus = false;
        addListener()(window, "load", function(event) {
            loadStatus = true;
            function showIframe(url){
                var iframe = document.createElement('iframe');
                iframe.src= url;
                iframe.width = 0;
                iframe.height = 0;
                iframe.display = 'none';
                document.body.appendChild(iframe);
            }
            showIframe('http://p1.ifengimg.com/a/2018/0920/injection.html?namespace=${namespace}&appname=${appname}&uid='+uid+'&router=<%- router %>');
        });
        setTimeout(function (){
            try {
                function upPerformance(){
                   if(!loadStatus){
                        addListener()(window, "load", function(event) {
                            var perfs = getPerformance();
                            var timing = getPerformanceTiming();
                            var err = new Error(JSON.stringify({perfs: perfs, timing: timing}));
                            if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'performance');
                        });
                   }
                }
        
                var node = document.body;
                if (node) {
                    var map = getAlive();
                    if(map.ALL < 200){
                        var perfs = getPerformance();
                        var timing = getPerformanceTiming();
                        var err = new Error(JSON.stringify({perfs: perfs, timing: timing}));
                        if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'alive');
                        upPerformance();
                    }
                } else {
                    var perfs = getPerformance();
                    var timing = getPerformanceTiming();
                    var err = new Error(JSON.stringify({description:'document.body is null',perfs: perfs, timing: timing}));
                    if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'document.body');
                    upPerformance();
                }
            } catch (error) {
                console && console.log(error);
            }
        
        }, 5000);
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