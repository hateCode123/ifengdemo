import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class Industry extends React.PureComponent {
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
        const { tabs, data, max } = this.props;
        const datas = data[current];

        const diff = max - datas.data.length;

        for (let a = 0; a < diff; a++) {
            datas.data.push({});
        }

        return (
            <div className={styles.data_box}>
                <ul className={`${styles.tabs} clearfix`}>
                    {data.map((item, index) => (
                        <li
                            key={index}
                            className={current === index ? styles.current : ''}
                            onMouseEnter={() => this.handleMouseOver(index)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
                <div className={styles.data}>
                    <a href={datas.url} target="_blank" rel={rel}>
                        <img src={datas.src} />
                    </a>
                    <table>
                        <thead>
                            <tr>
                                <th width="100">{tabs[0]}</th>
                                <th width="95">{tabs[1]}</th>
                                <th width="60">{tabs[2]}</th>
                                <th>{tabs[3]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.data.map((item, index) => (
                                <tr key={index}>
                                    <td width="100">{item.name ? <a href={item.name.url}>{item.name.name}</a> : ''}</td>
                                    <td className={item.fouds > 0 ? styles.red : styles.green}>{item.fouds}</td>
                                    <td>
                                        {item.details ? (
                                            <a href={item.details} target="_blank" rel={rel}>
                                                查看
                                            </a>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                    <td>
                                        {item.comment ? (
                                            <a
                                                href={item.comment.url}
                                                target="_blank"
                                                rel={rel}
                                                title={item.comment.text}>
                                                {item.comment.text.length > 22
                                                    ? `${item.comment.text.slice(0, 22)}...`
                                                    : item.comment.text}
                                            </a>
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
Industry.propTypes = {
    tabs: PropTypes.array,
    data: PropTypes.array,
    max: PropTypes.number,
};

/**
 * 定义组件默认属性
 * */
Industry.defaultProps = {};

export { Industry };
export default Industry;
