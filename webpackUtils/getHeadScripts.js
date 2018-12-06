module.exports = {
    default: `<script>
        var allData = <%- JSON.stringify(allData).replace(/</g, '\\u003c') %>;
        var adData = <%- JSON.stringify(typeof adData ==='object' ? adData: {}) %>;
        var staticData = <%- JSON.stringify(typeof staticData ==='object' ? staticData: {}) %>;
        var __chipsData = <%- JSON.stringify(kvList) %>;
        var __apiReport = (Math.random() > 0.99);
        var __apiReportMaxCount = 50;

        var getChipsDataByKey = function (data, key) {
            for (var i = 0, iLen = data.length; i<iLen;i++) {
                if (data[i].key === key) {
                    return data[i];
                }
            }
    
            return null;
        }
    
        for (var key in adData) {
            try{
                if(key==='adHead' || key == 'adBody'){
                    continue;
                }
                allData[key] = new Function('return ' + decodeURIComponent(adData[key]))();
                if (typeof __chipsData !== 'undefined') {
                    allData[key].desc = getChipsDataByKey(__chipsData, key);
                    allData[key].code = adData[key];
                }
            }catch(e){
                console.error(key, e);
                allData[key] = {};
                e.message = key + ' ' +e.message;
                if (window && window.BJ_REPORT) window.BJ_REPORT.report(e, false, 'ad');
            }
    
        }
    
        for (var key in staticData) {
            try{
                if (typeof staticData[key] === 'string'){
                    allData[key] = decodeURIComponent(staticData[key]);
                } else {
                    allData[key] = staticData[key]
                }
            }catch(e){
                console.error(key, e);
                allData[key] = [];
                e.message = key + ' ' +e.message;
                if (window && window.BJ_REPORT) window.BJ_REPORT.report(e, false, 'data');
            }
        }
    
    </script>`,
};
