import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class CheckBox extends React.PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.bool,
        style: PropTypes.object,
    };

    state = {
        isChecked: this.props.value || false,
        value: this.props.value,
        onChange: this.props.onChange,
    };

    static defaultProps = {
        value: false,
    };

    static getDerivedStateFromProps(nextProps, state) {
        const { onChange, style } = state;
        let resOnChange = {};
        let resStyle = {};

        if (nextProps.onChange !== onChange) {
            resOnChange = {
                onChange: nextProps.onChange,
            };
        }
        if (nextProps.style !== style) {
            resStyle = {
                style: nextProps.style,
            };
        }

        return {
            ...resOnChange,
            ...resStyle,
        };
    }

    handleChange() {
        this.setState(
            {
                isChecked: !this.state.isChecked,
            },
            () => {
                this.state.onChange(this.state.isChecked);
            },
        );
    }

    render() {
        const { isChecked } = this.state;

        console.log(this.props);

        return (
            <React.Fragment>
                <div
                    className={isChecked ? styles.checkbox_cur : styles.checkbox}
                    onClick={this.handleChange.bind(this)}
                />
            </React.Fragment>
        );
    }
}

export default errorBoundary(CheckBox);
