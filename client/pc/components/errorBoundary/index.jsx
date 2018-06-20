import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.object,
    };

    state = {
        hasError: false,
        error: '',
    };

    componentDidCatch(error) {
        this.setState({
            hasError: true,
            error: error.message,
        });

        console.error('error', error);
        
        window.BJ_REPORT.report(error);
    }

    render() {
        const { hasError, error } = this.state;

        if (hasError) {
            return (
                <div className={styles.error_box}>
                    <div className={styles.error}>{`Something error resulting from ${error} !`}</div>
                    <div className={styles.error}>You can see the details in the developer tools by F12</div>
                </div>
            );
        }

        return this.props.children;
    }
}

const errorBoundary = WrappedComponent => {
    return class extends React.PureComponent {
        render() {
            return (
                <ErrorBoundary>
                    <WrappedComponent {...this.props} />
                </ErrorBoundary>
            );
        }
    };
};

export { errorBoundary };
export default errorBoundary;
