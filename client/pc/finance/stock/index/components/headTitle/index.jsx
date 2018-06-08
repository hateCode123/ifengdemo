import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class HeadTitle extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        children: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, children } = this.props;
        const subTitle = content.slice(1);
        const subTitleList = [];

        subTitle.forEach((item, index) => {
            subTitleList.push(
                <a key={index} href={item.url} target="_blank" rel={rel}>
                    {item.title}
                </a>,
            );

            subTitleList.push(index === subTitle.length - 1 ? '' : '|');
        });

        return (
            <div className={`${styles.head_title} clearfix`}>
                <div className={styles.sub_title}>{subTitleList}</div>
                {children}
                <div className={styles.title}>
                    <a>{content[0].title}</a>
                </div>
            </div>
        );
    }
}

export default HeadTitle;
