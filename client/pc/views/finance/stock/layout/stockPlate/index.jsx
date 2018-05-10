import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import BannerList from './bannerList/';

class StockPlate extends React.PureComponent {
    createStyle = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={this.createStyle()} />
                <BannerList content={this.props.stockPlate} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StockPlate.propTypes = {
    content: PropTypes.string,
    stockPlate: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
StockPlate.defaultProps = {};

export { StockPlate };
export default StockPlate;
