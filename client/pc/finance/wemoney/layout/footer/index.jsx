import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Recommend from '../recommend/';
import errorBoundary from '@ifeng/errorBoundary';

// import Footer from '../../../../../components/footer/';

/**
 * 定义 Footer 组件
 */
class BottomFooter extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const footer = (
            <div key="tzgcfooter" className={styles.footer}>
                <Recommend content={content.copyright} />
            </div>
        );

        return [footer];
    }
}

/**
 * 定义组件属性类型
 * */
BottomFooter.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
BottomFooter.defaultProps = {};

export default errorBoundary(BottomFooter);
