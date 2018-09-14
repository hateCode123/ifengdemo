import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Recommend from '../../compontents/recommend';
import Search from './search/';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 Navigation 组件
 */
class Navigation extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.navCon}>
                <div className={styles.nav}>
                    <Chip id="10003" type="static" title="导航" groupName="头部" content={content.content}>
                        <Recommend />
                    </Chip>
                    <Search />
                </div>
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

export default errorBoundary(Navigation);
