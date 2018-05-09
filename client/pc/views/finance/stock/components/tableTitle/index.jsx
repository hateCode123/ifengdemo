import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class TableTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { title, url, more } = content[0];

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
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
TableTitle.defaultProps = {};

export { TableTitle };
export default TableTitle;
