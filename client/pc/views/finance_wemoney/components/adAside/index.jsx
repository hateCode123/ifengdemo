import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Comment 组件
 */
class Comment extends React.Component {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return <div className={ styles.box } data-adhook={ content }>{ content }</div>;
    }
}

/**
 * 定义组件属性类型
 * */
Comment.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
Comment.defaultProps = {};

export { Comment };
export default Comment;
