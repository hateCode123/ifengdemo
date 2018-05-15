import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Title from './title/';

class Headline extends React.PureComponent {
    state = {
        isOver: false,
        isShow: false,
        data: this.props.content,
    };

    /**
     * 鼠标移入移出操作
     */
    handleOver = () => {
        const { isOver } = this.state;
        const { content } = this.props;
        const isShow = !isOver && content.length > 8;

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
        const result = data.slice(0, 8);
        const newData = data.concat(result).slice(8);

        this.setState({
            data: newData,
        });
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, isShow } = this.state;

        return (
            <div className={styles.box} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <div>
                    <Title title={data[0]} text={data[1]} />
                    <Title title={data[2]} text={data[3]} />
                    <Title title={data[4]} text={data[5]} />
                    <Title title={data[6]} text={data[7]} />
                </div>
                <div className={`${styles.hyh} ${isShow ? styles.show : styles.hide}`} onClick={this.handleChange} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Headline.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Headline.defaultProps = {};

export { Headline };
export default Headline;
