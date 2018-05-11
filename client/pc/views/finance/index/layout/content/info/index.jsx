import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Tabs from './tabs/';
import IndexContentList from './indexContentList/';
import ExtraContentList from './extraContentList/';
import Ad from '../../../../../../components/ad/';

class Info extends React.PureComponent {
    state = {
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
        const { current, listNum } = this.state;
        const { content } = this.props;
        const data = content.content[current];
        const contentList = [];

        if (data && current === 0) {
            for (let i = 0; i < listNum; i++) {
                const num = i < 6 ? 3 : 5;
                const len = i < 5 ? 3 : 5;

                contentList.push(
                    <div key={i}>
                        <IndexContentList content={data.slice(i * num, i * num + len)} />
                        {i < 5 ? <IndexContentList content={content.softAd} /> : ''}
                        {content.hardAd && i < 4 ? <Ad content={content.hardAd} styleName={styles.hardAd} /> : ''}
                    </div>,
                );
            }
        } else if (data && current !== 0) {
            for (let i = 0; i < listNum; i++) {
                const num = i < 6 ? 4 : 5;
                const len = i < 5 ? 4 : 5;

                contentList.push(
                    <div key={i}>
                        <ExtraContentList content={data.slice(i * num, i * num + len)} />
                        {content.hardAd && i < 4 ? <Ad content={content.hardAd} styleName={styles.hardAd} /> : ''}
                    </div>,
                );
            }
        }

        return (
            <div className={styles.info}>
                <Tabs content={content.tabs} current={current} handleTabsChange={this.handleTabsChange} />
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

/**
 * 定义组件属性类型
 * */
Info.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Info.defaultProps = {};

export { Info };
export default Info;
