import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import errorBoundary from '../../../../../components/errorBoundary';
import dataProcessing from '../../../../../components/dataProcessing';
import Title from './title/';
import SubTitle from './subTitle/';
import Link from './link/';

class Tab extends React.PureComponent {
    static propTypes = {
        title: PropTypes.object,
        subTitle: PropTypes.object,
        newsLiveTabLink: PropTypes.object,
        current: PropTypes.number,
        handleTabsChange: PropTypes.func,
    };

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
                        translate="jsonParse"
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
                        translate="jsonParse"
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
                        translate="jsonParse"
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

export default errorBoundary(dataProcessing(Tab));
