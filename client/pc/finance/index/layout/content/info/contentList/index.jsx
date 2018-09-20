import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { Event } from '@ifeng/ui_base';
import errorBoundary from '@ifeng/errorBoundary';
import { LazyImg } from '@ifeng/ui_pc_lazyLoad';
import { rel } from '../../../../../../utils/rel';
import { handleAd } from '../../../../../../utils/utils';
import {
    getCommentCount,
    getCustomList,
    getMacroList,
    getStockList,
    getImarketsList,
    getCompanyList,
    getWemoneyList,
} from '../../../../../../services/api';

class ContentList extends React.PureComponent {
    static propTypes = {
        infoAd: PropTypes.object,
        index: PropTypes.number,
    };

    state = {
        isOver: false,
        len: 25,
        data: [],
        count: [],
    };

    event = new Event();

    insert = (insertArr, replaceArr) => {
        const { len, data, count } = this.state;

        const infoData = [...data];
        const infoCount = [...count];

        const refs = [];

        insertArr.forEach(item => {
            const ref = React.createRef();

            refs.push({ dom: item.dom, ref });

            infoData.splice(item.index, 0, { type: 'ad', ref });
            infoCount.splice(item.index, 0, null);
        });

        replaceArr.forEach(item => {
            const ref = React.createRef();

            refs.push({ dom: item.dom, ref });

            infoData.splice(item.index, 1, { type: 'ad', ref });
        });

        this.setState(
            {
                len: len + insertArr.length,
                data: infoData,
                count: infoCount,
            },
            () => {
                for (const ref of refs) {
                    if (ref.ref.current) {
                        ref.ref.current.appendChild(ref.dom);
                    }
                }
            },
        );
    };

    async componentDidMount() {
        try {
            const { infoAd } = this.props;
            const callback = await handleAd(infoAd);

            callback(infoAd.data, this.event, this.insert);
        } catch (e) {
            console.error(e);
        }

        try {
            const { len } = this.state;
            const { index } = this.props;

            let data = [];

            if (index === 0) {
                data = await getCustomList();
            } else if (index === 1) {
                data = await getMacroList();
            } else if (index === 2) {
                data = await getStockList();
            } else if (index === 3) {
                data = await getImarketsList();
            } else if (index === 4) {
                data = await getCompanyList();
            } else {
                data = await getWemoneyList();
            }

            if (data) {
                const docUrl = data.map(item => item.commentUrl);
                const counts = await getCommentCount(docUrl);
                const count = counts.map(item => item.count);

                this.setState(
                    {
                        data,
                        count,
                    },
                    () => {
                        this.event.trigger('init', { index, len });
                    },
                );
            }
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 获取更多新闻
     */
    getMore = () => {
        const { len } = this.state;
        const { index } = this.props;

        const length = len + 5;

        this.setState(
            {
                len: length,
            },
            () => {
                try {
                    this.event.trigger('loadMoreCmp', { index, len: length });
                } catch (e) {
                    console.error(e);
                }
            },
        );
    };

    /**
     * 渲染组件
     */
    render() {
        const { len, data, count } = this.state;

        /* eslint-disable no-confusing-arrow */
        return (
            <div>
                {data.length > 0
                    ? data.slice(0, len).map(
                          (item, index) =>
                              item.type === 'ad' ? (
                                  <div key={index} className={styles.list} ref={item.ref} />
                              ) : (
                                  <div key={index} className={styles.list}>
                                      {item.thumbnails && item.thumbnails !== '' ? (
                                          <a href={item.url} target="_blank" rel={rel} className={styles.imgBox}>
                                              <LazyImg
                                                  src={item.thumbnails}
                                                  width="144"
                                                  height="96"
                                                  className={styles.trans}
                                              />
                                          </a>
                                      ) : (
                                          ''
                                      )}
                                      <div className={styles.list_text}>
                                          <p className={styles.text}>
                                              <a href={item.url} target="_blank" rel={rel} title={item.title}>
                                                  {item.title}
                                              </a>
                                          </p>
                                          <p className={styles.time}>
                                              {item.source ? <span className={styles.source}>{item.source}</span> : ''}
                                              {item.newsTime && item.newsTime !== '' ? (
                                                  <span className={styles.date}>{item.newsTime}</span>
                                              ) : (
                                                  ''
                                              )}
                                          </p>
                                      </div>
                                      {item.commentUrl ? (
                                          <div className={styles.comment}>
                                              <a
                                                  href={`//gentie.ifeng.com/view.html?docUrl=${
                                                      item.commentUrl
                                                  }&docName=${item.title}&skey=${item.skey}&pcUrl&=${item.pcUrl}`}
                                                  target="_blank"
                                                  rel={rel}>
                                                  {count[index]}
                                              </a>
                                          </div>
                                      ) : (
                                          ''
                                      )}
                                  </div>
                              ),
                      )
                    : ''}
                {data.length > len ? (
                    <div className={styles.more} onClick={this.getMore}>
                        查看更多
                    </div>
                ) : (
                    <div className={styles.all}>已显示全部</div>
                )}
            </div>
        );
    }
}

export default errorBoundary(ContentList);
