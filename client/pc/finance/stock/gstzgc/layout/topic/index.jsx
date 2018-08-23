import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../utils/rel';
import { getTopicData } from '../../../../../services/api';

class Topic extends React.PureComponent {
    state = { topic: '' };

    /**
     * 请求 Topic
     */
    componentDidMount() {
        const getData = async () => {
            const data = await getTopicData();

            this.setState({ topic: data[0].title[0] });
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

export { Topic };
export default Topic;
