import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Footer from '../../../../../components/footer/';
import Recommend from '../../components/recommend';
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

        return (
            <React.Fragment>
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
                <div key="bottomAd" className={styles.ad}>
                    <Chip id="15021" type="static" title="投资观察-硬广04" groupName="底部广告" content={hardAd04}>
                        <Recommend />
                    </Chip>
                </div>
                <div key="tzgcfooter" className={styles.footer}>
                    <Footer content={content.copyright} />
                </div>
            </React.Fragment>
        );
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
