import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';

import { rel } from '../../../../utils/rel';

class TopLinkTable extends React.PureComponent {
    render() {
        return (
            <div className={style.caption01}>
                <table width="240" border="0" className={style.rta_03}>
                    <tbody>
                        <tr>
                            <td>
                                <a
                                    target="_blank"
                                    rel={rel}
                                    href="http://finance.ifeng.com/stock/special/cjs/"
                                    className={style.sea_05}
                                    id="sea_05">
                                    <b>&nbsp;</b> <p>财急送</p>
                                </a>
                            </td>
                            <td>
                                <a
                                    target="_blank"
                                    rel={rel}
                                    href="https://www.fengjr.com/cn/act/201801-pc-xjb26.html"
                                    className={style.sea_06}
                                    id="sea_06">
                                    <b>&nbsp;</b> <p>凤凰活期理财</p>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a
                                    target="_blank"
                                    rel={rel}
                                    href="http://finance.ifeng.com/stock/special/fsz/"
                                    className={style.sea_08}
                                    id="sea_08">
                                    <b>&nbsp;</b> <p>神光投顾</p>
                                </a>
                            </td>
                            <td>
                                <a
                                    target="_blank"
                                    rel={rel}
                                    href="http://finance.ifeng.com/money/special/zjsmjpd/"
                                    className={style.sea_09}
                                    id="sea_09">
                                    <b>&nbsp;</b> <p>私募</p>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TopLinkTable;
