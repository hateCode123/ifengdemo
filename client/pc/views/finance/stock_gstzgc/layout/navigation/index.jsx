import React from 'react';
import PropTypes from 'prop-types';
import Nav from './nav';
import GlobalIndex from './globalIndex';

class Navigation extends React.PureComponent {
    /**
     * 渲染网页布局
     */
    render() {
        const { content } = this.props;

        return (
            <div>
                <GlobalIndex />
                <Nav content={content} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Navigation.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Navigation.defaultProps = {};

export default Navigation;
