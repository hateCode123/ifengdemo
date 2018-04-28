import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class HeadTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, children } = this.props;
        const { subTitle } = content;
        const subTitleList = [];

        subTitle.map((item, index) => {
            subTitleList.push(
                <a key={index} href={item.url} target="_blank" rel={rel}>
                    {item.title}
                </a>,
            );

            subTitleList.push(index === subTitle.length - 1 ? '' : '|');

            return subTitleList;
        });

        return (
            <div className={`${styles.head_title} clearfix`}>
                <div className={styles.sub_title}>{subTitleList}</div>
                {children}
                <div className={styles.title}>
                    <a>{content.title}</a>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HeadTitle.propTypes = {
    content: PropTypes.object,
    children: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
HeadTitle.defaultProps = {};

export { HeadTitle };
export default HeadTitle;
