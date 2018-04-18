import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Content 组件
 */
class Content extends React.PureComponent {
    /**
     *
     */
    createMarkup = () => {
        const { content } = this.props;

        return { __html: content };
    };

    /**
     * 渲染组件
     */
    render() {
        return <div className={styles.box} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

/**
 * 定义组件属性类型
 * */
Content.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
Content.defaultProps = {};

export { Content };
export default Content;
