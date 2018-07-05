import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
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
import Ad from '../../../../../components/ad';

class Info extends React.Component {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        tabs: ['首页', '宏观', '股票', 'iMarket', '公司', 'WEMONEY'],
        current: 0,
        listNum: 5,
        datas: [],
        counts: [],
    };

    async componentDidMount() {
        try {
            const { datas, counts } = this.state;
            const data = await getCustomList();

            if (data.data) {
                const docUrl = data.data.map(item => item.commentUrl);
                const count = await getCommentCount(docUrl);

                datas[0] = data.data;
                counts[0] = count.map(item => item.count);

                this.setState({
                    datas,
                    counts,
                });
            } else {
                datas[0] = [];
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
        if (!datas[num]) {
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
                    datas[num] = data.data.list;

                    this.setState({ datas });
                }
            } catch (e) {
                console.error(e);
            }
        }

        // 获取文章评论数
        if (!counts[num]) {
            try {
                const info = data.data ? data.data.list : [];
                const docUrl = info.map(item => item.commentUrl);
                const count = await getCommentCount(docUrl);

                counts[num] = count.map(item => item.count);

                this.setState({ counts });
            } catch (e) {
                console.error(e);
            }
        }

        this.setState({
            current: num,
            listNum: 5,
        });

        scrollTo(0, tabsTop);
    };

    /**
     * 获取更多新闻
     */
    getMore = () => {
        let { listNum } = this.state;

        listNum++;
        this.setState({ listNum });
    };

    /**
     * 渲染组件
     */
    render() {
        const { tabs, current, listNum, datas, counts } = this.state;
        const { content } = this.props;
        const contentList = [];

        if (datas) {
            for (let i = 0; i < listNum; i++) {
                const index = current === 0 ? 3 : 4;
                const num = i < 6 ? index : 5;
                const len = i < 5 ? index : 5;

                contentList.push(
                    <div key={i}>
                        <ContentList
                            content={datas[current] ? datas[current].slice(i * num, i * num + len) : []}
                            counts={counts[current]}
                        />
                        {current === 0 && i < 5 ? <ContentList content={content.softAd} /> : ''}
                        {content.hardAd && i < 4 ? <Ad content={content.hardAd} styleName={styles.hardAd} /> : ''}
                    </div>,
                );
            }
        }

        return (
            <div className={styles.info}>
                <Tabs content={tabs} current={current} handleTabsChange={this.handleTabsChange} />
                <div className={styles.content}>
                    <div className={styles.list}>
                        {contentList}
                        {listNum < 8 ? (
                            <div className={styles.more} onClick={this.getMore}>
                                查看更多
                            </div>
                        ) : (
                            <div className={styles.all}>已显示全部</div>
                        )}
                    </div>
                </div>
                <Ad content={content.hardAd} styleName={styles.hardAd} />
            </div>
        );
    }
}

export default Info;
