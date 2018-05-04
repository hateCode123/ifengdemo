import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class MidTitle extends React.PureComponent {
    render() {
        const { url, title, nowTime } = this.props;

        return (
            <div className={styles.title}>
                {nowTime ? <span>{nowTime}</span> : ''}
                <a href={url} target="_blank" rel={rel} title={title}>
                    {title}
                </a>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
MidTitle.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    nowTime: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
MidTitle.defaultProps = {};

export { MidTitle };
export default MidTitle;
