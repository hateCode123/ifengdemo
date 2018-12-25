import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Pagination extends React.PureComponent {
    state = {
        current: 1,
        groupCount: 7,
        startCount: 1,
    };

    static propTypes = {
        total: PropTypes.number.isRequired,
        pageSize: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.string,
    };

    static defaultProps = {
        total: 0,
        pageSize: 20,
        type: 'normal',
    };

    componentDidMount() {}

    // 动态生成页码
    creatPage() {
        const { total, pageSize } = this.props;
        const { current, groupCount, startCount } = this.state;

        const totalPage = Math.ceil(total / pageSize);

        let pages = [];

        if (totalPage <= 10) {
            // 如果总页数小于
            pages.push(
                <li key={0} onClick={this.goPrev.bind(this)} className={current === 1 ? styles.nomore : ''}>
                    {'<<'}
                </li>,
            );
            for (let i = 1; i <= totalPage; i++) {
                pages.push(
                    <li key={i} onClick={this.go.bind(this, i)} className={current === i ? styles.active : ''}>
                        {i}
                    </li>,
                );
            }
            pages.push(
                <li
                    key={totalPage + 1}
                    onClick={this.goNext.bind(this, totalPage)}
                    className={current === totalPage ? styles.nomore : ''}>
                    {'>>'}
                </li>,
            );
        } else {
            pages.push(
                <li key={0} onClick={this.goPrev.bind(this)} className={current === 1 ? styles.nomore : ''}>
                    {'<<'}
                </li>,
            );
            const loopLength = totalPage - startCount > 9 ? groupCount + startCount - 1 : groupCount + startCount;

            for (let i = startCount; i <= loopLength; i++) {
                pages.push(
                    <li key={i} onClick={this.go.bind(this, i)} className={current === i ? styles.active : ''}>
                        {i}
                    </li>,
                );
            }
            // 分页中间的省略号
            if (totalPage - startCount > 9) {
                pages.push(
                    <li className={styles.ellipsis} key={-1}>
                        ···
                    </li>,
                );
            }
            // 倒数第一、第二页
            // if (current === totalPage - 1) {
            //     pages.push(null);
            // } else {
            pages.push(
                <li
                    className={current === totalPage - 1 ? styles.active : ''}
                    key={totalPage - 1}
                    onClick={this.go.bind(this, totalPage - 1, totalPage)}>
                    {totalPage - 1}
                </li>,
            );
            pages.push(
                <li
                    className={current === totalPage ? styles.active : ''}
                    key={totalPage}
                    onClick={this.go.bind(this, totalPage, totalPage)}>
                    {totalPage}
                </li>,
            );
            pages.push(
                <li
                    key={totalPage + 1}
                    onClick={this.goNext.bind(this, totalPage)}
                    className={current === totalPage ? styles.nomore : ''}>
                    {'>>'}
                </li>,
            );
        }

        // }

        return pages;
    }

    creatSimple() {
        const { total, pageSize } = this.props;
        const { current } = this.state;

        const totalPage = Math.ceil(total / pageSize);

        const pages = (
            <div className={styles.simple_wrap}>
                <div
                    className={`${current === 1 ? styles.nomore : ''} ${styles.fy_left}`}
                    onClick={this.goPrev_s.bind(this)}>
                    {'<<'}
                </div>
                <div className={styles.fy_col}>
                    <span className={styles.fy_cur}>{current}</span>
                    {'/'}
                    <span>{totalPage}</span>
                </div>
                <div
                    className={`${current === totalPage ? styles.nomore : ''} ${styles.fy_left}`}
                    onClick={this.goNext_s.bind(this, totalPage)}>
                    {'>>'}
                </div>
            </div>
        );

        return pages;
    }

    // 普通样式点击事件
    // 点击事件
    go(current, totalPage) {
        console.log('current=', current);
        let { startCount, groupCount } = this.state;
        const { onChange, pageSize } = this.props;

        if (
            current - startCount - groupCount === 0 &&
            startCount < totalPage - 9 &&
            current !== totalPage - 1 &&
            current !== totalPage
        ) {
            this.setState({
                startCount: startCount + 1,
            });
        }
        if (current < startCount && current >= 1 && current !== totalPage - 1 && current !== totalPage) {
            this.setState({
                startCount: startCount - 1,
            });
        }
        if (current === totalPage - 1 || current === totalPage) {
            this.setState({
                startCount: totalPage - 9,
            });
        }
        // console.log(startCount);
        this.setState({
            current,
        });

        onChange({ pageNumber: current, pageSize });
    }

    // 点击上一页
    goPrev() {
        let { current } = this.state;

        if (--current === 0) {
            return;
        }

        this.go(current);
    }
    // 点击下一页
    goNext(totalPage) {
        let { current } = this.state;

        if (++current > totalPage) {
            return;
        }

        this.go(current, totalPage);
    }

    // 简洁样式点击事件
    // 跳转事件
    go_s(current, totalPage) {
        const { onChange, pageSize } = this.props;

        this.setState({
            current,
        });
        onChange({ pageNumber: current, pageSize });
    }
    // 点击上一页事件
    goPrev_s() {
        let { current } = this.state;

        if (--current === 0) {
            return;
        }

        this.go_s(current);
    }

    // 点击下一页事件
    goNext_s(totalPage) {
        let { current } = this.state;

        if (++current > totalPage) {
            return;
        }

        this.go_s(current, totalPage);
    }

    render() {
        const Pages = this.creatPage();
        const Pages_s = this.creatSimple();

        const { type } = this.props;

        return (
            <React.Fragment>
                <div className={styles.main}>
                    {(() => {
                        if (type === 'normal') {
                            return <ul>{Pages}</ul>;
                        } else if (type === 'simple') {
                            return <div>{Pages_s}</div>;
                        }
                    })()}
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Pagination);
