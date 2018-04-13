import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Hot 组件
 */
class Hot extends React.PureComponent {
    /**
     * 绑定属性
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            pageSize: 10,
            isFixed: false,
        };
        this.switch = this.switch.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    /**
     *
     */
    switch() {
        const { content } = this.props;
        const { index, pageSize } = this.state;

        if ((index + 1) * pageSize >= content.length) {
            this.setState({ index: 0 });
        } else {
            this.setState({ index: index + 1 });
        }
    }

    /**
     *
     */
    handleScroll() {
        const winHeight = document.body.clientHeight;
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        const { isFixed } = this.state;

        if (scrollTop > 223 && scrollTop <= winHeight - 300) {
            if (!isFixed) {
                this.setState({ isFixed: true });
            }
        } else if (isFixed) {
            this.setState({ isFixed: false });
        }
    }

    /**
     *
     */
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    }

    /**
     *
     */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { index, pageSize, isFixed } = this.state;
        const list = content.slice(index * pageSize, (index + 1) * pageSize).map((item, index) => (
            <div key={index}>
                <a href={item.url} target="_blank">
                    {item.title}
                </a>
            </div>
        ));

        return (
            <div className={isFixed ? styles.boxFixed : styles.box}>
                <div className={styles.title}>
                    热门文章
                    <span className={styles.switch} onClick={this.switch}>
                        换一换
                    </span>
                </div>
                <div className={styles.list}>{list}</div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Hot.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Hot.defaultProps = {};

export { Hot };
export default Hot;
