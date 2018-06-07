import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import List from './list';

class Headline extends React.PureComponent {
    state = {
        isOver: false,
        isShow: false,
        data: this.props.content,
    };

    createMarkup = () => {
        const { rights } = this.props;

        return { __html: rights };
    };

    /**
     * 鼠标移入移出操作
     */
    handleOver = () => {
        const { isOver } = this.state;
        const { content, limit } = this.props;
        const isShow = !isOver && content.length > limit;

        this.setState({
            isOver: !isOver,
            isShow,
        });
    };

    /**
     * 切换头条新闻
     */
    handleChange = () => {
        const { data } = this.state;
        const { limit } = this.props;
        const result = data.slice(0, limit);
        const newData = data.concat(result).slice(limit);

        this.setState({
            data: newData,
        });
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, isShow } = this.state;
        const { limit } = this.props;

        return (
            <div className={styles.box} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <div>
                    <Chip id="20003" type="recommend" title="头条新闻" groupName="正文" content={data}>
                        <List limit={limit} />
                    </Chip>
                    <Chip id="10018" type="static" title="财经客户权益" groupName="正文">
                        <div dangerouslySetInnerHTML={this.createMarkup()} />
                    </Chip>
                </div>
                <div className={`${styles.hyh} ${isShow ? styles.show : styles.hide}`} onClick={this.handleChange} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Headline.propTypes = {
    content: PropTypes.array,
    rights: PropTypes.string,
    limit: PropTypes.number,
};

/**
 * 定义组件默认属性
 * */
Headline.defaultProps = {};

export { Headline };
export default Headline;
