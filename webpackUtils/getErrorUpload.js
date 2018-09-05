let config = require('../biz/configs');
let namespace = config.default.namespace;
let appname = config.default.appname;
let errorUploadUrl = 'https://err.ifengcloud.ifeng.com/v1/api/err';

module.exports = () => {
    return `<script>var bid = <%- JSON.stringify(bid) %>;</script>
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
    fds(document.body);
 
    if(map.ALL < 200){
        var err = new Error(JSON.stringify(map));
        if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'alive');
    }
  }, 5000);
  </script>
  `;
};

