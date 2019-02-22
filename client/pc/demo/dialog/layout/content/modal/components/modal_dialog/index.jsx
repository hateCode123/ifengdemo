import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import closeImg from '../image/close.png';

class Modal extends React.PureComponent {
    state = {
        isOpen: this.props.isOpen || false,
    };

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        className: PropTypes.string,
        maskClosable: PropTypes.bool,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        okText: PropTypes.string,
        cancelText: PropTypes.string,
        modalWith: PropTypes.number,
        onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };

    static defaultProps = {
        className: '',
        maskClosable: true,
        onCancel: () => {},
        onOk: () => {},
        onClose: () => {},
        okText: 'OK',
        cancelText: 'Cancel',
        modalWith: 400,
    };

    static getDerivedStateFromProps(nextProps, state) {
        let resIsOpen = {};

        if (nextProps.isOpen !== state.isOpen) {
            resIsOpen = {
                isOpen: nextProps.isOpen,
            };
        }

        return { ...resIsOpen };
    }

    toggleModalClass(isOpen) {
        const body = document.body;

        if (isOpen) {
            body.classList.add('modal_open');
        } else {
            body.classList.remove('modal_open');
        }
    }
    // 关闭弹窗
    close() {
        console.log('close');
        this.setState({
            isOpen: false,
        });
        this.toggleModalClass(false);
    }

    emptyFunc() {}
    // 点击确定触发的事件
    handleOk_dialog() {
        // dialog模式下点击ok事件
        console.log('press ok');
        this.props.onOk();
        this.close();
        this.props.onClose();
    }
    // 点击取消触发的事件
    handleCancel() {
        console.log('press cancel');
        const { onCancel } = this.props;

        onCancel();
        this.close();
        this.props.onClose();
    }
    dialogHandleClose() {
        console.log('press close');
        const { onClose } = this.props;

        onClose();
        this.close();
    }

    render() {
        const { title, children, className, okText, cancelText, onOk, onCancel, maskClosable, modalWith } = this.props;

        const { isOpen } = this.state;

        return (
            <React.Fragment>
                <div style={{ display: isOpen ? 'block' : 'none' }}>
                    <div
                        className={`${styles.modal_mask} ${className}`}
                        onClick={maskClosable ? this.handleCancel.bind(this) : this.emptyFunc.bind(this)}>
                        <div
                            className={styles.modal_body}
                            style={{ width: `${modalWith}px` }}
                            onClick={e => {
                                e.stopPropagation();
                            }}>
                            {title ? (
                                <div className={styles.modal_title}>
                                    <div style={{ float: 'left' }}>{title}</div>
                                    <div className={styles.close} onClick={this.dialogHandleClose.bind(this)}>
                                        <img src={closeImg} title="关闭" />
                                    </div>
                                </div>
                            ) : null}
                            <div className={styles.modal_contianer} ref="contianer">
                                {isOpen ? children : null}
                            </div>
                            <div className={`${styles.dialog_footer} ${styles.clearfix}`}>
                                <React.Fragment>
                                    <div className={`${styles.buttonWrap} ${styles.clearfix}`}>
                                        <button className={styles.btn_dialog} onClick={this.handleCancel.bind(this)}>
                                            <span>{cancelText}</span>
                                        </button>
                                        <button
                                            className={`${styles.btn_dialog} ${styles.btn_comfirm}`}
                                            onClick={this.handleOk_dialog.bind(this)}>
                                            <span>{okText}</span>
                                        </button>
                                    </div>
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Modal);
