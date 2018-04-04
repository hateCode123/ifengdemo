import React from 'react';
import styles from './index.css';
class Comp extends React.Component {
    state = {
        index: 0,
        pageSize: 10,
        isFixed: false,
    };
    switch = () => {
        const { content } = this.props;
        const { index, pageSize } = this.state;
        if ((index + 1) * pageSize >= content.length) {
            this.setState({
                index: 0,
            });
        } else {
            this.setState({
                index: index + 1,
            });
        }
    };
    handleScroll = () => {
        const winHeight = document.body.clientHeight;
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        const { isFixed } = this.state;
        if (scrollTop > 223 && scrollTop <= winHeight - 300) {
            if (!isFixed) {
                this.setState({
                    isFixed: true,
                });
            }
        } else {
            if (isFixed) {
                this.setState({
                    isFixed: false,
                });
            }
        }
    };
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
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

export default Comp;
