import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import UserInfo from '@ifeng/ui_pc_userInfo';
import Search from '@ifeng/ui_pc_search';
import errorBoundary from '../../../../components/errorBoundary';
import { rel } from '../../../../utils/rel';

class Header extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    render() {
        const { content } = this.props;

        return (
            <div className={styles.header}>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        <span />
                    </div>
                    <div className={styles.nav}>
                        <a href="//www.ifeng.com/" target="_blank" rel={rel}>
                            凤凰网首页
                        </a>
                    </div>
                    <div className={styles.search}>
                        <Chip id="20005" type="struct" title="搜索" groupName="头部" content={content}>
                            <Search expand />
                        </Chip>
                    </div>
                    <div className={styles.user}>
                        <UserInfo iconShow option={['login']} />
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Header);
