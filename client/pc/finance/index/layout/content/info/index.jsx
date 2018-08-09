import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Ad from '@ifeng/ui_pc_ad';
import {
    getCommentCount,
    getCustomList,
    getMacroList,
    getStockList,
    getImarketsList,
    getCompanyList,
    getWemoneyList,
} from '../../../../../services/api';
import Tabs from './tabs';
import ContentList from './contentList';

// 定义初始化加载数量
const infoCount = 25;

// 定义每次加载更多的数据数量
const getMoreCount = 5;

const arr = {};

for (let i = 0; i < 6; i++) {
    arr[i] = {
        data: [],
        listNum: 0,
    };
}

class Info extends React.Component {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        tabs: ['首页', '宏观', '股票', 'iMarket', '公司', 'WEMONEY'],
        current: 0,
        datas: arr,
        counts: [],
        adAddType: 'init',
    };

    async componentDidMount() {
        try {
            const { datas, counts } = this.state;
            const data = await getCustomList();

            if (data.data) {
                const info = data.data ? data.data : [];
                const docUrl = info.map(item => item.commentUrl);
                const count = await getCommentCount(docUrl);

                datas[0].data = data.data;
                counts[0] = count.map(item => item.count);

                this.setState({
                    datas,
                    counts,
                });
            } else {
                datas[0].data = [];
            }
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 切换栏目操作
     */
    handleTabsChange = async (num, tabsTop) => {
        const { datas, counts } = this.state;
        let data = [];

        // 获取信息流数据
        if (num !== 0 && datas[num].data.length === 0) {
            try {
                if (num === 1) {
                    data = await getMacroList();
                } else if (num === 2) {
                    data = await getStockList();
                } else if (num === 3) {
                    data = await getImarketsList();
                } else if (num === 4) {
                    data = await getCompanyList();
                } else {
                    data = await getWemoneyList();
                }

                if (data.data) {
                    datas[num].data = data.data.data;
                }
            } catch (e) {
                console.error(e);
            }
        }

        // 获取文章评论数
        if (num !== 0 && !counts[num]) {
            try {
                const info = data.data ? data.data.data : [];
                const docUrl = info.map(item => item.commentUrl);
                const count = await getCommentCount(docUrl);

                counts[num] = count.map(item => item.count);
            } catch (e) {
                console.error(e);
            }
        }

        this.setState({
            datas,
            counts,
            adAddType: 'tabChange',
            current: num,
        });

        scrollTo(0, tabsTop);
    };

    /**
     * 获取更多新闻
     */
    getMore = () => {
        const { datas, current } = this.state;
        let listNum = datas[current].listNum ? datas[current].listNum : 0;

        listNum++;
        datas[current].listNum = listNum;
        this.setState({
            datas,
            adAddType: 'loadMoreCmp',
        });
    };

    /**
     * 渲染组件
     */
    render() {
        const { tabs, current, datas, counts, adAddType } = this.state;
        const { content } = this.props;

        return (
            <div className={styles.info}>
                <Tabs content={tabs} current={current} handleTabsChange={this.handleTabsChange} />
                <div className={styles.content}>
                    {Object.values(datas).map((item, index) => (
                        <div key={index} className={`${current === index ? styles.show : styles.hide}`}>
                            <ContentList
                                content={item.data ? item.data.slice(0, infoCount + getMoreCount * item.listNum) : []}
                                counts={counts[index]}
                                infoAd={content.infoAd}
                                adAddType={adAddType}
                                tabIndex={current}
                                pageSize={item.listNum}
                                index={index}
                            />
                            {item.listNum < 3 ? (
                                <div className={styles.more} onClick={this.getMore}>
                                    查看更多
                                </div>
                            ) : (
                                <div className={styles.all}>已显示全部</div>
                            )}
                        </div>
                    ))}
                </div>
                <Ad content={content.hardAd} styleName={styles.hardAd} />
            </div>
        );
    }
}

export default Info;
