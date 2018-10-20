import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import MainTop from './mainTop/';
import MainMiddle from './mainMiddle/';
import MainBottom from './mainBottom/';
import InIframe from './inIframe/';
import Ad from '../ad/';
import errorBoundary from '@ifeng/errorBoundary';
import { searchStockSuggest } from '../../../../services/api';

class Content extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            searchRes: [],
            suggestShow: true,
        };
    }

    handleSearch = async e => {
        const searchRes = await searchStockSuggest(e.target.value);

        if (Object.prototype.toString.call(searchRes) === '[object Object]') {
            const handleSearchRes = [];
            const mapStockType = { EQTY: '股票', INDEX: '指数', WRNT: '权证' };

            for (const item in searchRes) {
                if (mapStockType[searchRes[item].type]) {
                    handleSearchRes.push({
                        symbol: searchRes[item].symbol,
                        name: searchRes[item].name,
                        type: mapStockType[searchRes[item].type],
                        page_url: `//hk.finance.ifeng.com/stock.php?code=${item}`,
                    });
                }
            }

            this.setState({
                suggestShow: true,
                searchRes: handleSearchRes,
            });
        } else if (Object.prototype.toString.call(searchRes) === '[object Array]') {
            this.setState({
                suggestShow: false,
                searchRes,
            });
        }
    };

    clickSearch = async () => {
        const value = this.refs.searchInput.value;

        if (value) {
            const searchRes = await searchStockSuggest(value);

            if (Object.prototype.toString.call(searchRes) === '[object Object]') {
                const handleSearchRes = [];
                const mapStockType = { EQTY: '股票', INDEX: '指数', WRNT: '权证' };

                for (const item in searchRes) {
                    if (mapStockType[searchRes[item].type]) {
                        handleSearchRes.push({
                            symbol: searchRes[item].symbol,
                            name: searchRes[item].name,
                            type: mapStockType[searchRes[item].type],
                            page_url: `//hk.finance.ifeng.com/stock.php?code=${item}`,
                        });
                    }
                }

                this.setState({
                    suggestShow: true,
                    searchRes: handleSearchRes,
                });
            } else if (Object.prototype.toString.call(searchRes) === '[object Array]') {
                this.setState({
                    suggestShow: false,
                    searchRes,
                });
            }
        }
    };

    openStockDetail = pageUrl => {
        window.open(pageUrl);
    };

    renderSearchSuggestList = () => {
        const { searchRes } = this.state;
        const trList = searchRes.map((item, index) => (
            <tr
                key={index}
                onClick={() => {
                    this.openStockDetail(item.page_url);
                }}>
                <td>{item.symbol}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
            </tr>
        ));

        return searchRes.length > 0 ? (
            <div className={styles.search_suggest_list}>
                <table className={styles.tab}>
                    <tbody>{trList}</tbody>
                </table>
            </div>
        ) : null;
    };

    suggestListOpen = () => {
        this.setState({
            suggestShow: true,
            searchRes: [],
        });
    };

    suggestListOff = () => {
        this.setState({
            suggestShow: false,
            searchRes: [],
        });
    };

    render() {
        const {
            content: {
                mainTopData,
                mainMiddleData,
                mainBottomData,
                mainBody_ad: { ad_content_02, ad_content_04 },
                headBody_iframe: { top3Frame, tophktFrame },
            },
        } = this.props;

        const { suggestShow } = this.state;

        return (
            <div className={styles.main_box}>
                <div className={styles.searchBox}>
                    <div className={styles.sous01}>
                        <div className={styles.gup01}>港股查询</div>
                        <div className={styles.t_btn01} onClick={this.clickSearch}>
                            <div className={styles.text_bg01}>
                                <input
                                    ref="searchInput"
                                    type="text"
                                    className={styles.inputTxt}
                                    placeholder="代码/名称"
                                    onChange={this.handleSearch}
                                    onBlur={this.suggestListOff}
                                    onFocus={this.suggestListOpen}
                                />
                                {suggestShow ? this.renderSearchSuggestList() : null}
                            </div>
                        </div>
                    </div>
                    <div className={styles.top3I}>
                        <Chip
                            id={top3Frame.iframeId}
                            type="struct"
                            title="顶部三大指数iframe1"
                            groupName="iframe引用"
                            content={top3Frame.iframeObj}>
                            <InIframe />
                        </Chip>
                    </div>
                    <div className="clearfix" />
                </div>
                <Chip
                    id={tophktFrame.iframeId}
                    type="struct"
                    title="顶部港股通资金通栏iframe2"
                    groupName="iframe引用"
                    content={tophktFrame.iframeObj}>
                    <InIframe />
                </Chip>
                <MainTop content={mainTopData} />
                <Chip id="30011" type="struct" title="页面主体通栏广告02" groupName="广告" content={ad_content_02}>
                    <Ad />
                </Chip>
                <MainMiddle content={mainMiddleData} />
                <Chip id="30013" type="struct" title="页面主体通栏广告04" groupName="广告" content={ad_content_04}>
                    <Ad />
                </Chip>
                <MainBottom content={mainBottomData} />
            </div>
        );
    }
}

export default errorBoundary(Content);
