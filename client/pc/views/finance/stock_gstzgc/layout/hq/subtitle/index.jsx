import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class HqSubtitle extends React.PureComponent {
    render() {
        const { content, nowTime } = this.props;
        const { url, title_02 } = content[0];

        return (
            <div className={styles.title_02}>
                <span>{nowTime}</span>
                <a href={url} target="_blank" title={title_02}>
                    {title_02}
                </a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HqSubtitle.propTypes = { content: PropTypes.array, nowTime: PropTypes.string };

/**
 * 定义组件默认属性
 * */
HqSubtitle.defaultProps = {};

export default HqSubtitle;
