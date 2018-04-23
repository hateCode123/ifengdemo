import React from 'react';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';

import '../reset.css';
import styles from './style.css';

import Navigation from './nav/';
class Layout extends React.PureComponent {
    /**
     * 渲染网页布局
     */

    render() {
        const { content } = this.props;

        console.log(content);
        
        return (
            <div>
                <div className={styles.navCon}>
                    <Navigation content={content.navigation} />
                </div>
                <ChipEdit />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Layout.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Layout.defaultProps = {};

export default Layout;
