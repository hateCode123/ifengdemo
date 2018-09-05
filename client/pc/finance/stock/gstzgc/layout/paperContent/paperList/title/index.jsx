import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Title extends React.PureComponent {
    /**
     * 渲染网页布局
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.titleL}>
                <a name={`t${content.index + 1}`}>{content.tabName}</a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Title.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Title.defaultProps = {};

export default errorBoundary(Title);
