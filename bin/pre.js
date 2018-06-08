const shell = require('shelljs');

shell.exec('cross-env NODE_ENV=pre_development node ./app.js | bunyan', { async: true }, (code, stdout, stderr) => {});

shell.exec(
    'cross-env NODE_ENV=pre_development webpack --config webpack.prod.config.js',
    { async: true },
    (code, stdout, stderr) => {},
);
