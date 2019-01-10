import React from 'react';
import ReactDOM from 'react-dom';
import ModalAlert from './components/modal_alert';

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

const Alert = {};

Alert.success = props =>
    show_alert({
        ...props,
        type: 'success',
    });
Alert.warning = props =>
    show_alert({
        ...props,
        type: 'warning',
    });

export default Alert;
