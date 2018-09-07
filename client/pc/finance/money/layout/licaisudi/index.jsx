import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import CommonTitleM from '../commonTitleM/';
import { rel } from '../../../../utils/rel';
// import { relative } from 'path';
import errorBoundary from '@ifeng/errorBoundary';

class LicaisudiInner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const { content } = this.props;

        const first = content.first;
        const sec = content.second;
        const thr = content.third;

        return (
            <div>
                <div className="clearfix">
                    <div className={style.topSdcp}>
                        <h3>
                            <a href={first.url} target="_blank" rel={rel}>
                                {first.title}
                            </a>
                        </h3>
                        <p>
                            {first.txt}
                            <span>{first.perc}</span>
                        </p>
                        {/* <div className={style.gm}>
                            <a href="buyLink" target="_blank" rel={rel}>
                                {first.buyTxt}
                            </a>
                        </div> */}
                    </div>
                    <div className={style.secSdcp}>
                        <h3>
                            <a href={sec.url} target="_blank" rel={rel} />
                        </h3>
                        <p>
                            {sec.txt}
                            <span>{sec.perc}</span>
                        </p>
                        {/* <div className={style.gm}>
                            <a href={sec.url} target="_blank" rel={rel}>
                                {' '}
                                {sec.buyTxt}
                            </a>
                        </div> */}
                    </div>
                </div>
                <div className={style.sdcp_02}>
                    <div className="clearfix">
                        <h3>
                            <a href={thr.url} target="_blank" rel={rel} />
                            {thr.txt}
                            <span>{thr.perc}</span>
                        </h3>
                    </div>
                    <div className="clearfix">
                        <p>
                            <span>{thr.recTitle}</span>
                            {thr.recTxt}
                            {/* <a href={thr.buyLink} target="_blank" rel={rel} className={style.gm02}>
                                {' '}
                                {first.buyTxt}
                            </a> */}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

class Licaisudi extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const { content } = this.props;

        return (
            <div className={style.wrap}>
                <CommonTitleM content={content.title} />
                <LicaisudiInner content={content.content} />
            </div>
        );
    }
}

export default errorBoundary(Licaisudi);
