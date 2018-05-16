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
                                    <a
                                        href={`//app.finance.ifeng.com/list/stock_cate.php?c=${item.code}`}
                                        target="_blank"
                                        rel={rel}
                                        title={item.name}>
                                        {item.name}
                                    </a>
                                    <span className={styles[getStyle(item.chgpct)]}>{item.chgpct}%</span>
                                </p>
                                <p>
                                    <a
                                        href={`//app.finance.ifeng.com/hq/trade/cate_zijin_fc.php?code=ind${item.code}`}
                                        target="_blank"
                                        rel={rel}
                                        title={item.title}>
                                        资金流向
                                    </a>
                                    |
                                    <a
                                        href={`//app.finance.ifeng.com/report/search.php?yb_search_type=title&titletxt=${
                                            item.yburl
                                        }`}
                                        target="_blank"
                                        rel={rel}
                                        title={item.title}>
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