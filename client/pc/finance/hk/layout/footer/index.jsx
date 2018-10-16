import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import Ad from '../ad/';
import Footer from '../../../../components/footer';
import errorBoundary from '@ifeng/errorBoundary';

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
        const { ad_bottom } = content;

        const BottomAd = (
            <Chip id="30014" type="struct" title="底部通栏广告05" groupName="广告" content={ad_bottom} key="bottomAd">
                <Ad />
            </Chip>
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
