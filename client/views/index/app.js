import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Loadable from 'react-loadable';

class Loading extends React.Component{
    render() {
        return <div>loading.......</div>
    }
}
const LazyMain = Loadable({
    loader: () => import('./main'),
    loading: Loading
});

const render = function() {
    ReactDOM.render(
        <LazyMain/>,
        document.getElementById('root'),
    );
};
render();
