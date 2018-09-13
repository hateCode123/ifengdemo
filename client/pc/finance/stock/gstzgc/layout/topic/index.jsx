import React from 'react';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';
import { getTopicData } from '../../../../../services/api';
import errorBoundary from '@ifeng/errorBoundary';

class Topic extends React.PureComponent {
    state = { topic: '' };

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
        title.replace(/&nbsp;/gi, '');

        return title;
    };

    /**
     * 请求 Topic
     */
    componentDidMount() {
        const getData = async () => {
            const data = await getTopicData();

            this.setState({ topic: this.getTitle(data[0].title[0]) });
        };

        getData();
        setInterval(() => {
            getData();
        }, 30000);
    }

    /**
     * 渲染组件
     */
    render() {
        const { topic } = this.state;

        return (
            <div className={styles.zhibo}>
                <a href="//finance.ifeng.com/gold/zhibo/" target="_blank" rel={rel} title={topic}>
                    {topic}
                </a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Topic.propTypes = {};

/**
 * 定义组件默认属性
 * */
Topic.defaultProps = {};

export default errorBoundary(Topic);
