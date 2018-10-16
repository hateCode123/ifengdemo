import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import { formatImage, formatUrl } from '@ifeng/public_method';
import styles from './index.css';
import CloseImg from './close.gif';
import { rel } from '../../../../utils/rel';

class FixAd extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            adShow: true,
        };
    }

    closeFixAd = () => {
        this.setState({
            adShow: false,
        });
    };

    render() {
        const {
            content: { link, imgUrl, width, height, mode },
        } = this.props;

        const { adShow } = this.state;

        // 对图片长宽进行预处理，使用动态裁图
        const preProcess_width = Number(width.indexOf('px') ? width.slice(0, width.indexOf('px')) : '120');

        const preProcess_height = Number(width.indexOf('px') ? height.slice(0, height.indexOf('px')) : '300');

        return (
            <div
                className={`${styles.coupletBox} ${mode === 'left' ? styles.left : styles.right} ${
                    adShow ? styles.show : styles.close
                }`}>
                <img src={CloseImg} className={styles.closeImg} onClick={this.closeFixAd} />
                <a href={formatUrl(link)} target="_blank" rel={rel} className={styles.picA}>
                    <img
                        src={formatImage(imgUrl, preProcess_width, preProcess_height, 100)}
                        className={styles.adImg}
                        width={`${preProcess_width}px`}
                        height={`${preProcess_height}px`}
                    />
                </a>
            </div>
        );
    }
}

export default errorBoundary(FixAd);
