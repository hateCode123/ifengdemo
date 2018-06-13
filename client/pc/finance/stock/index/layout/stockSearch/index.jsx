import React from 'react';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';

class StockSearch extends React.PureComponent {
    state = {
        searchTxt: '代码/拼音/名称',
        current: null,
        isShow: false,
        data: [],
        type: 'all',
    };

    getList = async str => {
        try {
            const { type } = this.state;

            const data = await jsonp('//app.finance.ifeng.com/hq/suggest_v2.php', {
                data: {
                    t: type,
                    q: str,
                    cb: 'suggestCallback(suggest_json)',
                },
                jsonpCallback: 'suggestCallback',
            });

            this.setState({ data });
        } catch (e) {
            console.log(e);
        }
    };

    handleSelect = e => {
        const selectVal = e.currentTarget.value;

        this.setState({ type: selectVal });
    };

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
            this.getList(val);
            this.setState({
                searchTxt: val,
                isShow: true,
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
                        this.setState({ current: 9 });
                    } else {
                        num--;

                        this.setState({ current: num });
                    }

                    break;
                case 40:
                    if (current === null || current === 9) {
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

        if (val === '代码/拼音/名称') {
            this.setState({ searchTxt: '' });
        } else if (val) {
            this.getList(val);
            this.setState({ isShow: true });
        }
    };

    handleBlur = e => {
        const val = e.currentTarget.value;

        if (val === '') {
            this.setState({ searchTxt: '代码/拼音/名称' });
        }

        this.setState({ isShow: false });
    };

    handeleQuoteSearch = () => {
        const { current, data } = this.state;

        if (data.length > 0) {
            const stock = data[current !== null ? current : 0];

            window.open(`//finance.ifeng.com/app/hq/${stock.t}/${stock.c}`);
        }
    };

    handeleFundsSearch = () => {
        const { current, data } = this.state;

        if (data.length > 0) {
            const stock = data[current !== null ? current : 0];

            window.open(`//finance.ifeng.com/zjlx/${stock.c}`);
        }
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
                                            <td>{item.s}</td>
                                            <td>{item.n}</td>
                                            <td>{item.p}</td>
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
                    <select name="type" className={styles.select} onChange={this.handleSelect}>
                        <option value="all">全部</option>
                        <option value="fund">基金</option>
                        <option value="hkstock">港股</option>
                        <option value="forex">外汇</option>
                        <option value="bond">债券</option>
                    </select>
                    <button type="button" className={styles.q_btn} onClick={this.handeleQuoteSearch} />
                    <button type="button" className={styles.f_btn} onClick={this.handeleFundsSearch} />
                </div>
                <div className={styles.btn}>
                    <a className={styles.search} onClick={this.handeleSearch} />
                </div>
            </div>
        );
    }
}

export default StockSearch;
