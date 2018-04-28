import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import RightSideTitle from '../../../../components/rightSideTitle';

class DayStock extends React.PureComponent {
    /**
     * 插入 html
     */
    createMarkup = () => {
        return { __html: this.props.content.dayStock };
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.box}>
                <RightSideTitle content={content.dayStockTitle} />
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
DayStock.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
DayStock.defaultProps = {};

export { DayStock };
export default DayStock;
