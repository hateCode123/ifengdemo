'use strict';

const { resolve } = require('path');
const debug = require('debug')('koa-views');
const consolidate = require('consolidate');
const send = require('koa-send');
const getPaths = require('get-paths');
const pretty = require('pretty');

module.exports = viewsMiddleware;

function viewsMiddleware(path, { engineSource = consolidate, extension = 'html', options = {}, map } = {}) {
    return function views(ctx, next) {
        if (ctx.render) return next();

        ctx.render = async function(relPath, locals = {}) {
            try {
                return await getPaths(path, relPath, extension).then(paths => {
                    const suffix = paths.ext;
                    const state = Object.assign(locals, options, ctx.state || {});
                    // deep copy partials
                    state.partials = Object.assign({}, options.partials || {});
                    debug('render `%s` with %j', paths.rel, state);
                    ctx.type = 'text/html';

                    if (isHtml(suffix) && !map) {
                        return send(ctx, paths.rel, {
                            root: path,
                        });
                    } else {
                        const engineName = map && map[suffix] ? map[suffix] : suffix;

                        const render = engineSource[engineName];

                        if (!engineName || !render)
                            return Promise.reject(new Error(`Engine not found for the ".${suffix}" file extension`));

                        return render(resolve(path, paths.rel), state).then(html => {
                            // throw new Error('出错了')
                            // since pug has deprecated `pretty` option
                            // we'll use the `pretty` package in the meanwhile
                            if (locals.pretty) {
                                debug('using `pretty` package to beautify HTML');
                                html = pretty(html);
                            }

                            ctx.body = injectHtml(html);
                        });
                    }
                });
            } catch (error) {
                let html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Error - 500</title>
                    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0">
                    <style>
                    body {
                        padding: 50px 80px;
                        font: 14px "Helvetica Neue", Helvetica, sans-serif;
                    }

                    h1 {
                        font-size: 2em;
                        margin-bottom: 5px;
                    }

                    pre {
                        font-size: .8em;
                    }
                    </style>
                </head>
                <body>
                    <div id="error">
                    <h1>Error</h1>
                    <p>Looks like something broke!</p>
                    <pre>
                        <code>
${error}
                        </code>
                    </pre>
                    </div>
                </body>
                </html>
            `;
                ctx.body = injectHtml(html);
            }
        };

        return next();
    };
}

function isHtml(ext) {
    return ext === 'html';
}

function injectHtml(html) {
    html = html.split('</head>');
    return html.join(`
    <script src="/socket.io.js"></script>
    <script>
    setTimeout(function(){
            var socket = null;
            if (/Firefox\\/\\s/.test(navigator.userAgent)){
                socket = io.connect({transports:['xhr-polling']}); 
            } 
            else if (/MSIE (\d+.\d+);/.test(navigator.userAgent)){
                socket = io.connect({transports:['xhr-polling','jsonp-polling']}); 
            } 
            else { 
                socket = io.connect(); 
            }
    
            socket.on('reload', function () {
                window.location.reload();
            });
    
            socket.on('connect_error', function (error) {
                //console.log(error);
            });
    
            socket.on('reconnect_error', function (error) {
                //console.log(error);
            });
    
            socket.on('reconnect_failed', function() {
                //console.log(reconnect_failed);
            });
    
            socket.on('error', function (error) {
                // console.log(error);
            });
    }, 0);
    </script></head>`);
}
