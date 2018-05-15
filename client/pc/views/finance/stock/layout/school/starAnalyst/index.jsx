import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
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
        const data = content[`data${current}`];

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
                            <tr>
                                <th width="50">{content.tabs[0]}</th>
                                <th width="65">{content.tabs[1]}</th>
                                <th width="70">{content.tabs[2]}</th>
                                <th width="85">{content.tabs[3]}</th>
                                <th width="60">{content.tabs[4]}</th>
                                <th>{content.tabs[5]}</th>
                                <th>{content.tabs[6]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name ? <a href={item.name.url} target="_blank" rel={rel}>{item.name.name}</a> : ''}</td>
                                    <td className={styles.red}>{item.recommend}</td>
                                    <td className={styles.red}>{item.success}</td>
                                    <td className={styles.red}>{item.income}%</td>
                                    <td>{item.belongs ? <a href={item.belongs.url}>{item.belongs.name}</a> : ''}</td>
                                    <td>{item.new ? <a href={item.new.url} target="_blank" rel={rel}>{item.new.name}</a> : ''}</td>
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
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
StarAnalyst.defaultProps = {};

export { StarAnalyst };
export default StarAnalyst;
