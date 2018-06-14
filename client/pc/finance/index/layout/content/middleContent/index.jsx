import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ComicBook from './comicBook/';
import Caption from './caption/';
import TitleList from './titleList/';
import { rel } from '../../../../../utils/rel';

class MiddleContent extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        let stockData = [];

        if (content.stocks) {
            stockData = content.stocks.list.map(item => ({
                id: item.id,
                url: item.commentUrl,
                title: item.title,
            }));
        }

        return (
            <div className={styles.col_M}>
                <ComicBook content={content.comicBook} />
                <div className={styles.box}>
                    <div className={styles.box_inner}>
                        <div className={styles.finance}>
                            <Chip
                                id="10009"
                                type="static"
                                title="财商教育标题栏"
                                groupName="正文"
                                content={content.finance}>
                                <Caption />
                            </Chip>
                        </div>
                        <Chip
                            id="10161"
                            type="static"
                            title="财商教育新闻列表"
                            groupName="正文"
                            content={content.financeList}>
                            <TitleList />
                        </Chip>
                        <div className={styles.stocks}>
                            <div className={styles.caption}>
                                <h5>
                                    <a href="//ds.ifeng.com/" target="_blank" rel={rel} title="炒股大赛">
                                        炒股大赛
                                    </a>
                                </h5>
                            </div>
                            <div className={styles.picTxt}>
                                <div className={styles.box_pic}>
                                    <a href="//ds.ifeng.com/" target="_blank" rel={rel} title="炒股大赛">
                                        <span />
                                    </a>
                                    <h5>
                                        <a href="//ds.ifeng.com/" target="_blank" rel={rel} title="炒股大赛">
                                            凤凰网炒股大赛
                                        </a>
                                    </h5>
                                </div>
                                <h3 className={styles.title}>
                                    <a href={stockData[0].url} target="_blank" rel={rel} title={stockData[0].title}>
                                        {stockData[0].title}
                                    </a>
                                </h3>
                            </div>
                        </div>
                        <TitleList content={stockData.slice(1, 6)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MiddleContent;
