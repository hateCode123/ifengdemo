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
    </script>`;
};
