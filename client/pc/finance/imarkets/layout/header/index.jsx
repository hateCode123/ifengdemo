import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Nav from '../../../../components/nav';
import UserInfo from '../../../../components/userInfo';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={ styles.nav_box }>
                <div className={ styles.main_nav }>
                    <Chip id="10108" type="static" title="导航" groupName="头部" content={ content.nav }>
                        <Nav limit={ 18 } />
                    </Chip>
                    <UserInfo />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Header.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Header.defaultProps = {};

export { Header };
export default Header;