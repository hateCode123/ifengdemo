import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Layout from './layout/';

const render = function() {
    ReactDOM.render(<Layout content={__jsonData__} />, document.getElementById('root'));
};
render();
