import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Title from './title/';

class Headline extends React.PureComponent {
    state = {
        isOver: false,
        data: this.props.content,
    };

    /**
     * 鼠标移入移出操作
     */
    handleOver = () => {
        const { isOver } = this.state;

        this.setState({ isOver: !isOver });
    };

    /**
     * 切换头条新闻
     */
    handleChange = () => {
        const { data } = this.state;
        const result = data.slice(0, 9);
        const newData = data.concat(result).slice(9);

        this.setState({
            data: newData,
        });
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, isOver } = this.state;
        const { content } = this.props;

        return (
            <div className={styles.box} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <Title title={data[0]} text={data[1]} extra={data[2]} />
                <Title title={data[3]} text={data[4]} />
                <Title title={data[5]} text={data[6]} />
                <Title title={data[7]} text={data[8]} />
                <div
                    className={styles.hyh}
                    style={{ display: isOver && content.length > 9 ? 'block' : 'none' }}
                    onClick={this.handleChange}
                />
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
