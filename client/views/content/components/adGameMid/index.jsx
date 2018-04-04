import React from 'react';
import styles from './index.css';
import {loadScript} from '@ifeng/ui_base';

class AdGameMid extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        if (this.props.content.preload) {
            console.log('load preload');
            await loadScript(this.props.content.preload);
        }
        // const callbackFn = new Function('elm', this.props.content.callback);
        const callbackFn = eval(`(${this.props.content.callback})`);
        console.log('elm', callbackFn);
        callbackFn(this.container);
        console.log(this.container);
    }
    render() {
        return <div className={styles.box} data-content={this.props.content.data} ref={n=> this.container = n}></div>;
    }
}

export default AdGameMid;