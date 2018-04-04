console.log(process.env.NODE_ENV, '---------------->');
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    var upload = require('f.lib.upload2');
} else {
    var upload = require('f.lib.upload');
}