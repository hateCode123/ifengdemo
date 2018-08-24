import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '@ifeng/errorBoundary';
import Footer from '../../../../../components/footer/';

/**
 * 定义 Footer 组件
 */
class BottomFooter extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

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

export default errorBoundary(BottomFooter);
