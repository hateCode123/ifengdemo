import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/modal_dialog';

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

const Dialog = props =>
    show_dialog({
        ...props,
        type: 'dialog',
    });

export default Dialog;
