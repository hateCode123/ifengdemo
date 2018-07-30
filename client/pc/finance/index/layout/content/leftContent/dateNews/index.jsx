import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';
import NewsList from './newsList/';
import ExtraNews from './extraNews/';

class DateNews extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        extraNews: PropTypes.string,
        ad: PropTypes.object,
        extraNewsAd: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, extraNews, ad, extraNewsAd } = this.props;

        return (
            <div className={styles.box}>
                <div className={styles.title}>
                    <div className={styles.date} />
                    <Ad content={ad} styleName={styles.ad_box} />
                </div>
                <div className={styles.newList}>
                    <ul className={styles.list_top}>
                        <NewsList data={content.slice(0, 6)} />
                    </ul>
                    <ul className={styles.list_middle}>
                        <NewsList data={content.slice(6, 12)} />
                    </ul>
                </div>
                <Chip id="10011" type="static" title="今日要闻多拼静态碎片" groupName="正文" content={extraNews}>
                    <ExtraNews content={extraNews} extraNewsAd={extraNewsAd} />
                </Chip>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(DateNews));
