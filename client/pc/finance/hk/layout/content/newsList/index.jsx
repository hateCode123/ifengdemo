import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import HeadLine from './headLine/';
import NewsLine from './newsLine/';
import PureList from './pureList/';
import errorBoundary from '@ifeng/errorBoundary';
import InIframe from '../inIframe/';
import { rel } from '../../../../../utils/rel';
import { formatImage, formatUrl } from '@ifeng/public_method';

/**
 * @param {String} mode NewsList表现形式
 *
 */
class NewsList extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
        mode: PropTypes.string,
    };

    renderPicWordList = listData => {
        const { recommend_list } = listData;

        if (recommend_list) {
            const { recommendId, recommendName, recommendData } = recommend_list;

            const { widthoutR_list } = listData;

            return (
                <div>
                    <Chip
                        id={recommendId}
                        type="recommend"
                        title={recommendName}
                        groupName="信息流头部推荐位"
                        translate="getTop3"
                        content={recommendData}>
                        <PureList />
                    </Chip>
                    {widthoutR_list.map((item, index) => <NewsLine content={item} key={index} />)}
                </div>
            );
        }

        return listData.map((item, index) => <NewsLine content={item} key={index} />);
    };

    renderSinglePicList = listData => {
        const singlePicDom = [];
        const pureLi = [];

        listData.forEach((item, index) => {
            if (index === 0) {
                if (item.thumbnail) {
                    singlePicDom.push(
                        <div key={index}>
                            <div className={styles.pic01}>
                                <a href={formatUrl(item.url)} target="_blank" rel={rel} title={item.title}>
                                    <img src={formatImage(item.thumbnail)} />
                                </a>
                            </div>
                            <h4>
                                <a href={formatUrl(item.url)} target="_blank" rel={rel} title={item.title}>
                                    {item.title}
                                </a>
                            </h4>
                        </div>,
                    );
                } else {
                    pureLi.push(
                        <li key={index}>
                            <a href={formatUrl(item.url)} target="_blank" rel={rel} title={item.title}>
                                {item.title}
                            </a>
                        </li>,
                    );
                }
            } else {
                pureLi.push(
                    <li key={index}>
                        <a href={formatUrl(item.url)} target="_blank" rel={rel} title={item.title}>
                            {item.title}
                        </a>
                    </li>,
                );
            }
        });

        return (
            <div className={styles.col_L_tex}>
                {singlePicDom}
                <ul>{pureLi}</ul>
            </div>
        );
    };

    renderPureList = listData => {
        return (
            <div className={`${styles.col_L_tex} ${styles.col_R_tex}`}>
                <ul>
                    {listData.map((item, index) => (
                        <li key={index}>
                            <a href={formatUrl(item.url)} target="_blank" rel={rel} title={item.title}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    renderIframeDom = listData => {
        const { iframeFragmentId, iframeName, iframeSet } = listData;

        return (
            <div className={styles.iframeList}>
                <Chip id={iframeFragmentId} type="struct" title={iframeName} groupName="iframe引用" content={iframeSet}>
                    <InIframe />
                </Chip>
            </div>
        );
    };

    renderNewsList = listData => {
        const { mode } = this.props;

        switch (mode) {
            case 'eachPic':
                return this.renderPicWordList(listData);
            case 'singlePic':
                return this.renderSinglePicList(listData);
            case 'pureList':
                return this.renderPureList(listData);
            case 'inIframe':
                return this.renderIframeDom(listData);
        }
    };

    render() {
        const {
            content: { titleData, listData },
        } = this.props;

        return (
            <div className={styles.newsList}>
                {titleData ? <HeadLine content={titleData} /> : null}
                {this.renderNewsList(listData)}
            </div>
        );
    }
}

export default errorBoundary(NewsList);
