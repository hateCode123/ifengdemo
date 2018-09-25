import React from 'react';
import styles from './index.css';
import { debounce } from '@ifeng/ui_base';
import errorBoundary from '@ifeng/errorBoundary';
import { getFinanceData } from '../../../../../services/api';
import ResultList from './resultList';

const cacheData = {};

class StockSearch extends React.PureComponent {
    state = {
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

    handleMouseOver = index => {
        this.setState({ current: index });
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

    /**
     * 渲染组件
     */
    render() {
        const { searchTxt, current, isShow, data } = this.state;

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
                        <ResultList
                            data={data}
                            searchTxt={searchTxt}
                            current={current}
                            handleMouseOver={this.handleMouseOver}
                        />
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
