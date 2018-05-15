import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';
import { jsonp } from '@ifeng/ui_base';

class ThinkTank extends React.PureComponent {
    state = {
        data: {},
    };

    /**
     * 请求数据
     */
    async componentDidMount() {
        try {
            const { content } = this.props;

            if (!content) {
                const data = await jsonp('//lark.ifeng.com/lark/topic_list.jhtml?topic.categoryId=1421', {
                    data: {
                        offset: 0,
                        limit: 1,
                        pageSize: 1,
                    },
                });

                this.setState({ data: data.data.data[0] });
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 渲染组件
     */
    render() {
        const { data } = this.state;
        const { content, tip } = this.props;

        const datas = content ? content[0] : data;

        return (
            <li className={styles.listitem}>
                <div className={styles.hot}>
                    <div className={styles.box}>
                        <div>
                            <a href={datas.url} target="_blank" rel={rel}>
                                <img src={datas.thumbnail} width="300" height="169" />
                            </a>
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.mask} />
                            <div className={styles.details}>
                                <h3 className={styles.title}>
                                    <a href={datas.url} target="_blank" rel={rel}>
                                        {datas.title}
                                    </a>
                                </h3>
                            </div>
                        </div>
                        <div className={styles.tip}>{tip}</div>
                    </div>
                </div>
            </li>
        );
    }
}

/**
 * 定义组件属性类型
 * */
ThinkTank.propTypes = {
    content: PropTypes.array,
    tip: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
ThinkTank.defaultProps = {};

export { ThinkTank };
export default ThinkTank;
