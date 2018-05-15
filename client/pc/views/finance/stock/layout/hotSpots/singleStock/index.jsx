import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import MarketRadar from './marketRadar/';
import Track from './track/';
import FiveDays from './fiveDays/';

class SingleStock extends React.PureComponent {
    state = {
        current: 0,
    };

    handleMouseOver = index => {
        this.setState({ current: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current } = this.state;
        const { tabs, content } = this.props;

        let list = null;

        if (current === 0) {
            list = <MarketRadar content={content[0]} />;
        } else if (current === 1) {
            list = <Track content={content[1]} />;
        } else {
            list = <FiveDays type={current === 2 ? 0 : 1} content={content[2]} />;
        }

        return (
            <div className={styles.data_box}>
                <ul className={`${styles.tabs} clearfix`}>
                    {tabs.map((item, index) => (
                        <li
                            key={index}
                            className={current === index ? styles.current : ''}
                            onMouseEnter={() => this.handleMouseOver(index)}>
                            {item}
                        </li>
                    ))}
                </ul>
                {list}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
SingleStock.propTypes = {
    tabs: PropTypes.array,
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
SingleStock.defaultProps = {};

export { SingleStock };
export default SingleStock;
