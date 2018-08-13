import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import CourierTitle from './courierTitle/';
import CourierContent from './courierContent/';
import errorBoundary from '../../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../../components/dataProcessing';

class Courier extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <React.Fragment>
                <Chip
                    id="10119"
                    type="static"
                    title="理财速递标题"
                    groupName="正文"
                    translate="jsonParse"
                    content={content.courierTitle}>
                    <CourierTitle />
                </Chip>
                <Chip
                    id="10082"
                    type="static"
                    title="理财速递"
                    groupName="正文"
                    translate="jsonParse"
                    content={content.courier}>
                    <CourierContent />
                </Chip>
            </React.Fragment>
        );
    }
}

export default errorBoundary(dataProcessing(Courier));
