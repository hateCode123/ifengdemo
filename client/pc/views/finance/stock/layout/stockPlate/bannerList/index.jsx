import React from 'react';
import PropTypes from 'prop-types';

class BannerList extends React.PureComponent {
    createHtml = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return (
            <div className="banner_cell">
                <ul className="clearfix" dangerouslySetInnerHTML={this.createHtml()} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
BannerList.propTypes = {
    content: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
BannerList.defaultProps = {};

export { BannerList };
export default BannerList;
