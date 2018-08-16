import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../utils/rel';
import TitleR from '../titleR';

class Live extends React.PureComponent {
    state = { newsArr: [] };

    /**
     * 请求 Topic
     */
    componentDidMount() {
        let news = {};
        const newsArr = [];

        /**
         * 获取格式化时间
         * @param {string} str
         */
        const formatDate = ns => {
            const d = new Date(ns);
            const dformat = `${[
                d.getFullYear(),
                d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
                d.getDate() < 10 ? `0${d.getDate() + 1}` : d.getDate() + 1,
            ].join('-')} ${[
                d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(),
                d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes(),
                d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds(),
            ].join(':')}`;

            return dformat;
        };

        const getDayNews = day => {
            const begin = `${day} 00:00:00`;
            const end = `${day} 23:59:59`;
            const begintime = Date.parse(begin) / 1000;
            const endtime = Date.parse(end) / 1000;

            jsonp('//api3.finance.ifeng.com/live/getday', {
                data: {
                    beg: begintime,
                    end: endtime,
                    level: 1,
                    dist: 1,
                    cb: 'setContDay',
                },
                jsonp: 'cb',
                jsonpCallback: 'setContDay',
                timeout: 10000,
            }).then(data => {
                const dataArr = data.data;

                dataArr.forEach(item => {
                    news = {
                        time: formatDate(item.time * 1000),
                        title: item.title,
                    };
                    newsArr.push(news);
                });

                this.setState({ newsArr });
            });
        };

        const getDay = () => {
            const timeNow = new Date();
            const year = timeNow.getFullYear();
            let month = timeNow.getMonth() + 1;

            if (month < 10) {
                month = `0${month}`;
            }
            let date = timeNow.getDate();

            if (date < 10) {
                date = `0${date}`;
            }

            return `${month}/${date}/${year}`;
        };
        const day = getDay();

        getDayNews(day);
    }

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { liveTitle, liveImg } = content;
        const { newsArr } = this.state;

        return (
            <div className={styles.box300}>
                <Chip
                    id="10058"
                    type="static"
                    title="7*24小时"
                    groupName="文章"
                    translate="jsonParse"
                    content={liveTitle}>
                    <TitleR content={liveTitle} liveImg={liveImg} />
                </Chip>

                <ul className={styles.zbList}>
                    {newsArr.map((item, index) => (
                        <li key={index}>
                            <span>{item.time}</span>
                            <p>{item.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Live.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Live.defaultProps = {};

export { Live };
export default Live;
