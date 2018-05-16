import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class Title extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { title, text } = this.props;

        return (
            <div className={styles.hot}>
                <h2 className={styles.title}>
                    <a href={title.url} target="_blank" rel={rel} title={title.title}>
                        {title.title}
                    </a>
                </h2>
                <p className={styles.text}>
                    <a href={text.url} target="_blank" rel={rel} title={text.title}>
                        {text.title}
                    </a>
                </p>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Title.propTypes = {
    title: PropTypes.object,
    text: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
Title.defaultProps = {};

export { Title };
export default Title;
