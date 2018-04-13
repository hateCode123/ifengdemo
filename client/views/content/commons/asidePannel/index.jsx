import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 AsidePannel 组件
 */
class AsidePannel extends React.PureComponent {
/**
 * 渲染组件
 */
    render() {
        const { title, extraContent, children } = this.props;

        return (
            <div className={ styles.box }>
                <div className={ styles.title }>
                    { extraContent ? extraContent : null }
                    <h2>{ title }</h2>
                </div>
                { children }
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
AsidePannel.propTypes = {
    title: PropTypes.string,
    extraContent: PropTypes.object,
    children: PropTypes.oneOfType( [
        PropTypes.object,
        PropTypes.array
    ] )
};

/**
 * 定义组件默认属性
 * */
AsidePannel.defaultProps = {};

export { AsidePannel };
export default AsidePannel;
