import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Qa extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        current: PropTypes.number,
        handleMouseOver: PropTypes.func,
    };

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

export default errorBoundary(Qa);
