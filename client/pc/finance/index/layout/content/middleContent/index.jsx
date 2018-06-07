import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ComicBook from './comicBook/';
import Caption from './caption/';
import TitleList from './titleList/';

class MiddleContent extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        console.log(content.financeList);

        return (
            <div className={styles.col_M}>
                <ComicBook content={content.comicBook} />
                <div className={styles.box}>
                    <div className={styles.box_inner}>
                        <div className={styles.talking}>
                            <Chip
                                id="10008"
                                type="static"
                                title="大咖说标题栏"
                                groupName="正文"
                                content={content.talking}>
                                <Caption />
                            </Chip>
                        </div>
                        <Chip
                            id="20005"
                            type="recommend"
                            title="大咖说新闻列表"
                            groupName="正文"
                            content={content.talkingList}>
                            <TitleList />
                        </Chip>
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
                            <Chip
                                id="10010"
                                type="static"
                                title="炒股大赛标题栏"
                                groupName="正文"
                                content={content.stocks}>
                                <Caption />
                            </Chip>
                        </div>
                        <Chip
                            id="20007"
                            type="recommend"
                            title="炒股大赛新闻列表"
                            groupName="正文"
                            content={content.stocksList}>
                            <TitleList />
                        </Chip>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
MiddleContent.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
MiddleContent.defaultProps = {};

export { MiddleContent };
export default MiddleContent;
