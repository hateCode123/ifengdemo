import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import successImg from '../image/dui_img.png';
import warningImg from '../image/tan_img.png';

class ModalAlert extends React.PureComponent {
    state = {
        isOpen: this.props.isOpen || false,
        imgSrc: '',
    };

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        className: PropTypes.string,
        maskClosable: PropTypes.bool,
        type: PropTypes.string,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        maskClosable: true,
        modalWith: 400,
        type: 'success',
        onClose: () => {},
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if ('isOpen' in nextProps) {
            this.setState({
                isOpen: nextProps.isOpen,
            });
        }
    }

    componentDidMount() {
        this.setImgSrc();
    }

    // 关闭弹窗
    close() {
        console.log('close');
        this.setState({
            isOpen: false,
        });
        this.props.onClose();
    }

    setImgSrc() {
        const { type } = this.props;

        switch (type) {
            case 'success':
                this.setState({
                    imgSrc: successImg,
                });
                break;
            case 'warning':
                this.setState({
                    imgSrc: warningImg,
                });
                break;

            default:
                break;
        }
    }

    emptyFunc() {}
    // 点击确定触发的事件

    render() {
        const { children, className, maskClosable, type } = this.props;

        const { isOpen, imgSrc } = this.state;

        return (
            <React.Fragment>
                <div style={{ display: isOpen ? 'block' : 'none' }}>
                    <div
                        className={`${styles.modal_mask} ${className}`}
                        onClick={maskClosable ? this.close.bind(this) : this.emptyFunc}>
                        <div className={styles.modalWrap}>
                            <img src={imgSrc} />
                            {children}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(ModalAlert);
