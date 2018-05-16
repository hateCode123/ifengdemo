import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';

import styles from './style.css';

class SubNavigationInner extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const navigation = content.map((item, index) => (
            <a key={index} href={item.url} target="_blank" rel="nofollow me noopener noreferrer" title={item.title}>
                {item.title}
            </a>
        ));

        return <div className={styles.p_banner}>{navigation}</div>;
    }
}

SubNavigationInner.propTypes = { content: PropTypes.array };

SubNavigationInner.defaultProps = {};

class SubNavigation extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <div className="w1000">
                <Chip id="10020" type="static" title="logo下小字导航" groupName="导航" content={content}>
                    <SubNavigationInner />
                </Chip>
            </div>
        );
    }
}
/**
 * 定义组件属性类型
 * */
SubNavigation.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
SubNavigation.defaultProps = {};

export { SubNavigation };
export default SubNavigation;
