import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Recommend from './recommend/';

/**
 * 定义 wemoneyNav 组件
 */
class WemoneyNav extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.navCon} >
                <div>
                    <Chip
                        id={content.id} type="static" title={content.name}
                        groupName="文章" content={content.content}
                    >
                        <Recommend />
                    </Chip>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
WemoneyNav.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
WemoneyNav.defaultProps = {};

export { WemoneyNav };
export default WemoneyNav;
