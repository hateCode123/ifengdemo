import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '../../../../../components/errorBoundary';
import dataProcessing from '../../../../../components/dataProcessing';
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
                <Chip
                    id="10114"
                    type="static"
                    title="底部公用版权"
                    groupName="底部"
                    translate="jsonParse"
                    content={content.footer}>
                    <Footer />
                </Chip>
            </div>
        );

        return [BottomAd, footer];
    }
}

export default errorBoundary(dataProcessing(BottomFooter));
