import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 PocList 组件
 */
class PicList extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, prefix, isVideo } = this.props;

        return (
            <ul className={styles.list}>
                {content.map((item, index) => (
                    <li key={index}>
                        <a href={item.url} target="_blank">
                            <img src={item.pic} alt={item.title} />
                            <p>{item.title}</p>
                            {isVideo ? <div /> : null}
                        </a>
                        <p>
                            {prefix}：{item.count}
                        </p>
                    </li>
                ))}
            </ul>
        );
    }
}

/**
 * 定义组件属性类型
 * */
PicList.propTypes = {
    content: PropTypes.array,
    prefix: PropTypes.string,
    isVideo: PropTypes.bool,
};

/**
 * 定义组件默认属性
 * */
PicList.defaultProps = {};

export { PicList };
export default PicList;
