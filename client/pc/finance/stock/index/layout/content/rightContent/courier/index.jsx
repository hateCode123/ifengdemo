import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import CourierTitle from './courierTitle/';
import CourierContent from './courierContent/';
import errorBoundary from '@ifeng/errorBoundary';

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
                    content={content.courierTitle}
                    position="relative">
                    <CourierTitle />
                </Chip>
                <Chip
                    id="10082"
                    type="static"
                    title="理财速递"
                    groupName="正文"
                    translate="jsonParse"
                    content={content.courier}
                    position="relative">
                    <CourierContent />
                </Chip>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Courier);
