/*!
 * @module report
 * @author kael, chriscai
 * @date @DATE
 * Copyright (c) 2014 kael, chriscai
 * Licensed under the MIT license.
 */


var BJ_REPORT = (function(global) {
    if (global.BJ_REPORT) return global.BJ_REPORT;

    var _log_list = [];
    var _log_map = {};
    var _config = {
        namespace: "", // 命名空间， 
        appname: "", // 项目名称
        url: "", // 错误上报 接口
        hb_url: '', // 心跳上报 接口
        ext: null, // 扩展参数 用于自定义上报
        level: 4, // 错误级别 1-debug 2-info 4-error
        ignore: [], // 忽略某个错误, 支持 Regexp 和 Function
        random: 1, // 抽样 (0-1] 1-全量
        delay: 2000, // 延迟上报 combo 为 true 时有效
        submit: null, // 自定义上报方式
        repeat: 5 ,// 重复上报次数(对于同一个错误超过多少次不上报),
        uid: getUid(),
        bid: '',
        router: '',
        perf_url: '',
        perf_filter_list: [],
        perf_timeout: 0,
        pref_count: 50
    };
    var debugid = request('debugid');
    var sid = getCookie('sid');
    var userid = getCookie('userid');

   function getErrorType (key){
       var type = 0;
        switch(key)
        {
            case 'ui':          // ui错误
                type = 1;
                break;
            case 'ad':          // 广告错误
                type = 2;
                break;
            case 'data':        // 数据错误
                type = 3;
                break;
            case 'api':         // api错误
                type = 4;
                break;
            case 'alive':       // 5s验活失败
                type = 5;
                break;
            case 'document.body': // 5s页面超时未响应
                type = 6;
                break;
            case 'match':       // 路由错配
                type = 7;
                break;
            case 'prevent':     // 广告脚本被阻止
                type = 8;
                break;
            case 'performance': // 验活失败增加load事件监听，并上报资源加载时间
                type = 9;
                break;
            case 'inject':     // 流量劫持注入
                type = 10;
                break;
            default:
                type = 0;       // 未知错误
        }

        return type

   }
   
    function request(paras)
    {
        try {
            var url = window.location.href;
            var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
            var paraObj = {}
            for (var i= 0,j; j=paraString[i]; i++){
                paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
            }
            var returnValue = paraObj[paras.toLowerCase()];
            if(typeof(returnValue)=="undefined"){
                return "";
            }else{
                return returnValue;
            }
        } catch (error) {
            console && console.error(error);
        }
       
    }

    function getCookie(name) {
        try {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]);
            return null
        } catch (error) {
            console && console.error(error);
        }
    }

    function getAlive () {
        try {
            var map = {};
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
            if(document.body){
                fds(document);
                return map;
            }
            return {description:'document.body is not ok'};
        } catch (error) {
            console && console.error(error);
        }
        
    }

    function addListener () {
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
    };
    function isInFilterList(url){
        try {
            if(!url){
                return false;
            }
            if(url.indexOf('err.ifengcloud.ifeng.com')>-1){
                return false;
            }
            for(var i=0; i< _config.perf_filter_list.length; i++){
                if(url.indexOf(_config.perf_filter_list[i])>-1){
                    return true;
                }
            };
            return false;
        } catch (error) {
            console && console.error(error)
            return false;
        }
        
    }

    function getPerformance(){
        try {
            var performance = window.performance;
            if (!performance) {
                return ;
            }
        
            var perfs = [];
            var fixed_perfs =  []; // 上报页面性能 和 perf_filter_list 中的脚本
            var t = performance.timing;
            
            if(t){
                var times = {}
                // times.loadPage = t.loadEventEnd - (t.navigationStart||t.fetchStart);
                times.loadPage = t.domComplete - t.fetchStart;
                // times.domReady = t.domComplete - t.responseEnd;
                times.domReady = t.domContentLoadedEventEnd - t.fetchStart;
                times.redirect = t.redirectEnd - t.redirectStart;
                times.appcache = t.domainLookupStart - t.fetchStart;
                times.dns = t.domainLookupEnd - t.domainLookupStart;
                times.tcp = t.connectEnd - t.connectStart;
                times.ttfb = t.responseStart - (t.navigationStart||t.fetchStart);
                times.request = t.responseEnd - t.requestStart;
                times.response = t.responseEnd - t.responseStart;
                times.loadEvent = t.loadEventEnd - t.loadEventStart;
                times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
                times.name = window.location.href.replace(/\?.*/,'');
                fixed_perfs.push(times);
            }
        
            if(performance.getEntries) {
                var performances = performance.getEntries("*");
                for(var i=0,len=performances.length;i<len;i++){
                    var perf = performances[i];
                    
                    if(i==0 && fixed_perfs.length > 0){
                        fixed_perfs[0].duration = parseInt(perf.duration);
                        if( parseInt(perf.domComplete) > 0){
                            fixed_perfs[0].loadPage = parseInt(perf.domComplete)
                        }
                        if( parseInt(perf.domContentLoadedEventEnd) > 0){
                            fixed_perfs[0].domReady = parseInt(perf.domContentLoadedEventEnd)
                        }
                        
                        // fixed_perfs[0]._duration = parseInt(perf.responseEnd - perf.startTime);
                        continue;
                    }
                  
                    if(!perf.name || (perf.name.indexOf('.css') == -1 &&perf.name.indexOf('.js') == -1 )){
                        continue;
                    };

                    var perf_data = {
                        name: perf.name,
                        duration: parseInt(perf.duration),
                        _duration: parseInt(perf.responseEnd - perf.startTime),
                        redirect: parseInt(perf.redirectEnd - perf.redirectStart),
                        appcache: parseInt(perf.domainLookupStart - perf.fetchStart),
                        dns: parseInt(perf.domainLookupEnd - perf.domainLookupStart),
                        tcp: parseInt(perf.connectEnd - perf.connectStart),
                        request: parseInt(perf.responseStart - perf.requestStart),
                        response: parseInt(perf.responseEnd - perf.responseStart)
                    }
                    // console.log( perf.name, perf_data.duration, perf_data.response,_config.perf_timeout )
                    if(isInFilterList(perf.name)){
                        fixed_perfs.push(perf_data);
                    }
                    // else if(perf_data.duration> _config.perf_timeout ){
                    //     perfs.push(perf_data);
                    // }
                }
            }
            // console.log(JSON.stringify(perfs))
            if(perfs.length > _config.pref_count){
                perfs = perfs.sort(function(a,b){
                    return  (a.response < b.response) ? 1 : -1
                })
                // console.log(perfs)
                perfs = perfs.slice(0,_config.pref_count);
                // console.log(perfs)
            }

            return fixed_perfs.concat(perfs);

        } catch (error) {
            console && console.error(error);
            return [];
        }
    
    }

    function getUid(){
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
   
    var T = {
        isOBJByType: function(o, type) {
            return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]";
        },

        isOBJ: function(obj) {
            var type = typeof obj;
            return type === "object" && !!obj;
        },
        isEmpty: function(obj) {
            if (obj === null) return true;
            if (T.isOBJByType(obj, "Number")) {
                return false;
            }
            return !obj;
        },
        extend: function(src, source) {
            for (var key in source) {
                src[key] = source[key];
            }
            return src;
        },
        processError: function(errObj) {
            try {
                if (errObj.stack) {
                    var url = errObj.stack.match("https?://[^\n\"]+");
                    url = url ? url[0] : "";
                    var rowCols = url.match(/:(\d+):(\d+)\)?/);
                    if (!rowCols) {
                        rowCols = [0, 0, 0];
                    }

                    var stack = T.processStackMsg(errObj);
                    var type = errObj.type?errObj.type:0;
                    return {
                        msg: errObj.toString(), //stack,
                        type: type,
                        rowNum: rowCols[1],
                        colNum: rowCols[2],
                        target: url.replace(rowCols[0], ""),
                        _orgMsg: stack //errObj.toString()
                    };
                } else {
                    var type = errObj.type?errObj.type:0;
                    //ie 独有 error 对象信息，try-catch 捕获到错误信息传过来，造成没有msg
                    if (errObj.name && errObj.message && errObj.description) {
                        return {
                            msg: JSON.stringify(errObj),
                            type: type,
                            rowNum: 0,
                            colNum: 0,
                            target: 'null'
                        };
                    }
                    return errObj;
                }
            } catch (err) {
                return errObj;
            }
        },

        processStackMsg: function(error) {
            var stack = error.stack
                .replace(/\n/gi, "")
                .split(/\bat\b/)
                .slice(0, 9)
                .join("@")
                .replace(/\?[^:]+/gi, "");
            var msg = error.toString();
            if (stack.indexOf(msg) < 0) {
                stack = msg + "@" + stack;
            }
            return stack;
        },

        isRepeat: function(error) {
            if (!T.isOBJ(error)) return true;
            var msg = error.msg;
            var times = _log_map[msg] = (parseInt(_log_map[msg], 10) || 0) + 1;
            return times > _config.repeat;
        }
    };

    var orgError = global.onerror;
    // rewrite window.oerror
    global.onerror = function(msg, url, line, col, error) {
        try {
            var newMsg = msg;

            if (error && error.stack) {
                newMsg = T.processStackMsg(error);
            }

            if (T.isOBJByType(newMsg, "Event")) {
                newMsg += newMsg.type ?
                    ("--" + newMsg.type + "--" + (newMsg.target ?
                        (newMsg.target.tagName + "::" + newMsg.target.src) : "")) : "";
            }
            newMsg += ', alive：'+ JSON.stringify(getAlive());
            report.push({
                msg: newMsg,
                target: url,
                rowNum: line,
                colNum: col,
                _orgMsg: newMsg,
                type: 0
            });

            _process_log();
            orgError && orgError.apply(global, arguments);
        } catch (error) {
            console && console.error(error)
        }
        
    };

    var _report_log_tostring = function(error, index) {
        try {
            var param = [];
            // var params = [];
            var params = {};
            var stringify = [];
            if (T.isOBJ(error)) {
                error.level = error.level || _config.level;
                for (var key in error) {
                    var value = error[key];
                    // if (!T.isEmpty(value)) {
                        if (T.isOBJ(value)) {
                            try {
                                value = JSON.stringify(value);
                            } catch (err) {
                                value = "[BJ_REPORT detect value stringify error] " + err.toString();
                            }
                        }
                        if(key==='rowNum'|| key==='colNum'){
                            value = !isNaN(value)?value:0;
                            value = Number(value);
                        }
                        
                        stringify.push(key + ":" + value);
                        param.push(key + "=" + encodeURIComponent(value));
                        // params.push(key + "[" + index + "]=" + encodeURIComponent(value));
                        params[key] = value
                    // }
                }
            }

            // msg[0]=msg&target[0]=target -- combo report
            // msg:msg,target:target -- ignore
            // msg=msg&target=target -- report with out combo
            return [params, stringify.join(","), param.join("&")];
        } catch (error) {
            console && console.error(error)
        }
        
    };

    var submit_log_list = [];
    var comboTimeout = 0;
    var _submit_log = function() {
        try {
            clearTimeout(comboTimeout);
            // https://github.com/BetterJS/badjs-report/issues/34
            comboTimeout = 0;

            if (!submit_log_list.length) {
                return;
            }
            // var upload_url = encodeURIComponent(global.location.href.replace(/\?.*/,''));
            // var bid =  global.bid ? global.bid : 'null';
            // var url = _config._reportUrl + submit_log_list.join("&") + "&count=" + submit_log_list.length + "&_t=" + (+new Date)+"&bid="+ global.bid +"&url="+ upload_url ;
            
            var err_json = {
                namespace:_config.namespace,
                appname: _config.appname,
                count: submit_log_list.length,
                _t: new Date - 0,
                bid: _config.bid,
                url: _config.router,
                data: submit_log_list,
                uid: _config.uid
            }


           

            if(debugid){
                err_json.debugid = debugid;
            }
            if(sid){
                err_json.sid = sid;
            }
            if(userid){
                err_json.userid = userid;
            }

            var url =  _config._reportUrl +'?e='+ encodeURIComponent(JSON.stringify(err_json));

            if (_config.submit) {
                _config.submit(url, submit_log_list);
            } else {
                var _img = new Image();
                _img.src = url;
            }

            submit_log_list = [];
        } catch (error) {
            console && console.error(error)
        }
        
    };

    var _process_log = function(isReportNow) {
        try {
            if (!_config._reportUrl) return;

            var randomIgnore = Math.random() >= _config.random;


            while (_log_list.length) {
                var isIgnore = false;
                var report_log = _log_list.shift();
                //有效保证字符不要过长
                report_log.msg = (report_log.msg + "" || "").substr(0, 5000);
                // 重复上报
                if (T.isRepeat(report_log)) continue;
                var log_str = _report_log_tostring(report_log, submit_log_list.length);
                if (T.isOBJByType(_config.ignore, "Array")) {
                    for (var i = 0, l = _config.ignore.length; i < l; i++) {
                        var rule = _config.ignore[i];
                        if ((T.isOBJByType(rule, "RegExp") && rule.test(log_str[1])) ||
                            (T.isOBJByType(rule, "Function") && rule(report_log, log_str[1]))) {
                            isIgnore = true;
                            break;
                        }
                    }
                }
                if (!isIgnore) {
                    if (!randomIgnore && report_log.level != 20) {
                        submit_log_list.push(log_str[0]);
                        _config.onReport && (_config.onReport(_config.namespace, report_log));
                    }

                }
            }


            if (isReportNow) {
                _submit_log(); // 立即上报
            } else if (!comboTimeout) {
                comboTimeout = setTimeout(_submit_log, _config.delay); // 延迟上报
            }
        } catch (error) {
            console && console.error(error)
        }
        
    };

    var loadStatus = false; // load 状态

    var report = global.BJ_REPORT = {
        push: function(msg) { // 将错误推到缓存池
            try {
                var data = T.isOBJ(msg) ? T.processError(msg) : {
                    msg: msg
                };
    
                // ext 有默认值, 且上报不包含 ext, 使用默认 ext
                if (_config.ext && !data.ext) {
                    data.ext = _config.ext;
                }
                // 在错误发生时获取页面链接
                // https://github.com/BetterJS/badjs-report/issues/19
                if (!data.from) {
                    data.from = location.href;
                }
    
                if (data._orgMsg) {
                    var _orgMsg = data._orgMsg;
                    delete data._orgMsg;
                    data.level = 2;
                    var newData = T.extend({}, data);
                    newData.level = 4;
                    newData.msg = _orgMsg;
                    // _log_list.push(data);
                    _log_list.push(newData);
                } else {
                    _log_list.push(data);
                }
    
                _process_log();
                return report;
            } catch (error) {
                console && console.error(error)
            }
            
        },
        report: function(msg, isReportNow, type) { // error report
            try {
                if(typeof msg == 'object'){
                    msg.message  += ', alive：' + JSON.stringify(getAlive());
                }
                
                if(msg){
                    msg.type = getErrorType(type);
                    report.push(msg);
                }

                isReportNow && _process_log(true);
                return report;
            } catch (error) {
                console && console.error(error)
            }
            
        },
        heartbeat: function(){
            try {
                // 发送心跳
                var heartjson =  {
                    namespace:_config.namespace,
                    appname: _config.appname,
                    route: _config.router,
                    url: window.location.href
                }
                var url = _config.hb_url + '?d=' + encodeURIComponent(JSON.stringify(heartjson));

                var _img = new Image();
                _img.src = url;
            } catch (error) {
                console && console.error(error)
            }
            
        },
        // 上报性能
        performace: function(){
            var uploadStatus = false;
            addListener()(document, "DOMContentLoaded", function(event) {
                var arr = [];
                if(performance.getEntries){
                    var performances = performance.getEntries("*");
                    for(var i=0,len=performances.length;i<len;i++){
                        var perf = performances[i];
                    
                        if(perf.name && (perf.name.indexOf('.css') > -1 || perf.name.indexOf('.js') > -1 )){
                            _config.perf_filter_list.push(perf.name)
                            // arr.push(perf.name)
                        }
                       
                    }
          
                }
                // console.log('DOMContentLoaded')
                // console.log(_config.perf_filter_list)
            });
            
            function sendDate(event){
                if(uploadStatus){
                    return;
                }
                uploadStatus = true;
                var json =  {
                    namespace:_config.namespace,
                    appname: _config.appname,
                    route: _config.router,
                    _t: new Date - 0,
                    uid: _config.uid,
                    bid: _config.bid,
                    sid: sid,
                    userid: userid,
                    event: event,
                    url: global.location.href.replace(/\?.*/,''),
                    requests: getPerformance()
                }
                var url = _config.perf_url+'?d=' + encodeURIComponent(JSON.stringify(json));
                
                var _img = new Image();
                _img.src = url;
                var now = +new Date;
                while(new Date - now <= 20) {} // 阻塞 20ms
            }
    
            addListener()(window, "load", function(event) {
                setTimeout(function(){
                    sendDate('load');
                },300)
                
            });

            addListener()(window, "beforeunload", function(e) {
                sendDate('beforeunload');
            });

            addListener()(window, "unload", function(e) {
                sendDate('unload');
            });
        },
         // 拦截注入
         injection: function(){
            addListener()(window, "load", function(event) {
                try {
                    loadStatus = true;
                    function showIframe(url){
                        var iframe = document.createElement('iframe');
                        iframe.src= url;
                        iframe.width = 0;
                        iframe.height = 0;
                        iframe.display = 'none';
                        document.body.appendChild(iframe);
                    }
                    showIframe('//p1.ifengimg.com/a/2018/0920/injection.html?namespace=' + _config.namespace + '&appname=' + _config.appname + '&uid=' + _config.uid + '&router=' + _config.router);
                } catch (error) {
                    console && console.error(err)
                }
                
    
            });
        },
        // 验活
        alive: function(){
            setTimeout(function (){
                try {
                    var node = document.body;
                    if (node) {
                        var map = getAlive();
                        if(map.ALL < 200){
                            // var perfs = getPerformance();
        
                            var err = new Error('alive error');
                            if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'alive');
                            // upPerformance();
                        }
                    } else {
                        var perfs = getPerformance();
                        var err = new Error('document.body is null');
                        if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'document.body');
                        // upPerformance();
                    }
                } catch (error) {
                    console && console.error(error);
                }
            
            }, 5000);
        },
        info: function(msg) { // info report
            if (!msg) {
                return report;
            }
            if (T.isOBJ(msg)) {
                msg.level = 2;
            } else {
                msg = {
                    msg: msg,
                    level: 2
                };
            }
            report.push(msg);
            return report;
        },
        debug: function(msg) { // debug report
            if (!msg) {
                return report;
            }
            if (T.isOBJ(msg)) {
                msg.level = 1;
            } else {
                msg = {
                    msg: msg,
                    level: 1
                };
            }
            report.push(msg);
            return report;
        },
        init: function(config) { // 初始化
            try {
                if (T.isOBJ(config)) {
                    for (var key in config) {
                        _config[key] = config[key];
                    }
                }
                // 没有设置namespace 和 appname 将不上报
                if (_config.namespace && _config.appname) {
                    // set default report url and uin
                    // if (/qq\.com$/gi.test(location.hostname)) {
                    //     if (!_config.url) {
                    //         _config.url = "//badjs2.qq.com/badjs";
                    //     }
    
                    //     if (!_config.uin) {
                    //         _config.uin = parseInt((document.cookie.match(/\buin=\D+(\d+)/) || [])[1], 10);
                    //     }
                    // }
    
                    _config._reportUrl = _config.url;
                }
                if(!_config.router){
                    _config.router = global.location.href.replace(/\?.*/,'')
                }

                if(!_config.bid){
                    _config.bid = 'null';
                }
                
                // if had error in cache , report now
                if (_log_list.length) {
                    _process_log();
                }

                return report;
            } catch (error) {
                console && console.error(error)
            }
            
        },

        __onerror__: global.onerror
    };

    typeof console !== "undefined" && console.error && setTimeout(function() {
        var err = ((location.hash || "").match(/([#&])BJ_ERROR=([^&$]+)/) || [])[2];
        err && console.error("BJ_ERROR", decodeURIComponent(err).replace(/(:\d+:\d+)\s*/g, "$1\n"));
    }, 0);

    return report;

}(window));

if (typeof module !== "undefined") {
    module.exports = BJ_REPORT;
}