import React from 'react';

const dataProcessing = WrappedComponent => {
    let flag = false;

    return class extends React.PureComponent {
        handleData = props => {
            if (props) {
                for (const [key, value] of Object.entries(props)) {
                    if (value === null) {
                        flag = true;

                        const error = new Error(`${WrappedComponent.name} - ${key}：数据为空！`);

                        console.error(error);

                        if (window && window.BJ_REPORT) window.BJ_REPORT.report(error);

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
