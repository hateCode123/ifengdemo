import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Title from './title';
import Paper from './paper';
import More from './more';

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
                    <More content={content.more} />
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

export default PaperList;
