import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../../utils/rel';

class CourierTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const content = this.props.content[0];

        return (
            <div className={styles.caption}>
                <a href={content.url} target="_blank" rel={rel} title={content.title}>
                    {content.title}
                </a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CourierTitle.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
CourierTitle.defaultProps = {};

export { CourierTitle };
export default CourierTitle;
