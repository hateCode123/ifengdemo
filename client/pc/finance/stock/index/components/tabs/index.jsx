import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Title from './title/';
import SubTitle from './subTitle/';
import Link from './link/';

class Tab extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { title, subTitle, newsLiveTabLink, current, handleTabsChange } = this.props;

        return (
            <div className={styles.tab}>
                {title ? (
                    <Chip
                        id={title.id}
                        type={title.type}
                        title={title.title}
                        groupName={title.groupName}
                        content={title.content}>
                        <Title current={current} handleTabsChange={handleTabsChange} />
                    </Chip>
                ) : (
                    ''
                )}
                {subTitle ? (
                    <Chip
                        id={subTitle.id}
                        type={subTitle.type}
                        title={subTitle.title}
                        groupName={subTitle.groupName}
                        content={subTitle.content}>
                        <SubTitle />
                    </Chip>
                ) : (
                    ''
                )}
                {newsLiveTabLink ? (
                    <Chip
                        id={newsLiveTabLink.id}
                        type={newsLiveTabLink.type}
                        title={newsLiveTabLink.title}
                        groupName={newsLiveTabLink.groupName}
                        content={newsLiveTabLink.content}>
                        <Link />
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
Tab.propTypes = {
    title: PropTypes.object,
    subTitle: PropTypes.object,
    newsLiveTabLink: PropTypes.object,
    current: PropTypes.number,
    handleTabsChange: PropTypes.func,
};

/**
 * 定义组件默认属性
 * */
Tab.defaultProps = {
    current: 0,
};

export { Tab };
export default Tab;