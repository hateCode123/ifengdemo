import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import { MidTitle } from '../../../../components/midTitle';

class FundsFlow extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { title, url } = content;

        return (
            <div className={styles.fundsFlow}>
                <MidTitle title={title} url={url} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
FundsFlow.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
FundsFlow.defaultProps = {};

export { FundsFlow };
export default FundsFlow;
