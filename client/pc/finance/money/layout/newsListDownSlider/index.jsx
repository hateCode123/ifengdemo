import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class NewsListDownSliderTop extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };
    render() {
        const { content } = this.props;

        console.log('content=======>>>', content);

        const list = content.map((item, index) => {
            let result = null;

            if (index % 3 === 0) {
                result = (
                    <h2 key={index}>
                        <a href={item.url} rel={rel} target="_blank">
                            {item.title}
                        </a>
                    </h2>
                );
            } else if (index % 3 === 1) {
                result = (
                    <h3 key={index} className={style.box_01_1}>
                        <a href={item.url} rel={rel} target="_blank">
                            {item.title}
                        </a>
                    </h3>
                );
            } else if (index % 3 === 2) {
                result = (
                    <h3 key={index} className={style.box_01}>
                        <a href={item.url} rel={rel} target="_blank">
                            {item.title}
                        </a>
                    </h3>
                );
            }

            return result;
        });

        return (
            <div key="list" className={`${style.box_txt01} ${style.huh_box}`}>
                {list}
            </div>
        );
    }
}

class NewsListLeftInner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };
    render() {
        // const { showData } = this.state;
        const { content } = this.props;
        const list = showData =>
            showData.map((item, index) => {
                return index === 0 ? (
                    <li key={index}>
                        <h3>
                            <a href={item.url} rel={rel} target="_blank">
                                {item.title}
                            </a>
                        </h3>
                    </li>
                ) : (
                    <li key={index}>
                        <a href={item.url} rel={rel} target="_blank">
                            {item.title}
                        </a>
                    </li>
                );
            });

        const topList = [...content].filter((item, i) => i < 7);
        const bottomList = [...content].filter((item, i) => i >= 7);

        const Arr = [topList, bottomList];

        const contentDom = Arr.map((item, i) => {
            return (
                <ul key={i} className={style.box_02}>
                    {list(item)}
                </ul>
            );
        });

        return (
            <div className={`${style.b_box} ${style.huh_box}`}>
                <div className={style.title}>
                    <a rel={rel} title="要闻" target="_blank">
                        要闻
                    </a>
                </div>
                {contentDom}
            </div>
        );
    }
}
class NewsListDownSlider extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    getData = (data, min, max) => {
        return [...data].filter((item, i) => i >= min && i < max);
    };
    render() {
        const { content } = this.props;
        const top = <NewsListDownSliderTop key="top" content={this.getData(content, 0, 6)} />;
        const bottom = <NewsListLeftInner key="bottom" content={this.getData(content, 6, 20)} />;

        return [top, bottom];
    }
}

export default errorBoundary(NewsListDownSlider);
