import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Recommend from './recommend/';

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
            <div className={styles.navCon} >
                <div>
                    <Chip
                        id="10003" type="static" title="导航"
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
Navigation.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Navigation.defaultProps = {};

export { Navigation };
export default Navigation;
