var shell = require('shelljs');

shell.exec('nodemon ./app.js | bunyan',{async:true}, function(code, stdout, stderr) {

});

shell.exec('webpack --watch',{async:true}, function(code, stdout, stderr) {

});