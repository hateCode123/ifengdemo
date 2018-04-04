var shell = require('shelljs');

shell.exec('cross-env NODE_ENV=pre_development node ./app.js | bunyan',{async:true}, function(code, stdout, stderr) {

});

shell.exec(`webpack --config './webpack.prod.config' -p`,{async:true}, function(code, stdout, stderr) {

});