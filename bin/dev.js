const shell = require('shelljs');

shell.exec('nodemon ./app.js | bunyan', { async: true }, (code, stdout, stderr) => {});

shell.exec(
    'webpack --watch',
    { async: true },
    (code, stdout, stderr) => {},
);
