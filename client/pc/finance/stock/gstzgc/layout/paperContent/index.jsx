import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import PaperMenu from './paperMenu';
import PaperList from './paperList';
import Paper from './paperList/paper';
import Title from './paperList/title';
import More from './paperList/more';
import Chip from 'Chip';
import Recommend from '../../components/recommend';
import errorBoundary from '@ifeng/errorBoundary';

class PaperContent extends React.PureComponent {
    state = {
        current: 0,
    };

    /**
     * 切换栏目操作
     */
    handleTabsChange = num => {
        this.setState({ current: num });
    };

    render() {
        const { content } = this.props;
        const newPaperTitle = {
            tabName: content.paperMenu[0].tabName,
            index: 0,
        };

        const investInfoData = {
            tabName: content.paperMenu[1].tabName,
            paper: content.investInfo,
            index: 1,
            more: content.investMore,
        };

        const ssComponeyData = {
            tabName: content.paperMenu[2].tabName,
            paper: content.ssComponey,
            index: 2,
            more: content.ssComMore,
        };

        return (
            <div>
                <Chip id="10041" type="static" title="文章列表导航" content={content.paperMenu}>
                    <PaperMenu
                        content={content.paperMenu}
                        current={this.state.current}
                        handleTabsChange={this.handleTabsChange}
                    />
                </Chip>
                <div className={styles.mt20}>
                    <Title content={newPaperTitle} />
                    <Paper content={content.newPaper} />
                    <Chip id="10043" type="static" title="最新文章2" content={content.newPaperExtra}>
                        <Paper />
                    </Chip>
                    <Chip id="10053" type="static" title="更多最新文章" content={content.newPaperMore}>
                        <More />
                    </Chip>
                </div>
                <br />
                <Chip
                    id={content.id}
                    type="static"
                    title={content.name}
                    groupName="文章"
                    translate="jsonParse"
                    content={content.hardAd02.content}>
                    <Recommend />
                </Chip>
                <Chip id="10054" type="static" title="更多投资情报" content={investInfoData}>
                    <PaperList />
                </Chip>
                <br />

                <Chip
                    id={content.id}
                    type="static"
                    title={content.name}
                    groupName="文章"
                    translate="jsonParse"
                    content={content.hardAd03.content}>
                    <Recommend />
                </Chip>
                <Chip id="10055" type="static" title="更多上市公司" content={ssComponeyData}>
                    <PaperList />
                </Chip>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
PaperContent.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
PaperContent.defaultProps = {};

export default errorBoundary(PaperContent);
