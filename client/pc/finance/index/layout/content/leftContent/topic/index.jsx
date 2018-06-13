import React from 'react';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

import { jsonp } from '@ifeng/ui_base';

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
            const data = await jsonp('//api3.finance.ifeng.com/live/getnew', {
                data: {
                    level: 1,
                    dist: 1,
                    cb: 'setNewCont',
                },
                jsonp: 'cb',
                jsonpCallback: 'setNewCont',
            });

            this.setState({
                topic: data[0].title[0],
            });
        } catch (e) {
            console.log(e);
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

export default Topic;
