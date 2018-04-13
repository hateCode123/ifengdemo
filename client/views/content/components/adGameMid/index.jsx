import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { loadScript } from '@ifeng/ui_base';

/**
 * 定义 AdGameMid 组件
 */
class AdGameMid extends React.PureComponent {
    /**
     *
     */
    async componentDidMount() {
        const { content } = this.props;

        if (content.preload) {
            console.log('load preload');
            await loadScript(content.preload);
        }

        // const callbackFn = new Function('elm', this.props.content.callback);
        /* eslint-disable no-eval */
        const callbackFn = eval(`( ${content.callback})`);

        console.log('elm', callbackFn);

        callbackFn(this.container);

        console.log(this.container);
    }

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return <div className={styles.box} data-content={content.data} ref={n => (this.container = n)} />;
    }
}

/**
 * 定义组件属性类型
 * */
AdGameMid.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
AdGameMid.defaultProps = {};

export { AdGameMid };
export default AdGameMid;
