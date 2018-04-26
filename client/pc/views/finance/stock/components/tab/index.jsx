import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class Tab extends React.PureComponent {
    handleMouseOver = index => {
        const { content, handleTabsChange } = this.props;

        if (content.title.length > 1) {
            handleTabsChange(index);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, current } = this.props;
        const title = content.title;
        const subTitle = content.subTitle;
        const ad = content.ad;

        return (
            <div className={styles.tab}>
                {title.map((item, index) => (
                    <h4
                        key={index}
                        className={`${styles[`title${index}`]} ${
                            title.length === 1 || current === index ? styles.current : ''
                        }`}
                        onMouseEnter={() => this.handleMouseOver(index)}>
                        <a href={item.url} target="_blank" rel={rel}>
                            {item.title}
                        </a>
                    </h4>
                ))}
                {subTitle ? (
                    <div className={styles.sub_title}>
                        {subTitle.map((item, index) => (
                            <a key={index} href={item.url} target="_blank" rel={rel}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                ) : (
                    ''
                )}
                {ad ? (
                    <div className={styles.ad}>
                        <a href={ad.url} target="_blank" rel={rel}>
                            <span>{ad.title}</span>
                        </a>
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
Tab.propTypes = {
    content: PropTypes.object,
    current: PropTypes.number,
    handleTabsChange: PropTypes.func,
};

/**
 * 定义组件默认属性
 * */
Tab.defaultProps = {};

export { Tab };
export default Tab;
