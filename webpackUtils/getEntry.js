const glob = require('glob');
const _ = require('lodash');

module.exports = function getEntrys(globPath, filepath) {
    // console.log('entry');
    // console.log(filepath);
    let files = glob.sync(globPath);
    if (filepath && filepath !== '**') {
        let list = [];
        for (const item of files) {
            for (const path of filepath) {
                // console.log(item+'----'+path);
                if (item.indexOf(path) > -1) {
                    list.push(item);
                }
            }
        }
        files = list;
    }
    // console.log(files);

    let result = {};
    for (let file of files) {
        let path = file.replace('./client/pc/', '').replace('./client/mobile/', '');
        let paths = path.split('/');
        paths.pop();
        let entryName = paths.join('_');
        result[entryName] = file;
    }
    return result;
};
// getEntrys('./views/*/app.js');
