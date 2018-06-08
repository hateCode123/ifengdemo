import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 BottomAffix 组件
 */
class QrCode extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

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
                <span className={styles.closeBtn} onClick={this.handleClose}>
                    关闭
                </span>
                <img
                    src={content.url}
                    width={content.width}
                    height={content.height}
                    alt={content.title}
                    title={content.title}
                />
            </div>
        );

        return ReactDOM.createPortal(qrCode, document.getElementById('root'));
    }
}

export default QrCode;
