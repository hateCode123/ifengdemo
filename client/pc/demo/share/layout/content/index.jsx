import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Share from './share';
class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {};

    render() {
        const shareInfo = {
            url: 'https://feng.ifeng.com/c/7j0IEJyUsOM',
            picUrl:
                'https://d.ifengimg.com/w145_h80_q70/e0.ifengimg.com/11/2018/1228/41334D757F5A783FA8994DB818C5A9526915B376_size132_w1080_h662.jpeg',
            title: '无核化还没谈好，朝韩迫不及待联通半岛铁路线',
            summery: '',
        };

        return (
            <React.Fragment>
                <div className={styles.box}>
                    <Share shareInfo={shareInfo} />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
