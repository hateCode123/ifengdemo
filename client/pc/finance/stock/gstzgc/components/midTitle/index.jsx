import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../utils/rel';

class MidTitle extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        nowTime: PropTypes.bool,
    };

    state = {
        time: '',
    };

    componentDidMount() {
        if (this.props.nowTime) {
            this.refreshCalendarClock();
            setInterval(() => {
                this.refreshCalendarClock();
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval();
    }

    /**
     * 获取当前时间
     */
    refreshCalendarClock = () => {
        const now = new Date();
        let time = '';
        let hours = now.getHours();

        if (hours < 10) {
            hours = `0${hours}`;
        }
        time += `${hours}:`;
        let minutes = now.getMinutes();

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        time += minutes;

        this.setState({
            time,
        });
    };

    render() {
        const { content, nowTime } = this.props;
        const { time } = this.state;

        return (
            <div className={styles.title}>
                {nowTime ? <span>{time}</span> : ''}
                <a href={content[0].url} target="_blank" rel={rel} title={content[0].title}>
                    {content[0].title}
                </a>
            </div>
        );
    }
}

export default errorBoundary(MidTitle);
