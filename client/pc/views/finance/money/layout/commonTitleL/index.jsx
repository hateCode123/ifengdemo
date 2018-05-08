import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';

class CommonTitleL extends React.PureComponent {
    render() {
        const { content } = this.props;
        // {"title":"境内掘金","more":[{"txt":"更多基金","url":"https://etrade.fengfd.com/","newOpen":true,"icon":true}]}
        const moreDom = (content.more).map((item, i) => {
            return item.newOpen ? (
                <a className={item.icon ? style.moreIcon : style.more} key={i} href={item.url} rel={rel} target="_blank">
                    {item.txt}
                </a>
            ) : (
                <a className={item.icon ? style.moreIcon : style.more} key={i} href={item.url}>
                    {item.txt}
                </a>
            );
        });


        return (
            <div className={style.title_03}>
                <div>{moreDom}</div>
                {content.title}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CommonTitleL.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
CommonTitleL.defaultProps = {};

// class CommonTitleL extends React.PureComponent {
//     render() {
//         const { content } = this.props;

//         return (
//             // <Chip id="10039" type="static" title="理财产品" groupName="首屏" content={content}>
//                 <CommonTitleL />
//             // </Chip>
//         );
//     }
// }

// /**
//  * 定义组件属性类型
//  * */
// CommonTitleL.propTypes = { content: PropTypes.object };

// /**
//  * 定义组件默认属性
//  * */
// CommonTitleL.defaultProps = {};
export { CommonTitleL };
export default CommonTitleL;
