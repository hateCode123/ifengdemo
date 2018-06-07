import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Qa extends React.PureComponent {
    handleMouseOver = e => {
        const { handleMouseOver } = this.props;
        const val = Number(e.currentTarget.attributes['data-index'].value);

        handleMouseOver(val);
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, current } = this.props;

        return (
            <ul className={`${styles.tabs} clearfix`}>
                {content.map((item, index) => (
                    <li
                        key={index}
                        className={current === index ? styles.current : ''}
                        data-index={index}
                        onMouseEnter={this.handleMouseOver}>
                        {item.name}
                    </li>
                ))}
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Qa.propTypes = {
    content: PropTypes.array,
    current: PropTypes.number,
    handleMouseOver: PropTypes.func,
};

/**
 * 定义组件默认属性
 * */
Qa.defaultProps = {};

export { Qa };
export default Qa;
