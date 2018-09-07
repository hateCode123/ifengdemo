import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { getLiveData, refreshLiveData } from '../../../../../services/api';
import TitleR from '../../components/titleR';
import errorBoundary from '@ifeng/errorBoundary';

class Live extends React.PureComponent {
    state = {
        liveData: [],
        lastid: '',
        // 刷新时间间隔
        space: 60 * 1000,
    };

    componentDidMount() {
        // 获取直播数据
        this.getLiveData();
        setInterval(() => {
            this.refresh();
        }, this.state.space);
    }

    /**
     * 获取当日时间 mm / dd / yyyy
     */
    getToday = () => {
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

    /**
     * 获取格式化时间
     * @param {string} str
     */
    getFormatTime = (num, fmt) => {
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

    /**
     * 处理接口中返回的title，因为title中可能含有div
     * @param {*} title
     */
    getTitle = title => {
        if (title.indexOf('<div>') > -1) {
            title = title.substring(5, title.length);
        }

        const indexAfDiv = title.indexOf('</div>');

        if (indexAfDiv > -1) {
            title = title.substring(0, indexAfDiv);
        }

        return title;
    };

    createMarkup = title => {
        return { __html: this.getTitle(title) };
    };

    /**
     * 初始化数据
     */
    getLiveData = async () => {
        try {
            // 获取时间戳
            const today = this.getToday();
            // 获取某一天的数据，生成直播流
            const data = await getLiveData(today);

            this.setState({
                liveData: data.data,
                lastid: `t${data.data[0].id}`,
            });
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 刷新直播数据
     */
    refresh = async () => {
        try {
            const { lastid } = this.state;
            const data = await refreshLiveData(lastid);

            if (data) {
                const { liveData } = this.state;

                this.setState({
                    liveData: data.concat(liveData),
                    lastid: `t${data[0].id}`,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const { liveData } = this.state;

        return (
            <div className={styles.box300}>
                <Chip
                    id="10058"
                    type="static"
                    title="7*24小时"
                    groupName="文章"
                    translate="jsonParse"
                    content={content}>
                    <TitleR content={content} />
                </Chip>

                <ul className={styles.zbList}>
                    {liveData.map((item, index) => (
                        <li key={index}>
                            <span>{this.getFormatTime(item.time, 'yyyy-MM-dd hh:mm:ss')}</span>
                            <p dangerouslySetInnerHTML={this.createMarkup(item.title)} />
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

export default errorBoundary(Live);
