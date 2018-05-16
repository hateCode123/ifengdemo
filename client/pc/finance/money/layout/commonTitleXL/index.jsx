import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../utils/rel';

class CommonTitleXL extends React.PureComponent {
    render() {
        const { content, config } = this.props;

        const moreDom = content.more.map((item, i) => {
            return item.newOpen ? (
                <a
                    className={item.icon ? style.moreIcon : style.more}
                    key={i}
                    href={item.url}
                    rel={rel}
                    target="_blank">
                    {item.txt}
                </a>
            ) : (
                <a className={item.icon ? style.moreIcon : style.more} key={i} href={item.url}>
                    {item.txt}
                </a>
            );
        });

        return (
            <div className={`${style.title_04} ${config.img}`}>
                <div>{moreDom}</div>
                {content.title}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CommonTitleXL.propTypes = { content: PropTypes.object, config: PropTypes.object };

/**
 * 定义组件默认属性
 * */
CommonTitleXL.defaultProps = {};
export { CommonTitleXL };
export default CommonTitleXL;
