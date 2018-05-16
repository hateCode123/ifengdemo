import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Nav from './nav/';
import SubNav from './subNav/';
import { rel } from '../../../../../utils/rel';

class Navigation extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.banner}>
                <Chip id="10038" type="static" title="股票导航" groupName="导航栏" content={content.nav}>
                    <Nav content={content.nav} />
                </Chip>
                <Chip id="10040" type="static" title="股票二级导航" groupName="导航栏" content={content.subNav}>
                    <SubNav content={content.subNav} />
                </Chip>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Navigation.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Navigation.defaultProps = {};

export { Navigation };
export default Navigation;
