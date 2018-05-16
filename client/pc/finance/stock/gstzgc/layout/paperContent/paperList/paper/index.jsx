import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import { jsonp } from '@ifeng/ui_base';
import md5 from 'md5';

class Paper extends React.PureComponent {
    state = {
        counts: [],
        current: '',
    };

    /**
     * 获取skey方法
     */
    getSkey = (title, url) => {
        const str = `Ifeng888${encodeURI(title)}${encodeURI(url)}`;
        const skey = md5(str);

        return skey.substr(2, 6).toLowerCase();
    };
    handleLiChange = num => {
        this.setState({ current: num });
    };
    handleChange = () => {
        this.setState({ current: '' });
    };

    /**
     * 获取评论数
     */
    async componentDidMount() {
        const { content } = this.props;
        const docUrl = [];
        const count = [];

        content.map(item => {
            docUrl.push(item.commentUrl);

            return docUrl;
        });

        const data = await jsonp('//comment.ifeng.com/get.php', {
            data: {
                job: 4,
                format: 'js',
                callback: 'getAllComment1',
                docurl: docUrl.join('|'),
            },
        });

        data.forEach(item => {
            count.push(item.count);
        });

        this.setState({ counts: count });
    }

    render() {
        const { content } = this.props;
        const { counts, current } = this.state;

        // summary返回数据里边没有摘要
        // 页面地址是detail.

        const creatList = () => (
            <ul>
                {content.map((item, index) => (
                    <li
                        key={index}
                        onMouseEnter={() => this.handleLiChange(index)}
                        onMouseLeave={() => this.handleChange()}
                        className={current === index ? styles.l_on : ''}>
                        <h4>
                            <a href={item.url} target="_blank" skey={this.getSkey(item.title, item.url)}>
                                {item.title}
                            </a>
                        </h4>
                        <p>{item.summary ? item.summary : ''}</p>
                        <div className={styles.xx}>
                            <div className={styles.by}>{item.source ? item.source : ''}</div>
                            <div className={styles.date}>{item.newsTime}</div>
                            <div className={styles.pl}>
                                <a
                                    href={`//gentie.ifeng.com/view.html?docName=${item.title}&docUrl=${
                                        item.commentUrl
                                    }&skey=${this.getSkey(item.title, item.url)}&pcUrl&=${item.url}`}
                                    target="_blank"
                                    rel={rel}>
                                    {counts[index]}
                                </a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        );

        return <ul className={styles.newsList}>{creatList()}</ul>;
    }
}

/**
 * 定义组件属性类型
 * */
Paper.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Paper.defaultProps = {};

export default Paper;
