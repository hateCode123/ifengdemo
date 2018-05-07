import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import { MidTitle } from '../../../../components/midTitle';

class Rank extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { title, url } = content;

        return (
            <div className={styles.rank_box}>
                <MidTitle title={title} url={url} />
                <div className={`${styles.rank} clearfix`} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Rank.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
Rank.defaultProps = {};

export { Rank };
export default Rank;
