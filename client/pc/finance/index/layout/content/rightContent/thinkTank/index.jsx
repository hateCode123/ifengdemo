import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';
import { handleUrl } from '../../../../../../utils/utils';

class ThinkTank extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
        tip: PropTypes.string,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, tip } = this.props;

        return (
            <li className={styles.listitem}>
                <div className={styles.hot}>
                    <div className={styles.box}>
                        <div>
                            <a href={handleUrl(content.url)} target="_blank" rel={rel}>
                                <img src={content.thumbnails} width="300" height="169" />
                            </a>
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.mask} />
                            <div className={styles.details}>
                                <h3 className={styles.title}>
                                    <a href={handleUrl(content.url)} target="_blank" rel={rel}>
                                        {content.title}
                                    </a>
                                </h3>
                            </div>
                        </div>
                        <div className={styles.tip}>{tip}</div>
                    </div>
                </div>
            </li>
        );
    }
}

export default ThinkTank;
