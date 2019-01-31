import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class TextArea extends React.PureComponent {
    static propTypes = {
        configClass: PropTypes.string,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        style: PropTypes.object,
    };

    state = {
        value: this.props.value,
        onChange: this.props.onChange,
        configClass: this.props.configClass,
        placeholder: this.props.placeholder,
    };

    static defaultProps = {
        value: '',
    };

    static getDerivedStateFromProps(nextProps, state) {
        const { configClass, onChange, placeholder, style } = state;
        let resConfigClass = {};
        let resOnChange = {};
        let resPlaceholder = {};
        let resStyle = {};

        if (nextProps.configClass !== configClass) {
            resConfigClass = {
                configClass: nextProps.resConfigClass,
            };
        }
        if (nextProps.onChange !== onChange) {
            resOnChange = {
                onChange: nextProps.onChange,
            };
        }
        if (nextProps.placeholder !== placeholder) {
            resPlaceholder = {
                placeholder: nextProps.placeholder,
            };
        }
        if (nextProps.style !== style) {
            resStyle = {
                style: nextProps.style,
            };
        }

        return {
            ...resConfigClass,
            ...resOnChange,
            ...resPlaceholder,
            ...resStyle,
        };
    }

    handleChange(e) {
        const value = e.currentTarget.value;

        this.setState({
            value,
        });
        this.state.onChange(value);
    }

    render() {
        const { value, configClass, placeholder, style } = this.state;

        // console.log(this.props);

        return (
            <React.Fragment>
                <div className={`${styles.TextArea} ${configClass ? configClass : ''}`} style={{ ...style }}>
                    <textarea
                        placeholder={placeholder ? placeholder : ''}
                        type="text"
                        onChange={this.handleChange.bind(this)}
                        value={value}
                        onBlur={this.props.onBlur}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(TextArea);
