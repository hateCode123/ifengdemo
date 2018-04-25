import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Histogram extends React.PureComponent {
    /**
     * 组建柱状图样式
     */
    getStyle = tenDayList => {
        const styles = [];
        let d = 0;

        // 柱状图每只最大值
        let flowMax = 0;

        for (let i = 0; i < tenDayList.length; i++) {
            d = Math.abs(tenDayList[i]);
            if (d > flowMax) {
                flowMax = d;
            }
        }
        for (let i = 0; i < tenDayList.length; i++) {
            d = tenDayList[i];
            const height = Math.abs(12 * (d / flowMax));

            if (d > 0) {
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
        }

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
