import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class HotfundsTable extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        head: PropTypes.array,
    };

    render() {
        const { content, head } = this.props;
        // { txt: '', tdKey: '' },
        const thead = head.map((item, v) => {
            return <th key={v}>{item.txt}</th>;
        });

        const tbody = content.map((item, v) => {
            return (
                <tr key={v}>
                    {head.map((headItem, index) => {
                        if (headItem.tdKey) {
                            if (headItem.linkPrefix) {
                                // 有对应key && 带链接前缀地址  基金名称
                                return (
                                    <td key={index}>
                                        <a
                                            style={{ display: 'block' }}
                                            href={`${headItem.linkPrefix}${item.code || 0}/`}
                                            target="_blank"
                                            rel={rel}
                                            title={item.code || item.name || 0}>
                                            {item[headItem.tdKey]}
                                        </a>
                                    </td>
                                );
                            } else if (headItem.postfix) {
                                // 有对应key && 不带链接前缀地址  基金名称
                                return item[headItem.tdKey] && item[headItem.tdKey].indexOf('-') > -1 ? (
                                    <td key={index} className={style.glv}>
                                        {item[headItem.tdKey] || '--'}
                                        {item[headItem.tdKey] ? headItem.postfix : ''}
                                    </td>
                                ) : (
                                    <td key={index} className={style.color_red}>
                                        {item[headItem.tdKey] || '--'}
                                        {item[headItem.tdKey] ? headItem.postfix : ''}
                                    </td>
                                );
                            } else {
                                return headItem.tdKey === 'unitNet' ? (
                                    <td className={style.f14} key={index}>
                                        {item[headItem.tdKey]}
                                    </td>
                                ) : (
                                    <td key={index}>{item[headItem.tdKey]}</td>
                                );
                            }
                        } else {
                            // 操作 不对应数据key
                            return (
                                <td key={index}>
                                    <a href={`${headItem.linkPrefix}${item.code || 0}/`} target="_blank" rel={rel}>
                                        申购
                                    </a>
                                </td>
                            );
                        }
                    })}
                </tr>
            );
        });

        return (
            <div className={style.abo}>
                <table width="100%" border="0">
                    <colgroup>
                        <col width="110" align="left" />
                        <col width="100" />
                        {/* <col width="50" /> */}
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

export default errorBoundary(HotfundsTable);
