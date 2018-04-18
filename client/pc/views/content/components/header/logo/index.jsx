import React from 'react';
import PropTypes from 'prop-types';

/**
 * 定义 Logo 组件
 */
class Logo extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        
        return (
            <a href={ content.url } target="_blank" rel="nofollow me noopener noreferrer">
                <img
                    src={ content.src } alt={ content.title } width={ content.width }
                    height={ content.height }
                />
            </a>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Logo.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Logo.defaultProps = {};

export { Logo };
export default Logo;
