import React from 'react';
import styles from './index.css';
import { debounce } from '@ifeng/ui_base';
import errorBoundary from '@ifeng/errorBoundary';
import { getFinanceData } from '../../../../../services/api';

const cacheData = {};

class StockSearch extends React.PureComponent {
    state = {
        type: {
            stock: '股票',
            fund: '基金',
            hkstock: '港股',
            usstock: '美股',
            forex: '外汇',
            bond: '债券',
        },
        searchTxt: '代码/拼音',
        current: null,
        isShow: false,
        data: [],
    };

    getList = async str => {
        try {
            let data = [];

            if (cacheData[str]) {
                data = cacheData[str];
            } else {
                data = await getFinanceData('all', str);

                cacheData[str] = data;
            }

            this.setState({
                data,
                isShow: true,
            });
        } catch (e) {
            console.error(e);
        }
    };

    debounceGetList = debounce(this.getList);

    handleMouseOver = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ current: index });
    };

    handleClick = () => {
        const { current, data } = this.state;

        window.open(
            `//finance.ifeng.com/app/hq/${data[current !== null ? current : 0].t}/${
                data[current !== null ? current : 0].c
            }`,
        );
    };

    handleChange = e => {
        const val = e.currentTarget.value;

        this.setState({ searchTxt: val });

        if (val !== '') {
            this.debounceGetList(val);
        } else {
            this.setState({
                data: [],
                isShow: false,
            });
        }
    };

    handleKeydown = e => {
        const { current, data } = this.state;
        let num = current;

        if (data.length > 0) {
            switch (e.keyCode) {
                case 38:
                    if (current === null) {
                        this.setState({ current: 0 });
                    } else if (current === 0) {
                        this.setState({ current: data.length - 1 });
                    } else {
                        num--;

                        this.setState({ current: num });
                    }

                    break;
                case 40:
                    if (current === null || current === data.length - 1) {
                        this.setState({ current: 0 });
                    } else {
                        num++;

                        this.setState({ current: num });
                    }

                    break;
                case 13:
                    window.open(
                        `//finance.ifeng.com/app/hq/${data[current !== null ? current : 0].t}/${
                            data[current !== null ? current : 0].c
                        }`,
                    );

                    break;
            }
        }
    };

    handleFocus = e => {
        const val = e.currentTarget.value;

        this.setState({
            searchTxt: val === '代码/拼音' ? '' : val,
            isShow: true,
        });
    };

    handleBlur = e => {
        const val = e.currentTarget.value;

        setTimeout(() => {
            this.setState({
                searchTxt: val === '' ? '代码/拼音' : val,
                isShow: false,
            });
        }, 150);
    };

    handeleSearch = () => {
        const { current, data } = this.state;

        if (data.length > 0) {
            const stock = data[current !== null ? current : 0];

            window.open(`//finance.ifeng.com/app/hq/${stock.t}/${stock.c}`);
        }
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
        const { type, current, searchTxt, isShow, data } = this.state;

        return (
            <div className={`${styles.search_box} clearfix`}>
                <div className={styles.text}>
                    <input
                        value={searchTxt}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeydown}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                    {isShow && data.length > 0 ? (
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
                                            <td>
                                                {this.handleMarkKeyword(item.s.toUpperCase(), searchTxt.toUpperCase())}
                                            </td>
                                            <td>{this.handleMarkKeyword(item.n, searchTxt)}</td>
                                            <td>
                                                {this.handleMarkKeyword(item.p.toUpperCase(), searchTxt.toUpperCase())}
                                            </td>
                                            <td>{type[item.t]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className={styles.btn}>
                    <a className={styles.search} onClick={this.handeleSearch} />
                </div>
            </div>
        );
    }
}

export default errorBoundary(StockSearch);
