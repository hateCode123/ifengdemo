import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import CommonTitleM from '../commonTitleM/';
import { rel } from '../../../../utils/rel';
// import { relative } from 'path';

class LicaisudiInner extends React.PureComponent {
    render() {
        //    {
        //        "first":{
        //            "url" : "https://etrade.fengfd.com/detail/180012",
        //            "title": "银华富裕主题混合",
        //            "txt": "近一年涨幅：",
        //            "perc": "53.95%",
        //            "buyLink": "https://etrade.fengfd.com/detail/180012",
        //            "buyTxt": "购买",
        //        },
        //        "second":{
        //         "url" : "https://etrade.fengfd.com/detail/001878/",
        //         "title": "嘉实沪港深精选股票",
        //         "txt": "近一年涨幅：",
        //         "perc": "47.46%",
        //         "buyLink": "https://etrade.fengfd.com/detail/210004",
        //         "buyTxt": "购买",
        //     },
        //     "third":{
        //         "url" : "https://etrade.fengfd.com/detail/217027/",
        //         "title": "招商央视财经50指数A",
        //         "txt": "近一年涨幅：",
        //         "perc": "47.84%",
        //         "recTitle":"推荐理由：",
        //         "recTxt":"中国“漂亮A50”崛起，长期价值投资的典范。"
        //         "buyLink": "https://etrade.fengfd.com/detail/217027/",
        //         "buyTxt": "购买",
        //     }
        //    }
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
                        <div className={style.gm}>
                            <a href="buyLink" target="_blank" rel={rel}>
                                {first.buyTxt}
                            </a>
                        </div>
                    </div>
                    <div className={style.secSdcp}>
                        <h3>
                            <a href={sec.url} target="_blank" rel={rel} />
                        </h3>
                        <p>
                            {sec.txt}
                            <span>{sec.perc}</span>
                        </p>
                        <div className={style.gm}>
                            <a href={sec.url} target="_blank" rel={rel}>
                                {' '}
                                {sec.buyTxt}
                            </a>
                        </div>
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
                            <a href={thr.buyLink} target="_blank" rel={rel} className={style.gm02}>
                                {' '}
                                {first.buyTxt}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
LicaisudiInner.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
LicaisudiInner.defaultProps = {};

class Licaisudi extends React.PureComponent {
    render() {
        const { content } = this.props;
        const titleChipConfig = content.titleChipConfig;
        const contentChipConfig = content.contentChipConfig;

        return (
            <div className={style.wrap}>
                <Chip id={titleChipConfig.id} type="static" title={titleChipConfig.name} groupName={titleChipConfig.group} content={content.title}>
                    <CommonTitleM />
                </Chip>
                <Chip id={contentChipConfig.id} type="static" title={contentChipConfig.name} groupName={contentChipConfig.group} content={content.content}>
                    <LicaisudiInner />
                </Chip>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Licaisudi.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Licaisudi.defaultProps = {};
export { Licaisudi };
export default Licaisudi;
