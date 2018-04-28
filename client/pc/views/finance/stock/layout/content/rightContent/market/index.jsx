import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import RightSideTitle from '../../../../components/rightSideTitle';

class Market extends React.PureComponent {
    /**
     * 插入 html
     */
    createMarkup = () => {
        return { __html: this.props.content.market };
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.box}>
                <RightSideTitle content={content.marketTitle} />
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Market.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Market.defaultProps = {};

export { Market };
export default Market;
