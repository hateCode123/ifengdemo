import React from 'react';
import styles from './index.css';
import { debounce } from '@ifeng/ui_base';
import errorBoundary from '@ifeng/errorBoundary';
import { getFinanceData } from '../../../../../services/api';

const cacheData = {};

class StockSearch extends React.PureComponent {
    state = {
        searchTxt: '代码/拼音/名称',
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

            this.setState({ data });
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

        if (val !== '') {
            this.debounceGetList(val);
            this.setState({
                searchTxt: val,
                isShow: true,
            });
        } else {
            this.setState({
                searchTxt: '',
                isShow: false,
            });
        }
    };

    handleKeydown = e => {
        try {
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
        } catch (e) {
            console.error(e);
        }
    };

    handleFocus = e => {
        const val = e.currentTarget.value;

        if (val === '代码/拼音/名称') {
            this.setState({ searchTxt: '' });
        } else if (val === '') {
            return;
        } else {
            this.setState({ isShow: true });
        }
    };

    handleBlur = e => {
        const val = e.currentTarget.value;

        setTimeout(() => {
            this.setState({
                searchTxt: val === '' ? '代码/拼音/名称' : val,
                isShow: false,
            });
        }, 150);
    };

    handeleQuoteSearch = () => {
        try {
            const { current, data } = this.state;

            if (data.length > 0) {
                const stock = data[current !== null ? current : 0];

                window.open(`//finance.ifeng.com/app/hq/${stock.t}/${stock.c}`);
            }
        } catch (e) {
            console.error(e);
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
        const { searchTxt, current, isShow, data } = this.state;
        const type = {
            stock: '股票',
            fund: '基金',
            hkstock: '港股',
            forex: '外汇',
            bond: '债券',
        };

        return (
            <div className={`${styles.search_box} clearfix`}>
                <div className={styles.text}>
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
                    <a className={styles.tip}>股票查询</a>
                    <input
                        id="searchInput"
                        value={searchTxt}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeydown}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                    <button type="button" className={styles.q_btn} onClick={this.handeleQuoteSearch} />
                </div>
                <div className={styles.btn}>
                    <a className={styles.search} onClick={this.handeleSearch} />
                </div>
            </div>
        );
    }
}

export default errorBoundary(StockSearch);
