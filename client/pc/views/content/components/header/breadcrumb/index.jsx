import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 Breadcrumb 组件
 */
class Breadcrumb extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.theCurrent}>
                {content.map((item, index) => (
                    <span key={index}>
                        <a href={item.url}>{item.title}</a> &gt;{' '}
                    </span>
                ))}
                正文
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Breadcrumb.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Breadcrumb.defaultProps = {};

export { Breadcrumb };
export default Breadcrumb;
