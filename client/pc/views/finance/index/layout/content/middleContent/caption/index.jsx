import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class Caption extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { caption } = content;

        return (
            <div className={styles.caption}>
                <h5>
                    <a href={caption.url} target="_blank" rel={rel} title={caption.title}>
                        {caption.title}
                    </a>
                </h5>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Caption.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
Caption.defaultProps = {};

export { Caption };
export default Caption;
