import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';

import CommonTitleM from './../commonTitleM/';
import { rel } from '../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';
class Market extends React.PureComponent {
    static propTypes = {
        title: PropTypes.object,
    };

    render() {
        const { title } = this.props;

        return (
            <div className="bor w300 fl">
                <CommonTitleM content={title} />

                <div>
                    <div className={style.lccs}>
                        <div className="clearfix">
                            <a
                                className={style.mfkh}
                                href="https://www.fengjr.com/cn/act/201801-pc-20jia10.html"
                                target="_blank"
                                rel={rel}>
                                免费开户<br />
                                <span>10秒快速开户</span>
                            </a>
                            <a className={style.ljdl} href="https://my.fengjr.com/loginifeng" target="_blank">
                                立即登录<br />
                                <span>申购费率四折</span>
                            </a>
                        </div>
                        <div className={style.ms} /> <div className={style.jjkf}>基金客服：400-076-1166</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Market);
