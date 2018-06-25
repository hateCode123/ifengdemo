import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Tabs from './tabs';
import ContentList from './contentList';
import Ad from '../../../../../components/ad';

class Info extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        tabs: ['首页', '宏观', '股票', 'iMarket', '公司', 'WEMONEY'],
        current: 0,
        listNum: 5,
    };

    /**
     * 切换栏目操作
     */
    handleTabsChange = (num, tabsTop) => {
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
        const { tabs, current, listNum } = this.state;
        const { content } = this.props;
        const data = content.content[current];
        const contentList = [];

        if (data) {
            for (let i = 0; i < listNum; i++) {
                const index = current === 0 ? 3 : 4;
                const num = i < 6 ? index : 5;
                const len = i < 5 ? index : 5;

                contentList.push(
                    <div key={i}>
                        <ContentList content={data.slice(i * num, i * num + len)} />
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
