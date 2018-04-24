import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';

const render = function() {
    ReactDOM.render(<div content={jsonData}/>, document.getElementById('root'));
};

render();