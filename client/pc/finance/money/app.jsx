import 'core-js';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import Layout from './layout/';

/* eslint-disable no-undef */
ReactDOM.render(<Layout content={__jsonData__} />, document.getElementById('root'));
/* eslint-enable no-undef */
