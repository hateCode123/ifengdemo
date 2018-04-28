import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';

class StockSearch extends React.PureComponent {
    state = {
        current: null,
        isShow: false,
        data: [],
    };

    getList = str => {
        jsonp('http://app.finance.ifeng.com/hq/suggest_v2.php', {
            data: {
                t: 'all',
                q: str,
                cb: 'suggestCallback(suggest_json)',
            },
            jsonpCallback: 'suggestCallback',
        }).then(data => {
            this.setState({ data });
        });
    };

    handleMouseOver = index => {
        this.setState({ current: index });
    };

    handleClick = () => {
        const { current, data } = this.state;

        window.open(
            `http://finance.ifeng.com/app/hq/${data[current !== null ? current : 0].t}/${
                data[current !== null ? current : 0].c
            }`,
        );
    };

    handleKeyup = e => {
        const val = e.target.value;

        this.getList(val);
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
                        `http://finance.ifeng.com/app/hq/${data[current !== null ? current : 0].t}/${
                            data[current !== null ? current : 0].c
                        }`,
                    );

                    break;
            }
        }
    };

    handleFocus = () => {
        this.setState({ isShow: true });
    };

    handleBlur = () => {
        setTimeout(() => {
            this.setState({ isShow: false });
        }, 150);
    };

    handeleSearch = () => {
        const { current, data } = this.state;

        if (data.length > 0) {
            const stock = data[current !== null ? current : 0];

            window.open(`http://finance.ifeng.com/app/hq/${stock.t}/${stock.c}`);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { current, isShow, data } = this.state;
        const type = {
            stock: '股票',
            fund: '基金',
            hkstock: '港股',
            usstock: '美股',
            forex: '外汇',
            bond: '债券',
        };

        return (
            <div className={`${styles.search_box} clearfix`}>
                <div className={styles.text}>
                    <input
                        id="searchInput"
                        placeholder="代码/拼音"
                        onKeyUp={this.handleKeyup}
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
                                            className={current === index ? styles.current : ''}
                                            onMouseEnter={() => this.handleMouseOver(index)}
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
                </div>
                <div className={styles.btn}>
                    <a className={styles.search} onClick={this.handeleSearch} />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
StockSearch.propTypes = {};

/**
 * 定义组件默认属性
 * */
StockSearch.defaultProps = {};

export { StockSearch };
export default StockSearch;
