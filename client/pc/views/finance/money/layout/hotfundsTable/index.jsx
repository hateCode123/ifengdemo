import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';

class HotfundsTable extends React.PureComponent {
    render() {
        const { content, head } = this.props;
        // { txt: '简称', tdKey: 'name' },
        // { txt: '7日年化', tdKey: 'rateSevenDay' },
        // { txt: '操作', tdKey: false },
        const thead = head.map((item, v) => {
            return <th key={v}>{item.txt}</th>;
        });

        const tbody = content.map((item, v) => {
            return (
                <tr key={v}>
                    <td>
                        <a
                            style={{ display: 'block' }}
                            href={`//etrade.fengfd.com/detail/${item.code}/`}
                            target="_blank"
                            rel={rel}
                            title={item.code}>
                            {item[head[0].tdKey]}
                        </a>
                    </td>
                    <td className={`${style.color_red}  ${style.fl14}`}>{item[head[1].tdKey]}%</td>
                    <td>
                        <a href={`//etrade.fengfd.com/detail/${item.code}/`} target="_blank" rel={rel}>
                            申购
                        </a>
                    </td>
                </tr>
            );
        });

        return (
            <div className={style.abo}>
                <table width="100%" border="0">
                    <colgroup>
                        <col width="110" />
                        <col width="100" />
                        <col width="50" />
                    </colgroup>
                    <thead>
                        <tr>{thead}</tr>
                    </thead>
                    <tbody>{tbody}</tbody>
                </table>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
HotfundsTable.propTypes = { content: PropTypes.array, head: PropTypes.array };

/**
 * 定义组件默认属性
 * */
HotfundsTable.defaultProps = {};

export { HotfundsTable };
export default HotfundsTable;
