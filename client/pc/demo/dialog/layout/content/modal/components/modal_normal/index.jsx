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
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        className: PropTypes.string,
        maskClosable: PropTypes.bool,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        okText: PropTypes.string,
        cancelText: PropTypes.string,
        modalWith: PropTypes.number,
        dialogModalWith: PropTypes.number,
        footer: PropTypes.bool,
        type: PropTypes.string,
        onClose: PropTypes.func,
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
        dialogModalWith: 300,
        footer: true,
    };

    // static getDerivedStateFromProps(props, state) {
    //     if (props.isOpen !== state.isOpen) {
    //         return props.isOpen;
    //     }

    //     return null;
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if ('isOpen' in nextProps) {
            this.setState({
                isOpen: nextProps.isOpen,
            });
            if (!nextProps.isOpen) {
                nextProps.onClose();
            }
        }
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
    // 点击取消触发的事件
    handleCancel() {
        console.log('press cancel');
        this.props.onCancel();
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
            dialogModalWith,
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
                            style={{ width: type === 'dialog' ? `${dialogModalWith}px` : `${modalWith}px` }}
                            onClick={e => {
                                e.stopPropagation();
                            }}>
                            <div className={styles.modal_title}>
                                <div style={{ float: 'left' }}>{title}</div>
                                <div className={styles.close} onClick={this.handleCancel.bind(this)}>
                                    <img src={closeImg} title="关闭" />
                                </div>
                            </div>
                            <div className={styles.modal_contianer} ref="contianer">
                                {isOpen ? children : null}
                            </div>
                            {footer ? (
                                <div className={`${styles.modal_footer} ${styles.clearfix}`}>
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
                                                    onClick={this.handleOk.bind(this)}>
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
