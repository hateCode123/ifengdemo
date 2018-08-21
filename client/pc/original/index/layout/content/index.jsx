import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '../../../../components/errorBoundary';
import { rel } from '../../../../utils/rel';

class Content extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    render() {
        const { content } = this.props;

        return (
            <div className={styles.content}>
                <div className={styles.list}>
                    <ul className="clearfix">
                        {content.map((item, index) => (
                            <li key={index} style={{ marginRight: (index + 1) % 4 === 0 ? '0px' : '12px' }}>
                                <a href={item.url} target="_blank" rel={rel}>
                                    <p>
                                        <img src={item.thumbnails} className={styles.trans} />
                                    </p>
                                    <h1>{item.title}</h1>
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Content);
