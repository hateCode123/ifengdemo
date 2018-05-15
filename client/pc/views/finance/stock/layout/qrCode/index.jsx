import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 BottomAffix 组件
 */
class QrCode extends React.PureComponent {
    state = {
        isShow: true,
    };

    /**
     * 关闭事件
     */
    handleClose = () => {
        const { isShow } = this.state;

        this.setState({ isShow: !isShow });
    };

    /**
     * 渲染组件
     */
    render() {
        const { isShow } = this.state;
        const content = this.props.content[0];

        const qrCode = (
            <div className={styles.qrCode} style={{ display: isShow ? 'block' : 'none' }}>
                <img
                    src={content.url}
                    width={content.width}
                    height={content.height}
                    alt={content.title}
                    title={content.title}
                />
                <span className={styles.closeBtn} onClick={this.handleClose}>
                    关闭
                </span>
            </div>
        );

        return ReactDOM.createPortal(qrCode, document.getElementById('root'));
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
