import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.object,
    };

    state = {
        hasError: false,
    };

    componentDidCatch(error) {
        this.setState({
            hasError: true,
        });

        console.error('error', error);

        if (window && window.BJ_REPORT) window.BJ_REPORT.report(error);
    }

    render() {
        const { hasError } = this.state;

        if (hasError) {
            return '';
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
