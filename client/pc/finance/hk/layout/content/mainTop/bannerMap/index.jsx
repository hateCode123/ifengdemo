import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import styles from './index.css';
import Slides from '@ifeng/ui_pc_slides';
import { formatUrl, formatImage } from '@ifeng/public_method';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../../utils/rel';

class BannerMap extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    sliderTmpl = item => {
        return (
            <div className={styles.bigPic}>
                <a href={formatUrl(item.url)} className={styles.pic_img} target="_blank" rel={rel}>
                    <img src={formatImage(item.thumbnail)} width="570" height="260" className={styles.trans} />
                </a>
                <div className={styles.text} />
                <p className={styles.title}>
                    <a href={formatUrl(item.url)} target="_blank" rel={rel}>
                        {item.title}
                    </a>
                </p>
            </div>
        );
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        const config = {
            arrows: true,
            autoplay: true,
            autoplayInterval: 10000,
            direction: 'forward',
            axis: 'horizonta',
            sliderTmpl: this.sliderTmpl,
            dotCurrentStyle: styles.current,
        };

        return (
            <div>
                <div className={styles.bannerPic}>
                    <Chip
                        id="55014"
                        type="recommend"
                        title="轮播图推荐位"
                        groupName="推荐位"
                        position="relative"
                        content={content}>
                        <Slides config={config} />
                    </Chip>
                </div>
            </div>
        );
    }
}

export default errorBoundary(BannerMap);
