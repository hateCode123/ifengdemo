import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class Caption extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const title = content[0];
        const subTitle = content.slice(1);

        return (
            <div className={`${styles.caption} clearfix`}>
                <h4>
                    <a href={title.url} target="_blank" rel={rel} title={title.title}>
                        {title.title}
                    </a>
                </h4>
                {subTitle ? (
                    <div className={`${styles.sub_title} clearfix`}>
                        {subTitle.map((item, index) => (
                            <a key={index} href={item.url} target="_blank" rel={rel} title={item.title}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Caption.propTypes = {
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
Caption.defaultProps = {};

export { Caption };
export default Caption;
