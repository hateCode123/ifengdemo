import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';
class CommonTitleM extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const { content } = this.props;
        // {"title":"理财超市","url":"", "newOpen":true}

        return content.newOpen ? (
            <div className={style.title_02}>
                {content.url ? (
                    <a href={content.url} rel={rel} target="_blank">
                        {content.title}
                    </a>
                ) : (
                    <span>{content.title} </span>
                )}
            </div>
        ) : (
            <div className={style.title_02}>
                {content.url ? <a href={content.url}>{content.title}</a> : <span>{content.title} </span>}
            </div>
        );
    }
}

export default errorBoundary(CommonTitleM);
