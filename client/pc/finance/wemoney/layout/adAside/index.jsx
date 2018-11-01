import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import Recommend from '../../compontents/recommend';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 AdAside 组件
 */
class AdAside extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div>
                <Recommend content={content} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
AdAside.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
AdAside.defaultProps = {};

export default errorBoundary(AdAside);
