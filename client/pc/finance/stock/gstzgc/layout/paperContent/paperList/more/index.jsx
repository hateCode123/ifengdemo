import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class More extends React.PureComponent {
    /**
     * 渲染网页布局
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.more}>
                <a href={content.seemoreUrl} target="_blank" rel={rel}>
                    查看更多
                </a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
More.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
More.defaultProps = {};

export default errorBoundary(More);
