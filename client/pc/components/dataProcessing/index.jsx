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
