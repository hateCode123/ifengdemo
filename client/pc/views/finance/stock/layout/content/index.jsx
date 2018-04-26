import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import LeftContent from './leftContent/';

class Content extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col}>
                <LeftContent content={content.leftContent} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Content.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Content.defaultProps = {};

export { Content };
export default Content;
