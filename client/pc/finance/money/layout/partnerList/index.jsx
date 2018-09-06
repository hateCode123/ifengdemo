import React from 'react';
import style from './style.css';
import { rel } from '../../../../utils/rel';

class PartnerList extends React.PureComponent {
    render() {
        return (
            <ul className={style.list}>
                <li>
                    <a href="https://etrade.fengfd.com/" rel={rel} target="_blank">
                        <img src="http://p2.ifengimg.com/a/2017_08/21ed1708a700cae.png" width="168" height="78" />
                    </a>
                </li>
                <li>
                    <a href="http://www.howbuy.com/" rel={rel} target="_blank">
                        <img
                            src="http://y0.ifengimg.com/a/2014_22/f38665047b43592.jpg"
                            width="182"
                            height="78"
                            border="0"
                        />
                    </a>
                </li>
                <li>
                    <a href="http://www.ciccs.com.cn/" rel={rel} target="_blank">
                        <img src="http://y0.ifengimg.com/a/2014_24/5c3e6465352395e.jpg" width="182" height="78" />
                    </a>
                </li>
                <li>
                    <a href="http://caifu.baidu.com/?zt=18feng" rel={rel} target="_blank">
                        <img src="http://y1.ifengimg.com/a/2014_35/94eeb96954f1244.jpg" width="182" height="78" />
                    </a>
                </li>
                <li>
                    <a href="https://www.zhenrongbao.com/" rel={rel} target="_blank">
                        <img src="http://y0.ifengimg.com/a/2015_33/d0491cd3e2b16d0.jpg" width="182" height="78" />
                    </a>
                </li>
                <li>
                    <a href="http://www.licai.com/" rel={rel} target="_blank">
                        <img src="http://y0.ifengimg.com/a/2014_42/e59c96ce25d2357.jpg" width="182" height="78" />
                    </a>
                </li>
                <li>
                    <a href="http://18.ifeng.com/up/" rel={rel} target="_blank">
                        <img src="http://y0.ifengimg.com/a/2015_01/0c0ad65c3a51e2a.jpg" width="182" height="78" />
                    </a>
                </li>
                <li>
                    <a href="http://finance.ifeng.com/stock/special/fsz/" rel={rel} target="_blank">
                        <img src="http://y0.ifengimg.com/a/2015_52/52044b34ae4485d.png" width="182" height="78" />
                    </a>
                </li>
                <li>
                    <a href="http://www.wangdaizhijia.com/" rel={rel} target="_blank">
                        <img src="http://y0.ifengimg.com/a/2014_42/5190c2981ab2dda.jpg" width="182" height="78" />
                    </a>
                </li>
                <li>
                    <a
                        href="http://dol.deliver.ifeng.com/c?z=ifeng&amp;la=0&amp;si=2&amp;cg=1&amp;c=1&amp;ci=2&amp;or=8625&amp;l=32677&amp;bg=32676&amp;b=45381&amp;u=http://finance.ifeng.com/money/special/jdgjsmnds/index.shtml"
                        rel={rel}
                        target="_blank">
                        <img src="http://y0.ifengimg.com/a/2015_52/39160b04d1d7bfb.jpg" width="182" height="78" />
                    </a>
                </li>
            </ul>
        );
    }
}

export default PartnerList;
