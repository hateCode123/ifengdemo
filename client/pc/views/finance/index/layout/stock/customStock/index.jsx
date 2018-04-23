import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class CustomStock extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const tabs = [
            { title: '股票名称', width: 68 },
            { title: '股价', width: 80 },
            { title: '涨跌幅', width: 82 },
            { title: '涨跌', width: 72 },
            { title: '研报', width: '' },
        ];

        return (
            <div className={styles.customStock_box}>
                <div className={styles.table}>
                    <table className={styles.tabs}>
                        <tbody>
                            <tr>
                                {tabs.map((item, index) => (
                                    <th
                                        key={index}
                                        className={styles.tab}
                                        width={item.width}
                                        style={{ textAlign: index === tabs.length - 1 ? ' center' : 'right' }}>
                                        {item.title}
                                    </th>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.btn}>
                    <div className={styles.login}>登录</div>
                    <div className={styles.tip}>登录后添加自选股</div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CustomStock.propTypes = {};

/**
 * 定义组件默认属性
 * */
CustomStock.defaultProps = {};

export { CustomStock };
export default CustomStock;
