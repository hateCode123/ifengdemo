import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import TitleAd from './titleAd/';
import { rel } from '../../../../../../../utils/rel';

class BoxTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { url, title, titleAd } = this.props;

        return (
            <div className={styles.box_title}>
                <span className={styles.title}>
                    <a href={url} target="_blank" rel={rel} title={title}>
                        {title}
                    </a>
                </span>
                {titleAd ? (
                    <Chip
                        id={titleAd.id}
                        type={titleAd.type}
                        title={titleAd.title}
                        groupName={titleAd.groupName}
                        content={titleAd.content}>
                        <TitleAd />
                    </Chip>
                ) : (
                    ''
                )}
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
    titleAd: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
BoxTitle.defaultProps = {};

export { BoxTitle };
export default BoxTitle;
