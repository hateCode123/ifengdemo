import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class JumpLink extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.link_box}>
                <div className={styles.box}>
                    {content.map((item, index) => (
                        <a key={index} href={item.url} target="_blank" rel={rel} title={item.title}>
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
JumpLink.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
JumpLink.defaultProps = {};

export { JumpLink };
export default JumpLink;
