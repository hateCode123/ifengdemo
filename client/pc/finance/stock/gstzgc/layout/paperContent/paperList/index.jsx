import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Title from './title';
import Paper from './paper';
import More from './more';
import errorBoundary from '@ifeng/errorBoundary';
import Chip from 'Chip';

class PaperList extends React.PureComponent {
    /**
     * 渲染网页布局
     */
    render() {
        const { content } = this.props;

        const title = {
            tabName: content.tabName,
            index: content.index,
        };

        return (
            <div>
                <div className={styles.mt20}>
                    <Title content={title} />
                    <Paper content={content.paper} />
                    {title.index === 1 ? (
                        <Chip id="10054" type="static" title="更多投资情报" content={content.more}>
                            <More content={content.more} />
                        </Chip>
                    ) : (
                        ''
                    )}
                    {title.index === 2 ? (
                        <Chip id="10055" type="static" title="更多上市公司" content={content.more}>
                            <More content={content.more} />
                        </Chip>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
PaperList.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
PaperList.defaultProps = {};

export default errorBoundary(PaperList);
