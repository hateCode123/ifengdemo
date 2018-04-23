import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class ThinkTank extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, tip } = this.props;

        return (
            <li className={styles.listitem}>
                <div className={styles.hot}>
                    <div className={styles.box}>
                        <div>
                            <a href={content[0].url} target="_blank" rel={rel}>
                                <img src={content[0].thumbnail} width="300" height="169" />
                            </a>
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.mask} />
                            <div className={styles.details}>
                                <h3 className={styles.title}>
                                    <a href={content[0].url} target="_blank" rel={rel}>
                                        {content[0].title}
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
