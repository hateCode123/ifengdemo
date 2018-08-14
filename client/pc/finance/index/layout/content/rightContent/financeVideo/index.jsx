import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Slides from '@ifeng/ui_pc_slides';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';
import { rel } from '../../../../../../utils/rel';
import { handleAd, handleUrl } from '../../../../../../utils/utils';

class FinanceVideo extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        content: this.props.content.financeVideo,
    };

    adIndex = 1;

    insert = (dom, index) => {
        const { content } = this.state;
        const ref = React.createRef();

        this.setState(
            {
                content: [
                    ...content.slice(0, index),
                    { type: 'ad', key: `ad_${this.adIndex++}`, ref },
                    ...content.slice(index),
                ],
            },
            () => {
                ref.current.appendChild(dom);
            },
        );
    };

    async componentDidMount() {
        const {
            content: { financeVideoAd },
        } = this.props;

        const callbackFn = await handleAd(financeVideoAd);

        callbackFn(financeVideoAd.data, this.insert);
    }

    sliderTmpl = item => {
        return item.type === 'ad' ? (
            <div ifeng_ui_pc_sliders-link="" ref={item.ref} />
        ) : (
            <div className={styles.bigPic}>
                <a href={handleUrl(item.url)} className={styles.pic_img} target="_blank" rel={rel}>
                    <img src={item.thumbnails} width="300" height="170" className={styles.trans} />
                </a>
                <div className={styles.text} />
                <p className={styles.title}>
                    <a href={handleUrl(item.url)} target="_blank" rel={rel}>
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
        const { content } = this.state;

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
                    <Slides content={content} config={config} />
                </div>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(FinanceVideo));
