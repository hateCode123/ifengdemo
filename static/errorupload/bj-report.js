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
        url: "http://err.ifengcloud.ifeng.com/v1/api/err", // 上报 接口
        offline_url: "", // 离线日志上报 接口
        offline_auto_url: "", // 检测是否自动上报
        ext: null, // 扩展参数 用于自定义上报
        level: 4, // 错误级别 1-debug 2-info 4-error
        ignore: [], // 忽略某个错误, 支持 Regexp 和 Function
        random: 1, // 抽样 (0-1] 1-全量
        delay: 1000, // 延迟上报 combo 为 true 时有效
        submit: null, // 自定义上报方式
        repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报),
        offlineLog: false,
        offlineLogExp: 5,  // 离线日志过期时间 ， 默认5天
        offlineLogAuto: false,  //是否自动询问服务器需要自动上报
    };

   function getErrorType (key){
       var type = 0;
        switch(key)
        {
            case 'ui':
                type = 1;
                break;
            case 'ad':
                type = 2;
                break;
            case 'data':
                type = 3;
                break;
            case 'api':
                type = 4;
                break;
            default:
                type = 0;
        }

        return type

   }
   function request(paras)
    {
        var url = global.location.href;
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
    }

    var Offline_DB = {
        db: null,
        ready: function(callback) {
            var self = this;
            if (!window.indexedDB || !_config.offlineLog) {
                _config.offlineLog = false;
                return callback();
            }

            if (this.db) {
                setTimeout(function() {
                    callback(null, self);
                }, 0);

                return;
            }
            var version = 1;
            var request = window.indexedDB.open("badjs", version);

            if (!request) {
                _config.offlineLog = false;
                return callback();
            }

            request.onerror = function(e) {
                callback(e);
                _config.offlineLog = false;
                console.log("indexdb request error");
                return true;
            };
            request.onsuccess = function(e) {
                self.db = e.target.result;

                setTimeout(function() {
                    callback(null, self);
                }, 500);


            };
            request.onupgradeneeded = function(e) {
                var db = e.target.result;
                if (!db.objectStoreNames.contains('logs')) {
                    db.createObjectStore('logs', { autoIncrement: true });
                }
            };
        },
        insertToDB: function(log) {
            var store = this.getStore();
            store.add(log);
        },
        addLog: function(log) {
            if (!this.db) {
                return;
            }
            this.insertToDB(log);
        },
        addLogs: function(logs) {
            if (!this.db) {
                return;
            }

            for (var i = 0; i < logs.length; i++) {
                this.addLog(logs[i]);
            }

        },
        getLogs: function(opt, callback) {
            if (!this.db) {
                return;
            }
            var store = this.getStore();
            var request = store.openCursor();
            var result = [];
            request.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.time >= opt.start && cursor.value.time <= opt.end && cursor.value.namespace == opt.namespace && cursor.value.appname == opt.appname) {
                        result.push(cursor.value);
                    }
                    //# cursor.continue
                    cursor["continue"]();
                } else {
                    callback(null, result);
                }
            };

            request.onerror = function(e) {
                callback(e);
                return true;
            };
        },
        clearDB: function(daysToMaintain) {
            if (!this.db) {
                return;
            }

            var store = this.getStore();
            if (!daysToMaintain) {
                store.clear();
                return;
            }
            var range = (Date.now() - (daysToMaintain || 2) * 24 * 3600 * 1000);
            var request = store.openCursor();
            request.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor && (cursor.value.time < range || !cursor.value.time)) {
                    store["delete"](cursor.primaryKey);
                    cursor["continue"]();
                }
            };
        },

        getStore: function() {
            var transaction = this.db.transaction("logs", 'readwrite');
            return transaction.objectStore("logs");
        },

    };

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
                    var url = errObj.stack.match("https?://[^\n]+");
                    url = url ? url[0] : "";
                    var rowCols = url.match(":(\\d+):(\\d+)");
                    if (!rowCols) {
                        rowCols = [0, 0, 0];
                    }

                    var stack = T.processStackMsg(errObj);
                    var type = errObj.type?errObj.type:0;
                    return {
                        msg: stack,
                        type: type,
                        rowNum: rowCols[1],
                        colNum: rowCols[2],
                        target: url.replace(rowCols[0], ""),
                        _orgMsg: errObj.toString()
                    };
                } else {
                    //ie 独有 error 对象信息，try-catch 捕获到错误信息传过来，造成没有msg
                    if (errObj.name && errObj.message && errObj.description) {
                        return {
                            msg: JSON.stringify(errObj)
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
        var newMsg = msg;

        if (error && error.stack) {
            newMsg = T.processStackMsg(error);
        }

        if (T.isOBJByType(newMsg, "Event")) {
            newMsg += newMsg.type ?
                ("--" + newMsg.type + "--" + (newMsg.target ?
                    (newMsg.target.tagName + "::" + newMsg.target.src) : "")) : "";
        }
        report.push({
            msg: newMsg,
            target: url,
            rowNum: line,
            colNum: col,
            _orgMsg: msg,
            type: 0
        });

        _process_log();
        orgError && orgError.apply(global, arguments);
    };



    var _report_log_tostring = function(error, index) {
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
    };



    var _offline_buffer = [];
    var _save2Offline = function(key, msgObj) {
        msgObj = T.extend({ namespace: _config.namespace, appname: _config.appname, time: new Date - 0 }, msgObj);

        if (Offline_DB.db) {
            Offline_DB.addLog(msgObj);
            return;
        }


        if (!Offline_DB.db && !_offline_buffer.length) {
            Offline_DB.ready(function(err, DB) {
                if (DB) {
                    if (_offline_buffer.length) {
                        DB.addLogs(_offline_buffer);
                        _offline_buffer = [];
                    }

                }
            });
        }
        _offline_buffer.push(msgObj);
    };

    var _autoReportOffline = function() {
        var script = document.createElement("script");
        script.src = _config.offline_auto_url || _config.url.replace(/badjs$/, "offlineAuto") + "?namespace=" + _config.namespace + "&appname=" + _config.appname;
        window._badjsOfflineAuto = function(isReport) {
            if (isReport) {
                BJ_REPORT.reportOfflineLog();
            }
        };
        document.head.appendChild(script);
    };



    var submit_log_list = [];
    var comboTimeout = 0;
    var _submit_log = function() {
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
            bid: global.bid ? global.bid : 'null',
            url: global.location.href.replace(/\?.*/,''),
            data: submit_log_list
        }


        var debugid = request('debugid');

        if(debugid){
            // url += '&debugid=' + debugid;
            err_json.debugid = debugid
        }

        var url =  _config._reportUrl +'?e='+ encodeURIComponent(JSON.stringify(err_json));

        if (_config.submit) {
            _config.submit(url, submit_log_list);
        } else {
            var _img = new Image();
            _img.src = url;
        }

        submit_log_list = [];
    };

    var _process_log = function(isReportNow) {
        if (!_config._reportUrl) return;

        var randomIgnore = Math.random() >= _config.random;


        while (_log_list.length) {
            var isIgnore = false;
            var report_log = _log_list.shift();
            //有效保证字符不要过长
            report_log.msg = (report_log.msg + "" || "").substr(0, 500);
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
                _config.offlineLog && _save2Offline("badjs_" + _config.namespace + _config.appname, report_log);
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
    };



    var report = global.BJ_REPORT = {
        push: function(msg) { // 将错误推到缓存池

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
        },
        report: function(msg, isReportNow, type) { // error report
            if(msg){
                msg.type = getErrorType(type);
                report.push(msg);
            }
           

            isReportNow && _process_log(true);
            return report;
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

        reportOfflineLog: function() {
            if (!window.indexedDB) {
                BJ_REPORT.info("unsupport offlineLog");
                return;
            }
            Offline_DB.ready(function(err, DB) {
                if (!DB) {
                    return;
                }
                var startDate = new Date - 0 - _config.offlineLogExp * 24 * 3600 * 1000;
                var endDate = new Date - 0;
                DB.getLogs({
                    start: startDate,
                    end: endDate,
                    namespace: _config.namespace,
                    appname: _config.appname
                }, function(err, result) {
                    var iframe = document.createElement("iframe");
                    iframe.name = "badjs_offline_" + (new Date - 0);
                    iframe.frameborder = 0;
                    iframe.height = 0;
                    iframe.width = 0;
                    iframe.src = "javascript:false;";

                    iframe.onload = function() {
                        var form = document.createElement("form");
                        form.style.display = "none";
                        form.target = iframe.name;
                        form.method = "POST";
                        form.action = _config.offline_url || _config.url.replace(/badjs$/, "offlineLog");
                        form.enctype.method = 'multipart/form-data';

                        var input = document.createElement("input");
                        input.style.display = "none";
                        input.type = "hidden";
                        input.name = "offline_log";
                        input.value = JSON.stringify({ logs: result, userAgent: navigator.userAgent, startDate: startDate, endDate: endDate, namespace: _config.namespace, appname: _config.appname });

                        iframe.contentDocument.body.appendChild(form);
                        form.appendChild(input);
                        form.submit();

                        setTimeout(function() {
                            document.body.removeChild(iframe);
                        }, 10000);

                        iframe.onload = null;
                    };
                    document.body.appendChild(iframe);
                });
            });
        },
        offlineLog: function(msg) {
            if (!msg) {
                return report;
            }
            if (T.isOBJ(msg)) {
                msg.level = 20;
            } else {
                msg = {
                    msg: msg,
                    level: 20
                };
            }
            report.push(msg);
            return report;
        },
        init: function(config) { // 初始化
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

            // if had error in cache , report now
            if (_log_list.length) {
                _process_log();
            }

            // init offline
            if (!Offline_DB._initing) {
                Offline_DB._initing = true;
                Offline_DB.ready(function(err, DB) {
                    if (DB) {
                        setTimeout(function() {
                            DB.clearDB(_config.offlineLogExp);
                            setTimeout(function() {
                                _config.offlineLogAuto && _autoReportOffline();
                            }, 5000);
                        }, 1000);
                    }

                });
            }



            return report;
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