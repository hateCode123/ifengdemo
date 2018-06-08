import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import StockList from './stockList/';
import CustomStock from './customStock/';
import FundsFlow from './fundsFlow/';
import StockBox from './stockBox';
import StockSearch from './stockSearch/';
import Production from './production/';
import { rel } from '../../../../utils/rel';

class Stock extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        current: 0,
    };

    handleTabsChange = index => {
        this.setState({ current: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current } = this.state;
        const { content } = this.props;

        const getBox = () => {
            if (current === 0) {
                return <StockBox />;
            } else if (current === 1) {
                return <CustomStock />;
            } else if (current === 2) {
                return <FundsFlow />;
            }
        };

        return (
            <div className={styles.col_box}>
                <div className={styles.col_boxL}>
                    <div className={styles.box}>
                        <div className={styles.box_top}>
                            <StockList handleTabsChange={this.handleTabsChange} current={current} />
                            <div className={styles.search}>
                                <div className={styles.stockMarket}>
                                    <a href="//18.ifeng.com/" target="_blank" rel={rel}>
                                        理财超市
                                    </a>
                                </div>
                                <StockSearch />
                            </div>
                        </div>
                        <div className={styles.sub_box}>{getBox()}</div>
                    </div>
                </div>
                <Chip
                    id="10017"
                    type="static"
                    title="股票栏产品静态碎片"
                    groupName="股票栏"
                    content={content.production}>
                    <Production />
                </Chip>
            </div>
        );
    }
}

export default Stock;
