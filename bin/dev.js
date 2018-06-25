const shell = require('shelljs');
const Path = require('path');
const del = require('del');
const fs = require('fs');

const readline = require('readline');

(async () => {
    let config = await getConfig();
    console.log(config);
    let platform = config.match(/\-\-platform +([a-zA-Z0-9,]*)/);
    let platform_list = platform && platform[1] ? platform[1].split(',') : [];
    platform_list = platform_list.length == 0 ? ['pc', 'mobile'] : platform_list;
    // console.log(platform_list);

    let type = config.match(/\-\-type +([a-zA-Z0-9,]*)/);
    let type_list = type && type[1] ? type[1].split(',') : [];
    type_list = type_list.length == 0 ? ['view', 'edit', 'low'] : type_list;
    // console.log(type_list);

    let path = config.match(/\-\-path +([a-zA-Z0-9,\/]*)/);
    let path_list = path && path[1] ? path[1].split(',') : [];
    path_list = path_list.length == 0 ? '**' : path_list;
    // console.log(path_list);
    let json = { platform: platform_list, type: type_list, path: path_list };

    let arr = del.sync([Path.join(__dirname + '/../devtmp/**')]);
    console.log('正在删除目录');
    console.dir(arr);
    shell.exec('nodemon ./app.js | bunyan', { async: true }, (code, stdout, stderr) => {});

    shell.exec(
        `webpack --watch --env.config ${encodeURIComponent(JSON.stringify(json))}`,
        { async: true },
        (code, stdout, stderr) => {},
    );

    // npm start --platform pc --type view,edit --path finace/index,finace/money
})();

function getConfig() {
    let config = '';
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(Path.join(__dirname, '/dev_webpack_config'), 'utf-8'),
            crlfDelay: Infinity,
        });

        rl.on('line', line => {
            line = line.trim();
            if (line) {
                if (line.indexOf('#') !== 0) {
                    config = line;
                }
            }
        });

        rl.on('close', line => {
            resolve(config);
        });

        rl.on('error', error => {
            console.log(error);
            reject(error);
        });
    });
}
