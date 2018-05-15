import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class BoxTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { url, title } = this.props;

        return (
            <div className={styles.box_title}>
                <span className={styles.title}>
                    <a href={url} target="_blank" rel={rel} title={title}>
                        {title}
                    </a>
                </span>
                {this.props.children}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
BoxTitle.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
BoxTitle.defaultProps = {};

export { BoxTitle };
export default BoxTitle;
