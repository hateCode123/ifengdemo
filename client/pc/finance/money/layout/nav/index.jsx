import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';
import '../../reset.css';
import Chip from 'Chip';

class NavigationInner extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const navigation = content.map((item, index) => (
            <li key={index}>
                <a href={item.url} target="_blank" rel="nofollow me noopener noreferrer" title={item.title}>
                    {item.title}
                </a>
            </li>
        ));

        return (
            <div className={styles.col_banner}>
                <ul className="clearfix">{navigation}</ul>
            </div>
        );
    }
}

NavigationInner.propTypes = { content: PropTypes.array };

NavigationInner.defaultProps = {};

class Navigation extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <div className="g_col">
                <div className="w1000">
                    <Chip
                        id="10019"
                        type="static"
                        title="logo下导航"
                        groupName="导航"
                        translate="jsonParse"
                        content={content}>
                        <NavigationInner />
                    </Chip>
                </div>
            </div>
        );
    }
}
/**
 * 定义组件属性类型
 * */
Navigation.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Navigation.defaultProps = {};

export { Navigation };
export default Navigation;
