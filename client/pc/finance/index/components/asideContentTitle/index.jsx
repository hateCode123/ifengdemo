import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 AsideContentTitle 组件
 */
class AsideContentTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { title } = this.props;

        return (
            <div className={ styles.title01 }>
                <h2>{ title }</h2>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
AsideContentTitle.propTypes = { title: PropTypes.string };

/**
 * 定义组件默认属性
 * */
AsideContentTitle.defaultProps = {};

export { AsideContentTitle };
export default AsideContentTitle;
