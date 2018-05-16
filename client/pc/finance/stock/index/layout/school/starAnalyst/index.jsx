import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { rel } from '../../../../../../utils/rel';

class StarAnalyst extends React.PureComponent {
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
        const tableTabs = content[0][0].tabs;
        const data = content[current + 1];
        let flag = '';

        if (current === 0) {
            flag = 's';
        } else if (current === 1) {
            flag = 'm';
        } else if (current === 2) {
            flag = 'l';
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
                <div className={styles.data}>
                    <table>
                        <thead>
                            <Chip id="10093" type="static" title="明星分析师" groupName="高手学堂" content={tabs}>
                                <tr>
                                    <th width="50">{tableTabs[0]}</th>
                                    <th width="65">{tableTabs[1]}</th>
                                    <th width="70">{tableTabs[2]}</th>
                                    <th width="85">{tableTabs[3]}</th>
                                    <th width="60">{tableTabs[4]}</th>
                                    <th>{tableTabs[5]}</th>
                                    <th>{tableTabs[6]}</th>
                                </tr>
                            </Chip>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.rank}</td>
                                    <td>
                                        <a href={`//star.finance.ifeng.com/analyst/${item.indcode}`}>{item.ananame}</a>
                                    </td>
                                    <td className={styles.red}>{item[`${flag}_total`]}</td>
                                    <td className={styles.red}>{item[`${flag}_succ_num`]}</td>
                                    <td className={styles.red}>{item[`${flag}_avg_ana`]}</td>
                                    <td>
                                        {item.orgname ? (
                                            <a href={`//star.finance.ifeng.com/org/${item.orgcode}`}>{item.orgname}</a>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                    <td>
                                        {item.orgname ? (
                                            <a href={`//finance.ifeng.com/app/hq/stock/${item.code}`}>{item.name}</a>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StarAnalyst.propTypes = {
    tabs: PropTypes.array,
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
StarAnalyst.defaultProps = {};

export { StarAnalyst };
export default StarAnalyst;