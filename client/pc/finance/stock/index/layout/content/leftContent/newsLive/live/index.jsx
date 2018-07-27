import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { getLiveData, refreshLiveData } from '../../../../../../../../services/api';
import errorBoundary from '../../../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../../../components/dataProcessing';
import { rel } from '../../../../../../../../utils/rel';

class Live extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    state = {
        selected: true,
        liveData: [],
        lastid: '',
    };

    componentDidMount() {
        const { selected } = this.state;

        this.getLiveData();

        setInterval(() => {
            if (selected) {
                this.refresh();
            }
        }, 60000);
    }

    handleSelected = () => {
        const { selected } = this.state;

        this.setState({ selected: !selected });
    };

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

    /**
     * 初始化数据
     */
    getLiveData = async () => {
        try {
            const today = this.getToday();
            const data = await getLiveData(today);

            this.setState({
                liveData: data.data.slice(0, 10),
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
                    liveData: data.concat(liveData).slice(0, 10),
                    lastid: `t${data[0].id}`,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    createMarkup = title => {
        return { __html: this.getTitle(title) };
    };

    /**
     * 渲染组件
     */
    render() {
        const { selected, liveData } = this.state;
        const { content } = this.props;

        return (
            <div className={styles.live}>
                <div className={`${styles.title} clearfix`}>
                    <span className={selected ? styles.selected : styles.unselected} onClick={this.handleSelected}>
                        60秒后刷新
                    </span>
                    <div className={styles.devide}>&nbsp;</div>
                    <span className={styles.refresh} onClick={this.refresh}>
                        刷新
                    </span>
                    <a href="//finance.ifeng.com/gold/zhibo/" target="_blank" rel={rel}>
                        <Chip
                            id="10052"
                            type="static"
                            title="直播Logo"
                            groupName="正文"
                            translate="jsonParse"
                            content={content}>
                            <img src={content[0].url} title={content[0].title} alt={content[0].title} />
                        </Chip>
                    </a>
                </div>
                <ul className={styles.liveList}>
                    {liveData.map((item, index) => (
                        <li key={index}>
                            <span className={styles.time}>{this.getFormatTime(item.time, 'hh:mm:ss')}</span>
                            <span className={styles.devides}>|</span>
                            <span dangerouslySetInnerHTML={this.createMarkup(item.title)} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(Live));
