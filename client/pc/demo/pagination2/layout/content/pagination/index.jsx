import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Pagination extends React.PureComponent {
    state = {
        current: 1,
        startCount: 3,
        acceptGo: true,
    };

    static propTypes = {
        total: PropTypes.number.isRequired,
        pageSize: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.string,
        showQuickJumper: PropTypes.bool,
    };

    static defaultProps = {
        total: 0,
        pageSize: 20,
        type: 'normal',
        showQuickJumper: false,
    };

    // 动态生成页码
    creatPage() {
        const { total, pageSize } = this.props;
        const { current, startCount } = this.state;

        const totalPage = Math.ceil(total / pageSize);

        let pages = [];

        if (totalPage <= 9) {
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
            pages.push(
                <li className={current === 1 ? styles.active : ''} key={1} onClick={this.go.bind(this, 1, totalPage)}>
                    {1}
                </li>,
            );
            if (current > 5) {
                pages.push(
                    <li className={styles.ellipsis} key={-1}>
                        ···
                    </li>,
                );
            } else {
                pages.push(
                    <li
                        key={2}
                        onClick={this.go.bind(this, 2, totalPage)}
                        className={current === 2 ? styles.active : ''}>
                        {2}
                    </li>,
                );
            }
            if (current < 6) {
                for (let i = startCount; i <= startCount + 4; i++) {
                    pages.push(
                        <li key={i} onClick={this.go.bind(this, i)} className={current === i ? styles.active : ''}>
                            {i}
                        </li>,
                    );
                }
            } else if (current > totalPage - 5) {
                for (let i = totalPage - 6; i <= totalPage - 2; i++) {
                    pages.push(
                        <li key={i} onClick={this.go.bind(this, i)} className={current === i ? styles.active : ''}>
                            {i}
                        </li>,
                    );
                }
            } else {
                for (let i = current - 2; i <= current + 2; i++) {
                    pages.push(
                        <li key={i} onClick={this.go.bind(this, i)} className={current === i ? styles.active : ''}>
                            {i}
                        </li>,
                    );
                }
            }

            // 分页中间的省略号
            if (totalPage > 9 && current < totalPage - 4) {
                pages.push(
                    <li className={styles.ellipsis} key={-2}>
                        ···
                    </li>,
                );
            } else {
                pages.push(
                    <li
                        className={current === totalPage - 1 ? styles.active : ''}
                        key={2}
                        onClick={this.go.bind(this, totalPage - 1, totalPage)}>
                        {totalPage - 1}
                    </li>,
                );
            }
            // 倒数第一、第二页
            // if (current === totalPage - 1) {
            //     pages.push(null);
            // } else {
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

    // 跳页事件
    goTarget(type, totalPage) {
        const targetCurrent = this.refs.go_input.value;

        if (this.state.acceptGo && targetCurrent) {
            const _targetCurrent = Number(targetCurrent);

            switch (type) {
                case 'normal':
                    this.go(_targetCurrent, totalPage);
                    break;
                case 'simple':
                    this.go_s(_targetCurrent);
                    break;

                default:
                    break;
            }
        }
    }
    // 监控输入的数值
    checkInputValue(totalPage) {
        const targetCurrent = this.refs.go_input.value;
        const isNum = isNaN(Number(targetCurrent));

        console.log(isNum);

        if (!targetCurrent || isNum || targetCurrent < 1 || targetCurrent > totalPage) {
            this.setState({
                acceptGo: false,
            });
        } else {
            this.setState({
                acceptGo: true,
            });
        }

        console.log(targetCurrent);
    }

    render() {
        const Pages = this.creatPage();
        const Pages_s = this.creatSimple();

        const { total, pageSize, type, showQuickJumper } = this.props;

        const totalPage = Math.ceil(total / pageSize);

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
                    {showQuickJumper ? (
                        <div className={styles.go}>
                            <input
                                type="text"
                                className={styles.go_input}
                                ref="go_input"
                                onChange={this.checkInputValue.bind(this, totalPage)}
                                placeholder={'输入页码'}
                            />
                            <div
                                className={`${styles.go_btn} ${!this.state.acceptGo ? styles.disable : ''}`}
                                onClick={this.goTarget.bind(this, type, totalPage)}>
                                GO
                            </div>
                        </div>
                    ) : null}
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Pagination);
