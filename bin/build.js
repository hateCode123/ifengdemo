const shell = require('shelljs');
 
shell.exec('cross-env NODE_ENV=production  webpack --config webpack.prod.config.js --env.name pc_low', { async: true }, (code, stdout, stderr) => {});
shell.exec('webpack --config webpack.prod.config.js  --env.name pc', { async: true }, (code, stdout, stderr) => {});
shell.exec('cross-env NODE_ENV=production  webpack --config webpack.prod.config.js --env.name pc_edit', { async: true }, (code, stdout, stderr) => {});
shell.exec('cross-env NODE_ENV=production  webpack --config webpack.prod.config.js --env.name mobile', { async: true }, (code, stdout, stderr) => {});
shell.exec('cross-env NODE_ENV=production  webpack --config webpack.prod.config.js --env.name mobile_edit', { async: true }, (code, stdout, stderr) => {}); 
