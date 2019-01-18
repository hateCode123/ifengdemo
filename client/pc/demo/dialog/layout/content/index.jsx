import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Modal from './modal/index';
import ModalBox from './modal/dialog';
import Alert from './modal/alert';
class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = { modal: false, isOpen: true };

    handleCancel() {
        console.log('cancle呀');
        this.modalHide();
    }

    modalShow() {
        this.setState({
            modal: true,
        });
    }

    tryIt() {
        console.log('you win');
    }

    modalHide() {
        this.setState({
            modal: false,
        });
    }
    handleOk() {
        console.log('ok呀');
        // this.modalHide();
    }
    handleClose() {
        console.log('closed');
        // this.tryIt();
        ModalBox.dailog({
            title: 'Demo',
            content: 'Hello world!',
            okText: '确认',
            cancelText: '取消',
            onOk: () => console.log('ok'),
            onCancel: () => console.log('cancel'),
            onClose: () => console.log('closed'),
        });
    }

    render() {
        const modalContent = (
            <div style={{ color: 'red', padding: '30px' }}>
                <label>输入框: </label>
                <input type="text" />
            </div>
        );

        return (
            <React.Fragment>
                <div>
                    <button onClick={this.modalShow.bind(this)}>按钮</button>
                    <Modal
                        isOpen={this.state.modal}
                        title={'错误提示'}
                        children={modalContent}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        onClose={() => {
                            this.handleClose();
                        }}
                        footer={true}
                    />
                    <button
                        onClick={() =>
                            ModalBox.dailog({
                                isOpen: this.state.isOpen,
                                title: 'Demo',
                                content: <button>按钮</button>,
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => console.log('ok'),
                                onCancel: () => console.log('cancel'),
                                onClose: () => console.log('closed'),
                                footer: false,
                            })
                        }>
                        click me!
                    </button>
                    <button
                        onClick={() =>
                            Alert.warning({
                                content: 'Hello world!',
                                // onClose: () => console.log('closed'),
                            })
                        }>
                        click me!
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
