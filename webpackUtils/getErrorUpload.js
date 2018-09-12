let config = require('../biz/configs');
let namespace = config.default.namespace;
let appname = config.default.appname;
let errorUploadUrl = 'https://err.ifengcloud.ifeng.com/v1/api/err';

module.exports = () => {
    return `<script>var bid = <%- JSON.stringify(bid) %>;
    var uid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    var domreadyStatus = false;
    document.addEventListener("DOMContentLoaded", function(event) {
        domreadyStatus = true;
    });
    var loadStatus = false;
    document.addEventListener("load", function(event) {
        loadStatus = true;
    });
    </script>
    <!-- build:js errorupload.min.js -->
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

       
    </script>

    <script>
setTimeout(function (){
    var map = {};
    function getPerformance(map){
        if(performance && performance.getEntries) {
            var performances = performance.getEntries("*")
            map.performance = [];
            for(var i=0,len=performances.length;i<len;i++){
                var perf = performances[i];
                if(perf.initiatorType == 'script' || perf.initiatorType == 'navigation'){
                   // map.performance.push([perf.name, perf.duration, performance.timing.requestStart-performance.timing.connectStart,performance.timing.responseStart-performance.timing.requestStart,performance.timing.responseEnd-performance.timing.responseStart]);
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
           fds(children[i])
        }
    }
 
    var node = document.body;
    if (node) {
        fds(node);
        if(map.ALL < 200){
            getPerformance(map);
            var err = new Error(JSON.stringify(map));
            if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'alive');
        }
    } else {
        map.description = 'document.body is null';
        getPerformance(map);
        var err = new Error(JSON.stringify(map));
        if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'document.body');
    }
  }, 5000);
  </script>
  `;
};

