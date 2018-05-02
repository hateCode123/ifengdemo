import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class StockPlate extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const getStyle = num => {
            if (num === 0) {
                return 'black';
            } else if (num > 0) {
                return 'red';
            } else {
                return 'green';
            }
        };

        return (
            <div className={styles.banner}>
                <ul className="clearfix">
                    {content.map((item, index) => (
                        <li key={index}>
                            <div className={styles.list}>
                                <p className={styles.title}>
                                    <a href={item.url} target="_blank" rel={rel} title={item.title}>
                                        {item.title}
                                    </a>
                                    <span className={styles[getStyle(item.percent)]}>{item.percent}%</span>
                                </p>
                                <p>
                                    <a href={item.fund} target="_blank" rel={rel} title={item.title}>
                                        资金流向
                                    </a>
                                    |
                                    <a href={item.quote} target="_blank" rel={rel} title={item.title}>
                                        研报
                                    </a>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StockPlate.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
StockPlate.defaultProps = {};

export { StockPlate };
export default StockPlate;
