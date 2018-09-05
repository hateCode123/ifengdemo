import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Footer from '../../../../../components/footer/';
import { Recommend } from '../../components/recommend';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 Footer 组件
 */
class BottomFooter extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { cooperation, hardAd04 } = content;

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
                <Chip
                    id={content.id}
                    type="static"
                    title={content.name}
                    groupName="文章"
                    translate="jsonParse"
                    content={hardAd04.content}>
                    <Recommend />
                </Chip>
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

export default errorBoundary(BottomFooter);
