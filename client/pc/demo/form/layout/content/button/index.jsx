import React, { Fragment } from 'react';
import errorBoundary from '@ifeng/errorBoundary';
import styles from './index.css';
import PropTypes from 'prop-types';

/**
 * for this page
 */

class Button extends React.PureComponent {
    static propTypes = {
        innerText: PropTypes.string,
        type: PropTypes.string,
        configClass: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
    };

    state = {
        type: this.props.type,
        innerText: this.props.innerText,
        onClick: this.props.onClick,
    };

    static defaultProps = {
        type: 'normal',
        onClick: () => {},
        disabled: false,
    };

    static getDerivedStateFromProps(nextProps, state) {
        const { type, innerText, onClick, disabled } = state;

        let resultType = {};
        let resultInnerText = {};
        let resultOnClickHandle = {};
        let resultDisabled = {};

        if (nextProps.type !== type) {
            resultType = {
                type: nextProps.type,
            };
        }

        if (nextProps.onClick !== onClick) {
            resultInnerText = {
                onClick: nextProps.onClick,
            };
        }

        if (nextProps.innerText !== innerText) {
            resultOnClickHandle = {
                innerText: nextProps.innerText,
            };
        }

        if (nextProps.disabled !== disabled) {
            resultDisabled = {
                disabled: nextProps.disabled,
            };
        }

        return {
            ...resultType,
            ...resultInnerText,
            ...resultOnClickHandle,
            ...resultDisabled,
        };
    }

    handleClick() {
        const { onClick, disabled } = this.state;

        if (disabled) {
            return;
        } else {
            onClick();
        }
    }

    render() {
        /**
         * 组件分发数据
         */
        const { innerText, type, onClick } = this.state;
        const { configClass } = this.props;
        //

        const checkType = type => {
            let className = '';

            switch (type) {
                case 'normal':
                    className = '';
                    break;
                case 'confirm':
                    className = styles.confirm;
                    break;

                default:
                    break;
            }

            return className;
        };

        return (
            <Fragment>
                <div className={configClass}>
                    <div className={`${styles.Button} ${checkType(type)}`} onClick={this.handleClick.bind(this)}>
                        {innerText}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(Button);
