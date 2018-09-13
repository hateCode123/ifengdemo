let config = require('../biz/configs');
let namespace = config.default.namespace;
let appname = config.default.appname;
let errorUploadUrl = 'https://err.ifengcloud.ifeng.com/v1/api/err';
let env = process.env.NODE_ENV;

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
    <script>var bid = <%- JSON.stringify(bid) %>;
    var addListener = (function(){
        if(document.addEventListener){
            return function(element, type, fun, useCapture){
                element.addEventListener(type, fun, useCapture ? useCapture : false);
            };    
        }else{
            return function(element, type, fun){
                element.attachEvent("on" + type, function(event){
                    fun.call(element, event);
                });
            };
        }
    })();
    
    try {
        var uid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        var domreadyStatus = false;
        addListener(document, "DOMContentLoaded", function(event) {
            domreadyStatus = true;
        });
        var loadStatus = false;
        addListener(window, "load", function(event) {
            loadStatus = true;
        });
    } catch(error){
        console && console.log(error);
    }
    </script>
    <!-- build:js errorupload.min.js crossorigin -->
    <script src="/errorupload/bj-report.js"></script>
    <script src="/errorupload/bj-wrap.js"></script>
    <!-- endbuild -->
    <script>
        BJ_REPORT.init({
            namespace: '${namespace}', // 命名空间
            appname: '${appname}', // 项目名称
            url: "${errorUploadUrl}",
            level: 4
        });
        BJ_REPORT.tryJs().spyAll();

        setTimeout(function (){
            try {
                var map = {};

                function getPerformance(map){
                    if(performance && performance.getEntries) {
                        var performances = performance.getEntries("*")
                        map.performance = [];
                        for(var i=0,len=performances.length;i<len;i++){
                            var perf = performances[i];
                            if(perf.initiatorType == 'script' || perf.initiatorType == 'navigation'){
                                map.performance.push([perf.name, perf.duration, perf.requestStart-perf.connectStart,perf.responseStart-perf.requestStart,perf.responseEnd-perf.responseStart]);
                            }
                        
                        }
                    }
                    map.loadStatus = loadStatus;
                    map.domreadyStatus = domreadyStatus;
                }

                function fds(node){
                    if(node.nodeType === 1){
                        var tagName = node.nodeName;
                        map[tagName] = map[tagName]? map[tagName] + 1: 1;
                        map.ALL = map.ALL ? map.ALL + 1: 1;
                    }
                    var children = node.childNodes;
                    for(var i = 0;i<children.length;i++){
                        fds(children[i]);
                    }
                }

                function upPerformance(){
                   if(!loadStatus){
            
                        addListener(window, "load", function(event) {
                            var pf = {}
                            getPerformance(pf);
                            var err = new Error(JSON.stringify(pf));
                            if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'performance');
                        });
                   }
                }
        
                var node = document.body;
                if (node) {
                    fds(node);
                    if(map.ALL < 200){
                        getPerformance(map);
                        var err = new Error(JSON.stringify(map));
                        if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'alive');
                        upPerformance();

                    }
                } else {
                    map.description = 'document.body is null';
                    getPerformance(map);
                    var err = new Error(JSON.stringify(map));
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
