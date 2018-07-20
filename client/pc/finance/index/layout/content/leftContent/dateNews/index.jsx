import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';
import NewsList from './newsList/';
import ExtraNews from './extraNews/';
import { Ad } from '../../../../../../components/ad';

class DateNews extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        extraNews: PropTypes.string,
        ad: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, extraNews, ad } = this.props;

        return (
            <div className={styles.box}>
                <div className={styles.title}>
                    <Ad content={ad} />
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
                    <ExtraNews content={extraNews} />
                </Chip>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(DateNews));
