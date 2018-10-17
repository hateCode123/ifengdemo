import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import Header from './header';
import Navigation from './navigation';
import Content from './content';
import BottomFooter from './footer';
import Cooperation from './cooperation';
import FixAd from './fixAd/';
import InIframe from './content/inIframe/';
import transform from 'chipDataTransform';
import errorBoundary from '@ifeng/errorBoundary';
import ToTop from '../../../components/toTop/';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;

        const headerData = {
            nav: content.nav,
            search: content.search,
            ad_top: content.ad_top,
            logo: content.logo,
        };

        const footerData = {
            ad_bottom: content.ad_bottom,
            footer: content.footer,
        };
        const cooperation = content.cooperation;

        const contentData = {
            mainBody_ad: {
                ad_content_02: content.ad_content_02,
                ad_content_04: content.ad_content_04,
            },
            mainTopData: {
                hk_toutiao: {
                    titleData: {
                        title: '港股头条',
                        url: '//finance.ifeng.com/shanklist/1-69-35248-',
                        withBG: false,
                    },
                    listData: {
                        recommend_list: {
                            recommendId: '55015',
                            recommendName: '港股头条首部三条推荐位',
                            recommendData: content.hk_tt_recommend,
                        },
                        widthoutR_list: content.hk_tt_withoutR,
                    },
                },
                hk_dxgl: {
                    titleData: {
                        title: '打新攻略',
                        url: '//finance.ifeng.com/shanklist/1-69-35250-',
                        withBG: true,
                    },
                    listData: content.hk_dzgl_singlePic,
                },
                hk_xgdp: {
                    titleData: {
                        title: '新股点评',
                        url: '//finance.ifeng.com/shanklist/1-69-35252-',
                        withBG: true,
                    },
                    listData: content.hk_xgdp,
                },
                hk_xgpj: {
                    titleData: {
                        title: '新股评级',
                        url: '//finance.ifeng.com/shanklist/1-69-35251-',
                        withBG: true,
                    },
                    listData: content.hk_xgpj,
                },
                hk_xgss: {
                    titleData: {
                        title: '新股上市',
                        url: '//hk.finance.ifeng.com/ipo.php ',
                        withBG: true,
                    },
                    listData: {
                        iframeFragmentId: '30017',
                        iframeName: '新股上市iframe',
                        iframeSet: content.xgss_Frame,
                    },
                },
                hk_rdzt: {
                    titleData: {
                        title: '热点专题',
                        url: '//finance.ifeng.com/shanklist/1-69-35256-',
                        withBG: true,
                    },
                    listData: content.hk_rdzt,
                },
                hk_ssgs: {
                    titleData: {
                        title: '上市公司',
                        url: '//finance.ifeng.com/shanklist/1-69-35255-',
                        withBG: true,
                    },
                    listData: content.hk_ssgs,
                },
                bannerData: content.banner_pic,
            },
            mainMiddleData: {
                ad_content_R_side_03: content.ad_content_R_side_03,
                hk_ggyw: {
                    titleData: {
                        title: '港股要闻',
                        url: '//finance.ifeng.com/shanklist/1-69-41-',
                        withBG: false,
                    },
                    listData: content.hk_ggyw,
                },
                hk_mgyw: {
                    titleData: {
                        title: '美股要闻',
                        url: '//finance.ifeng.com/shanklist/1-69-35259-',
                        withBG: false,
                    },
                    listData: content.hk_mgyw,
                },
                hk_zs: {
                    titleData: {
                        title: '指数',
                        url: '#',
                        withBG: true,
                        more: false,
                    },
                    listData: {
                        iframeFragmentId: '30018',
                        iframeName: '指数iframe',
                        iframeSet: content.zs_Frame,
                    },
                },
                hk_jgdt: {
                    titleData: {
                        title: '机构动态',
                        url: '//finance.ifeng.com/shanklist/1-69-35260-',
                        withBG: true,
                    },
                    listData: content.hk_jgdt,
                },
                hk_ggxt: {
                    titleData: {
                        title: '港股学堂',
                        url: '//finance.ifeng.com/shanklist/1-69-35253-',
                        withBG: true,
                    },
                    listData: content.hk_ggxt,
                },
                hk_mjyhs: {
                    titleData: {
                        title: '名家有话说',
                        url: '//finance.ifeng.com/shanklist/1-69-35258-',
                        withBG: true,
                    },
                    listData: content.hk_mjyhs,
                },
            },
            mainBottomData: {
                hk_lzzx: {
                    titleData: {
                        title: '轮证资讯',
                        url: '//finance.ifeng.com/shanklist/1-69-35249-',
                        withBG: false,
                    },
                    listData: content.hk_lzzx,
                },
                hk_xgsswl: {
                    listData: {
                        iframeFragmentId: '30019',
                        iframeName: '新股上市,涡轮涨幅排名，牛熊证涨幅排名iframe3',
                        iframeSet: content.xgsswl_Frame,
                    },
                },
                hk_ggwl: {
                    titleData: {
                        title: '港股涡轮',
                        url: '#',
                        withBG: true,
                        more: false,
                    },
                    listData: {
                        iframeFragmentId: '30020',
                        iframeName: '港股涡轮iframe',
                        iframeSet: content.ggwl_Frame,
                    },
                },
                hk_wdnszzjlrlc: {
                    titleData: {
                        title: '五大牛熊证资金流入流出',
                        url: '#',
                        withBG: true,
                        more: false,
                    },
                    listData: {
                        iframeFragmentId: '30021',
                        iframeName: '五大牛熊证资金流入流出iframe',
                        iframeSet: content.wdnxzzjlrlc_Frame,
                    },
                },
            },
        };

        const ad_couplet_left = {
            ...content.ad_couplet_left,
            mode: 'left',
        };

        const ad_couplet_right = {
            ...content.ad_couplet_right,
            mode: 'right',
        };

        return (
            <div className={styles.ip_col}>
                <Header content={headerData} />
                <Chip
                    id="30007"
                    type="struct"
                    title="财经导航"
                    groupName="导航栏"
                    position="relative"
                    content={content.navigation}>
                    <Navigation />
                </Chip>
                <Chip
                    id="30016"
                    type="struct"
                    title="头部通栏iframe2"
                    groupName="iframe引用"
                    content={content.topBannerFrame}>
                    <InIframe />
                </Chip>
                <Chip
                    id="30039"
                    type="struct"
                    title="对联广告左侧"
                    groupName="广告"
                    position="relative"
                    content={ad_couplet_left}>
                    <FixAd />
                </Chip>
                <Chip
                    id="30040"
                    type="struct"
                    title="对联广告右侧"
                    groupName="广告"
                    position="relative"
                    content={ad_couplet_right}>
                    <FixAd />
                </Chip>
                <Content content={contentData} />
                <Chip
                    id="10015"
                    type="static"
                    title="底部合作链接"
                    groupName="底部合作链接"
                    position="relative"
                    content={cooperation}>
                    <Cooperation />
                </Chip>
                <BottomFooter content={footerData} />
                <ToTop />
                <ChipEdit transform={transform} />
            </div>
        );
    }
}

export default errorBoundary(Layout);
