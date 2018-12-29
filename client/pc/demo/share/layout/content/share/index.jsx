import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import erWeima from './erwei.png';

import { getWeChatCode } from './services/api';

class Share extends React.PureComponent {
    static propTypes = {
        shareInfo: PropTypes.object,
    };

    static defaultProps = {
        shareInfo: {
            url: '',
            picUrl: '',
            title: '',
            summery: '',
        },
    };

    state = {
        isCardShow: false,
        wxQrCode: '',
    };

    changeCardShow() {
        const { isCardShow } = this.state;

        this.setState({
            isCardShow: !isCardShow,
        });
        this.getWeChatCode();
    }

    handleClick() {
        const { url, title, summery, picUrl } = this.props.shareInfo;

        // 微博分享
        window.open(
            `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
                title,
            )}${summery ? `&pic=${encodeURIComponent(summery)}` : ''}${
                picUrl ? `&pic=${encodeURIComponent(picUrl)}` : ''
            }`,
        );
    }

    getWeChatCode = async () => {
        const { url } = this.props.shareInfo;

        if (!this.wxQrCode) {
            const data = await getWeChatCode(url);

            this.setState({
                wxQrCode: data.qrcode_url,
            });
        }
    };

    render() {
        const { isCardShow, wxQrCode } = this.state;

        return (
            <React.Fragment>
                <div className={`${styles.share} clearfix`}>
                    <div className={styles.btn} onClick={this.changeCardShow.bind(this)}>
                        转发
                    </div>
                    <div className={styles.shareCard} style={{ display: isCardShow ? 'block' : 'none' }}>
                        <div className={styles.wb} onClick={this.handleClick.bind(this)}>
                            新浪微博
                        </div>
                        <div className={styles.wx}>
                            <span>微信扫一扫</span>
                            <img src={wxQrCode} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Share);
