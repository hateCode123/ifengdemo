import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Layout from './layout';
import './reset.css';

const render = function render() {
    ReactDOM.render(<Layout/>, document.getElementById('root'));
};

render();
