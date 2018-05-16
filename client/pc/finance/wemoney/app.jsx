import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Layout from './layout/';

const render = function render() {
    ReactDOM.render(<Layout content={jsonData} />, document.getElementById('root'));
};

render();
