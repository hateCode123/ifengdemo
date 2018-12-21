import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import closeImg from './image/close.png';
import { timingSafeEqual } from 'crypto';

class Modal extends React.PureComponent {
    state = {
        isOpen: this.props.isOpen || false,
    };

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
        className: PropTypes.string,
        maskClosable: PropTypes.bool,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        okText: PropTypes.string,
        cancelText: PropTypes.string,
        modalWith: PropTypes.number,
        footer: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        maskClosable: true,
        onCancel: () => {},
        onOk: () => {},
        okText: 'OK',
        cancelText: 'Cancel',
        modalWith: 400,
        footer: true,
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps.isOpen);
        if ('isOpen' in nextProps) {
            this.setState({
                isOpen: nextProps.isOpen,
            });
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
        this.close();
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
            footer,
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
                                <div className={styles.modal_footer}>
                                    <button className={styles.btn} onClick={this.handleCancel.bind(this)}>
                                        <span>{cancelText}</span>
                                    </button>
                                    <button
                                        className={`${styles.btn} ${styles.btn_comfirm} ${styles.ml_8}`}
                                        onClick={this.handleOk.bind(this)}>
                                        <span>{okText}</span>
                                    </button>
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
