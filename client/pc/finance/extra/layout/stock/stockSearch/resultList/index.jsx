import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class ResultList extends React.PureComponent {
    static propTypes = {
        current: PropTypes.number,
        data: PropTypes.array,
        searchTxt: PropTypes.string,
        handleMouseOver: PropTypes.func,
    };

    handleClick = () => {
        const { current } = this.state;
        const { data } = this.props;

        window.open(
            `//finance.ifeng.com/app/hq/${data[current !== null ? current : 0].t}/${
                data[current !== null ? current : 0].c
            }`,
        );
    };

    handleMouseOver = e => {
        const { handleMouseOver } = this.props;
        const index = Number(e.currentTarget.attributes['data-index'].value);

        handleMouseOver(index);
    };

    handleMarkKeyword = (str, keyword) => {
        if (str.includes(keyword)) {
            const arr = str.split(keyword);

            return (
                <React.Fragment>
                    <span>{arr[0]}</span>
                    <span className={styles.red}>{keyword}</span>
                    <span>{arr[1]}</span>
                </React.Fragment>
            );
        }

        return str;
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, searchTxt, current } = this.props;

        const type = {
            stock: '股票',
            fund: '基金',
            hkstock: '港股',
            usstock: '美股',
            forex: '外汇',
            bond: '债券',
        };

        return (
            <div className={styles.stockList}>
                <table>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                data-index={index}
                                className={current === index ? styles.current : ''}
                                onMouseEnter={this.handleMouseOver}
                                onClick={this.handleClick}>
                                <td>{this.handleMarkKeyword(item.s.toUpperCase(), searchTxt.toUpperCase())}</td>
                                <td>{this.handleMarkKeyword(item.n, searchTxt)}</td>
                                <td>{this.handleMarkKeyword(item.p.toUpperCase(), searchTxt.toUpperCase())}</td>
                                <td>{type[item.t]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default errorBoundary(ResultList);
