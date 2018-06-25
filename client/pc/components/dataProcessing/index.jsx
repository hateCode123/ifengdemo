import React from 'react';

const dataProcessing = WrappedComponent => {
    let flag = false;

    return class extends React.PureComponent {
        handleData = props => {
            if (props) {
                for (const item of Object.values(props)) {
                    if (item === null) {
                        flag = true;

                        return;
                    } else if (
                        item instanceof Array ||
                        typeof item === 'string' ||
                        typeof item === 'number' ||
                        typeof item === 'boolean'
                    ) {
                        flag = false;
                    } else {
                        this.handleData(item);
                    }
                }
            } else {
                flag = true;

                return;
            }
        };

        render() {
            this.handleData(this.props);

            return flag ? '' : <WrappedComponent {...this.props} />;
        }
    };
};

export { dataProcessing };
export default dataProcessing;
