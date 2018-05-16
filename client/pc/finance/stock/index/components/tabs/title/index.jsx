import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class Title extends React.PureComponent {
    handleMouseOver = e => {
        const { content, handleTabsChange } = this.props;
        const index = Number(e.target.attributes['data-index'].value);

        if (content.length > 1) {
            handleTabsChange(index);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, current } = this.props;

        return content.map((item, index) => (
            <h4
                key={index}
                data-index={index}
                className={`${styles.title} ${styles[`title${index}`]} ${
                    content.length === 1 || current === index ? styles.current : ''
                }`}
                onMouseEnter={this.handleMouseOver}>
                <a href={item.url} target="_blank" rel={rel}>
                    {item.title}
                </a>
            </h4>
        ));
    }
}

/**
 * 定义组件属性类型
 * */
Title.propTypes = {
    content: PropTypes.array,
    current: PropTypes.number,
    handleTabsChange: PropTypes.func,
};

/**
 * 定义组件默认属性
 * */
Title.defaultProps = {
    content: [],
    current: 0,
};

export { Title };
export default Title;
