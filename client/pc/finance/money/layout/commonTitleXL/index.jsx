import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class CommonTitleXL extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
        config: PropTypes.object,
    };
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

export default errorBoundary(CommonTitleXL);
