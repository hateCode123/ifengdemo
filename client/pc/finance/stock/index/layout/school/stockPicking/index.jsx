import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import RecommendStock from './recommendStock/';
import Target from './target';
import Rating from './rating/';
import FirstAttention from './firstAttention/';
import HighestAttention from './highestAttention';

class StockPicking extends React.PureComponent {
    static propTypes = {
        tabs: PropTypes.array,
        content: PropTypes.array,
    };

    state = {
        current: 0,
    };

    handleMouseOver = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ current: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current } = this.state;
        const { tabs, content } = this.props;
        const data = content[current];

        let list = null;

        if (current === 0) {
            list = <RecommendStock tabs={data[0][0].tabs} content={data[1]} />;
        } else if (current === 1) {
            list = <Target tabs={data[0][0].tabs} content={data[1]} />;
        } else if (current === 2) {
            list = <Rating tabs={data[0][0].tabs} content={data[1]} />;
        } else if (current === 3) {
            list = <FirstAttention tabs={data[0][0].tabs} content={data[1]} />;
        } else if (current === 4) {
            list = <HighestAttention tabs={data[0][0].tabs} content={data[1]} />;
        }

        return (
            <div className={styles.data_box}>
                <ul className={`${styles.tabs} clearfix`}>
                    {tabs.map((item, index) => (
                        <li
                            key={index}
                            data-index={index}
                            className={current === index ? styles.current : ''}
                            onMouseEnter={this.handleMouseOver}>
                            {item}
                        </li>
                    ))}
                </ul>
                {list}
            </div>
        );
    }
}

export default errorBoundary(StockPicking);
