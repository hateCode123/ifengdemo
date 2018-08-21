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
     * 渲染组件
     */
    render() {
        const { data } = this.state;

        return (
            <div className={styles.box} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <Title title={data[0]} text={data[1]} extra={data[2]} />
                <Title title={data[3]} text={data[4]} extra={data[5]} />
                <Title title={data[6]} text={data[7]} />
                <Title title={data[8]} text={data[9]} />
                <Title title={data[10]} text={data[11]} />
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
