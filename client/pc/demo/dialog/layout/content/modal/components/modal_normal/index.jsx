import React from 'react';
import ReactDOM from 'react-dom';
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
        footer: PropTypes.bool,
        type: PropTypes.string,
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
        footer: true,
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
    handleOk() {
        console.log('press ok');
        this.props.onOk();
        // this.close();
    }
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
    // 点击关闭触发的事件
    handleClose() {
        console.log('press close');
        const { onClose } = this.props;

        // 可自定义关闭按钮是否可用
        if (Object.prototype.toString.call(onClose) === '[object Object]') {
            if (onClose.closeAble !== false) {
                onClose.callback();
                this.close();
            } else {
                onClose.callback();
            }
        } else if (Object.prototype.toString.call(onClose) === '[object Function]') {
            onClose();
            this.close();
        }
    }
    dialogHandleClose() {
        console.log('press close');
        const { onClose } = this.props;

        onClose();
        this.close();
    }

    render() {
        const {
            title,
            children,
            className,
            okText,
            cancelText,
            onOk,
            onCancel,
            maskClosable,
            modalWith,
            footer,
            type,
        } = this.props;

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
                                    <div
                                        className={styles.close}
                                        onClick={
                                            type === 'dialog'
                                                ? this.dialogHandleClose.bind(this)
                                                : this.handleClose.bind(this)
                                        }>
                                        <img src={closeImg} title="关闭" />
                                    </div>
                                </div>
                            ) : null}
                            <div className={styles.modal_contianer} ref="contianer">
                                {isOpen ? children : null}
                            </div>
                            {footer ? (
                                <div
                                    className={`${type === 'dialog' ? styles.dialog_footer : styles.modal_footer} ${
                                        styles.clearfix
                                    }`}>
                                    {type === 'dialog' ? (
                                        <React.Fragment>
                                            <div className={`${styles.buttonWrap} ${styles.clearfix}`}>
                                                <button
                                                    className={styles.btn_dialog}
                                                    onClick={this.handleCancel.bind(this)}>
                                                    <span>{cancelText}</span>
                                                </button>
                                                <button
                                                    className={`${styles.btn_dialog} ${styles.btn_comfirm}`}
                                                    onClick={this.handleOk_dialog.bind(this)}>
                                                    <span>{okText}</span>
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <button className={styles.btn} onClick={this.handleCancel.bind(this)}>
                                                <span>{cancelText}</span>
                                            </button>
                                            <button
                                                className={`${styles.btn} ${styles.btn_comfirm} ${styles.ml_8}`}
                                                onClick={this.handleOk.bind(this)}>
                                                <span>{okText}</span>
                                            </button>
                                        </React.Fragment>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Modal);
