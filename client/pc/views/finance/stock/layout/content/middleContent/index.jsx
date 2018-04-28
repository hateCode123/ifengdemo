import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';

class MiddleContent extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_M}>
                <div />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
MiddleContent.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
MiddleContent.defaultProps = {};

export { MiddleContent };
export default MiddleContent;
