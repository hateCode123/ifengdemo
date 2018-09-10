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
                    id="20057"
                    type="struct"
                    title="理财速递标题"
                    groupName="正文"
                    content={content.courierTitle}
                    position="relative">
                    <CourierTitle />
                </Chip>
                <Chip
                    id="10082"
                    type="static"
                    title="理财速递"
                    groupName="正文"
                    content={content.courier}
                    position="relative">
                    <CourierContent />
                </Chip>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Courier);
