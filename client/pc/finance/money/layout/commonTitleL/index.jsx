import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class CommonTitleL extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const { content } = this.props;
        // {"title":"境内掘金","more":[{"txt":"更多基金","url":"https://etrade.fengfd.com/","newOpen":true,"icon":true}]}
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
            <div className={style.title_03}>
                <div>{moreDom}</div>
                {content.title}
            </div>
        );
    }
}

export default errorBoundary(CommonTitleL);
