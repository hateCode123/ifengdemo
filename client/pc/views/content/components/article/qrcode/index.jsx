import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 QrCode 组件
 */
class QrCode extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        
        return (
            <div className={ styles.box }>
                {content.map( ( item, index ) => (
                    <div key={ index }>
                        <img src={ item } />
                    </div>
                ) )}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
QrCode.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
QrCode.defaultProps = {};

export { QrCode };
export default QrCode;
