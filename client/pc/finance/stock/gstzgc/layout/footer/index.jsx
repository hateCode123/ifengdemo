import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Ad from '@ifeng/ui_pc_ad';
import Footer from '../../../../../components/footer/';
import { Recommend } from '../recommend';

/**
 * 定义 Footer 组件
 */
class BottomFooter extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { cooperation, bottomAd } = content;

        const BottomCooperation = (
            <Chip
                key="10112"
                id="10112"
                type="static"
                title="底部合作"
                groupName="底部"
                translate="jsonParse"
                content={cooperation}>
                <Recommend />
            </Chip>
        );

        const BottomAd = (
            <div key="bottomAd" className={styles.ad}>
                <Ad content={bottomAd} styleName={styles.box} />
            </div>
        );
        const footer = (
            <div key="tzgcfooter" className={styles.footer}>
                <Footer content={content.copyright} />
            </div>
        );

        return [BottomCooperation, BottomAd, footer];
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
