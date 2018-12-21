import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Modal from './modal/index';
class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = { modal: false };

    handleCancel() {
        console.log('cancle呀');
        this.modalHide();
    }

    modalShow() {
        this.setState({
            modal: true,
        });
    }

    modalHide() {
        this.setState({
            modal: false,
        });
    }
    handleOk() {
        console.log('ok呀');
        this.modalHide();
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
                        footer={true}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
