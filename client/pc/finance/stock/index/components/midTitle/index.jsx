import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class MidTitle extends React.PureComponent {
    render() {
        const { content, nowTime } = this.props;

        return (
            <div className={styles.title}>
                {nowTime ? <span>{nowTime}</span> : ''}
                <a href={content[0].url} target="_blank" rel={rel} title={content[0].title}>
                    {content[0].title}
                </a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
MidTitle.propTypes = {
    content: PropTypes.array,
    nowTime: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
MidTitle.defaultProps = {};

export { MidTitle };
export default MidTitle;
