import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class SubTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.sub_title}>
                {content.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" rel={rel}>
                        {item.title}
                    </a>
                ))}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
SubTitle.propTypes = {
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
SubTitle.defaultProps = {
    content: [],
};

export { SubTitle };
export default SubTitle;
