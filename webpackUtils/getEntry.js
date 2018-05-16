const glob = require('glob');
const isWin = require('./isWin');

module.exports = function getEntrys(globPath) {
    const files = glob.sync(globPath);
    let result = {};
    for (let file of files) {
        // const paths = file.split(isWin() ? '/' : '/');
        // result[paths[paths.length - 2]] = file;

        let path = file.replace('./client/pc/', '').replace('./client/mobile/', '');
        let paths = path.split('/');
        paths.pop();
        let entryName = paths.join('_');
        result[entryName] = file;
    }
    return result;
};
// getEntrys('./views/*/app.js');
