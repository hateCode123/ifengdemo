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
        const getFormatTime = (num, fmt) => {
            const time = new Date(num * 1000);
            const o = {
                'M+': time.getMonth() + 1,
                'd+': time.getDate(),
                'h+': time.getHours(),
                'm+': time.getMinutes(),
                's+': time.getSeconds(),
                'q+': Math.floor((time.getMonth() + 3) / 3),
                S: time.getMilliseconds(),
            };

            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, `${time.getFullYear()}`.substr(4 - RegExp.$1.length));
            }

            for (const k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
                }
            }

            return fmt;
        };

        const getDayNews = day => {
            const begin = `${day} 00:00:00`;
            const end = `${day} 23:59:59`;
            const begintime = getFormatTime(begin) / 1000;
            const endtime = getFormatTime(end) / 1000;

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
                        time: new Date(item.time * 1000).Format('yyyy-MM-dd hh:mm:ss'),
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
