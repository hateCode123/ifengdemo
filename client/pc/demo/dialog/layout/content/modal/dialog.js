import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/modal_normal';
import ModalAlert from './components/modal_alert';

const show_dialog = props => {
    console.log(props);
    let component = null;
    const div = document.createElement('div');

    document.body.appendChild(div);

    const onClose = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);

        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    };

    ReactDOM.render(
        /* eslint-disable */
        <Modal {...props} onClose={onClose} ref={c => (component = c)} isOpen>
            {props.content}
        </Modal>,
        /* eslint-enable */
        div,
    );

    // console.dir(component);

    // return () => component.close();
};

const show_alert = props => {
    let component = null;
    const div = document.createElement('div');

    document.body.appendChild(div);

    const onClose = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);

        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    };

    ReactDOM.render(
        /* eslint-disable */
        <ModalAlert {...props} onClose={onClose} ref={c => (component = c)} isOpen>
            {props.content}
        </ModalAlert>,
        /* eslint-enable */
        div,
    );

    // console.dir(component);

    // return () => component.close();
};

const ModalBox = {};

ModalBox.dailog = props =>
    show_dialog({
        ...props,
        type: 'dialog',
    });
ModalBox.alert = props =>
    show_alert({
        ...props,
        type: 'alert',
    });

export default ModalBox;
