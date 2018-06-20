import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import CourierTitle from './courierTitle/';
import CourierContent from './courierContent/';

class Courier extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { courierTitle, courier } = content;

        return (
            <div className={styles.courier}>
                <Chip id="10119" type="static" title="理财速递标题" groupName="正文" content={courierTitle}>
                    <CourierTitle />
                </Chip>
                <Chip id="10082" type="static" title="理财速递" groupName="正文" content={courier}>
                    <CourierContent />
                </Chip>
            </div>
        );
    }
}

export default Courier;
