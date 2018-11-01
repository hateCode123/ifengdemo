import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../utils/rel';

class Caption extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div style={{ position: 'relative' }}>
                <div className={styles.caption}>
                    <h5>
                        <a href={content.captionUrl} target="_blank" rel={rel} title={content.title}>
                            {content.captionTitle}
                        </a>
                    </h5>
                </div>
                <div className={styles.picTxt}>
                    <div className={styles.box_pic}>
                        <a href={content.picTxtUrl} target="_blank" rel={rel} title={content.name}>
                            <img src={content.src} alt={content.name} />
                        </a>
                        <h5>
                            <a href={content.picTxtUrl} target="_blank" rel={rel} title={content.name}>
                                {content.name}
                            </a>
                            <span>{content.tag}</span>
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Caption);
