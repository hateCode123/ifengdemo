import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '../../../../../../components/errorBoundary';

class ComicBook extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.box}>
                <div className={styles.picTxt}>
                    <div className={styles.pic}>
                        <a href={content.url} target="_blank" rel={rel} title="连环话">
                            <img src={content.thumbnails} alt="连环话" className={styles.trans} />
                            <span>连环话</span>
                        </a>
                    </div>
                    <h3>
                        <a href={content.url} target="_blank" rel={rel} title={content.title}>
                            {content.title}
                        </a>
                    </h3>
                    <div className={styles.txt}>
                        期
                        <span>{content.date}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(ComicBook);
