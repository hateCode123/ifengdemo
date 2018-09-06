import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class TitleR extends React.PureComponent {
    render() {
        const { content } = this.props;
        const { titleR, liveimg } = content;
        const Img = liveimg ? <img src={liveimg} /> : '';

        return (
            <div className={styles.titleR}>
                <span>{titleR}</span>
                {Img}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
TitleR.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
TitleR.defaultProps = {};

export default errorBoundary(TitleR);
