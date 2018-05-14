import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Histogram extends React.PureComponent {
    /**
     * 组建柱状图样式
     */
    getStyle = tenDayList => {
        const styles = [];

        // 柱状图每只最大值
        const flowMax = Math.max(...tenDayList.map(item => Math.abs(item)));

        tenDayList.forEach(item => {
            const height = Math.abs(12 * (item / flowMax));

            if (item > 0) {
                styles.push({
                    color: 'red',
                    style: { height: `${height}px`, marginTop: `${12 - height}px` },
                });
            } else {
                styles.push({
                    color: 'green',
                    style: { height: `${height}px`, marginTop: '12px' },
                });
            }
        });

        return styles;
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const style = this.getStyle(content);

        return (
            <td className={styles.histogram}>
                {content.map((item, index) => (
                    <a key={index} title={item}>
                        <div className={styles[style[index].color]} style={style[index].style} />
                    </a>
                ))}
            </td>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Histogram.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Histogram.defaultProps = {};

export { Histogram };
export default Histogram;
