import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '@ifeng/errorBoundary';
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
import TabPane from './tabPane';
import ContentList from './contentList';

class Info extends React.Component {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        tabs: ['首页', '宏观', '股票', 'iMarket', '公司', 'WEMONEY'],
        current: 0,
        counts: [],
        adAddType: 'init',
    };

    /**
     * 渲染组件
     */
    render() {
        const { tabs, current, datas, counts, adAddType } = this.state;
        const { content } = this.props;

        // return (
        //     <div className={styles.info}>
        //         <Tabs content={tabs} current={current} handleTabsChange={this.handleTabsChange} />
        //         <div className={styles.content}>
        //             {Object.values(datas).map((item, index) => (
        //                 <div key={index} className={`${current === index ? styles.show : styles.hide}`}>
        //                     <ContentList
        //                         content={item.data ? item.data.slice(0, infoCount + getMoreCount * item.listNum) : []}
        //                         counts={counts[index]}
        //                         infoAd={content.infoAd}
        //                         adAddType={adAddType}
        //                         tabIndex={current}
        //                         pageSize={item.listNum}
        //                         index={index}
        //                     />
        //                     {item.listNum < 3 ? (
        //                         <div className={styles.more} onClick={this.getMore}>
        //                             查看更多
        //                         </div>
        //                     ) : (
        //                         <div className={styles.all}>已显示全部</div>
        //                     )}
        //                 </div>
        //             ))}
        //         </div>
        //         <Ad content={content.hardAd} styleName={styles.hardAd} />
        //     </div>
        // );

        return (
            <div className={styles.info}>
                <Tabs>
                    <TabPane tab={tabs[0]}>
                        <ContentList index={0} infoAd={content.infoAd} />
                    </TabPane>
                    <TabPane tab={tabs[1]}>
                        <ContentList index={1} infoAd={content.infoAd} />
                    </TabPane>
                    <TabPane tab={tabs[2]}>
                        <ContentList index={2} infoAd={content.infoAd} />
                    </TabPane>
                    <TabPane tab={tabs[3]}>
                        <ContentList index={3} infoAd={content.infoAd} />
                    </TabPane>
                    <TabPane tab={tabs[4]}>
                        <ContentList index={4} infoAd={content.infoAd} />
                    </TabPane>
                    <TabPane tab={tabs[5]}>
                        <ContentList index={5} infoAd={content.infoAd} />
                    </TabPane>
                </Tabs>
                <Ad content={content.hardAd} styleName={styles.hardAd} />
            </div>
        );
    }
}

export default errorBoundary(Info);
