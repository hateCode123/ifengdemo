import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';

import { rel } from '../../../../utils/rel';

class TopLinkTable extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <div className={style.caption01}>
                <table width="240" border="0" className={style.rta_03}>
                    <tbody>
                        <tr>
                            <td>
                                <a target="_blank" rel={rel} href="http://finance.ifeng.com/stock/special/cjs/" className={style.sea_05} id="sea_05">
                                    <b> </b> <p>财急送</p>
                                </a>
                            </td>
                            <td>
                                <a
                                    target="_blank" rel={rel} 
                                    href="https://www.fengjr.com/cn/act/201801-pc-xjb26.html"
                                    className={style.sea_06} id="sea_06">
                                    <b> </b> <p>凤凰活期理财</p>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a target="_blank" rel={rel}  href="http://finance.ifeng.com/stock/special/fsz/" className={style.sea_08} id="sea_08">
                                    <b> </b> <p>神光投顾</p>
                                </a>
                            </td>
                            <td>
                                <a target="_blank" rel={rel}  href="http://finance.ifeng.com/money/special/zjsmjpd/" className={style.sea_09} id="sea_09">
                                    <b> </b> <p>私募</p>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
TopLinkTable.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
TopLinkTable.defaultProps = {};
export { TopLinkTable };
export default TopLinkTable;
