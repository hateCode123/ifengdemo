import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class TableTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { title, url, more } = this.props;

        return (
            <div className={`${styles.title_box} clearfix`}>
                <a className={styles.title} href={url} target="_blank" rel={rel}>
                    {title}
                </a>
                <div className={styles.more}>
                    <a href={more} target="_blank" rel={rel}>
                        更多
                    </a>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
TableTitle.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    more: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
TableTitle.defaultProps = {};

export { TableTitle };
export default TableTitle;
