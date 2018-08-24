import React from 'react';
import styles from './index.css';
import { getTopicData } from '../../../../../../services/api';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class Topic extends React.PureComponent {
    state = {
        topic: '',
    };

    /**
     * 请求 Topic
     */
    componentDidMount() {
        this.getData();
        setInterval(() => {
            this.getData();
        }, 30000);
    }

    /**
     * 卸载定时器
     */
    componentWillUnmount() {
        clearInterval();
    }

    getData = async () => {
        try {
            const data = await getTopicData();

            this.setState({
                topic: data[0].title[0],
            });
        } catch (e) {
            console.error(e);
        }
    };

    createMarkup = () => {
        const { topic } = this.state;

        return { __html: topic };
    };

    /**
     * 渲染组件
     */
    render() {
        const { topic } = this.state;

        return (
            <div className={styles.time}>
                <ul className={styles.RunTopic}>
                    <li>
                        <a href="//finance.ifeng.com/gold/zhibo/" target="_blank" rel={rel} title={topic}>
                            <span dangerouslySetInnerHTML={this.createMarkup()} />
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default errorBoundary(Topic);
