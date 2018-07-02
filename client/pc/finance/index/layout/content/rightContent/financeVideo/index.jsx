import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Slides from '@ifeng/ui_pc_slides';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';
import { rel } from '../../../../../../utils/rel';

class FinanceVideo extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    sliderTmpl = item => {
        let src = item.thumbnails && item.thumbnails !== '' ? JSON.parse(item.thumbnails).image[0].url : '';

        return (
            <div className={styles.bigPic}>
                <a href={item.url} className={styles.pic_img} target="_blank" rel={rel}>
                    <img src={src} width="300" height="170" className={styles.trans} />
                </a>
                <div className={styles.text} />
                <p className={styles.title}>
                    <a href={item.url} target="_blank" rel={rel}>
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
            arrows: 'hover',
            autoplay: false,
            direction: 'forward',
            axis: 'horizonta',
            sliderTmpl: this.sliderTmpl,
            dotCurrentStyle: styles.current,
        };

        return (
            <div>
                <div className={styles.financeVideo}>
                    <Slides content={content.data.slice(0, 3)} config={config} />
                </div>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(FinanceVideo));
