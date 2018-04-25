import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Ad } from '../../../../../components/ad/';
import Footer from '../../../../../components/footer/';

/**
 * 定义 Footer 组件
 */
class BottomFooter extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { bottomAd } = content;

        const BottomAd = (
            <div key="bottomAd" className={styles.ad}>
                <Ad content={bottomAd} styleName={styles.box} />
            </div>
        );
        const footer = (
            <div key="footer" className={styles.footer}>
                <Footer content={content.footer} />
            </div>
        );

        return [BottomAd, footer];
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

export { BottomFooter };
export default BottomFooter;
