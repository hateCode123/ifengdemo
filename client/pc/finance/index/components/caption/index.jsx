import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../utils/rel';

class Caption extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        title: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, title } = this.props;

        return (
            <div>
                <div className={styles.caption}>
                    <h5>
                        <a href={content[0].captionUrl} target="_blank" rel={rel} title={content[0].title}>
                            {content[0].captionTitle}
                        </a>
                    </h5>
                </div>
                <div className={styles.picTxt}>
                    <div className={styles.box_pic}>
                        <a href={content[0].picTxtUrl} target="_blank" rel={rel} title={content[0].name}>
                            <img src={content[0].src} alt={content[0].name} />
                        </a>
                        <h5>
                            <a href={content[0].url} target="_blank" rel={rel} title={content[0].name}>
                                {content[0].name}
                            </a>
                            <span>{content[0].tag}</span>
                        </h5>
                    </div>
                    <h3 className={styles.title}>
                        <a href={title.titleUrl} target="_blank" rel={rel} title={title.title}>
                            {title.title}
                        </a>
                    </h3>
                </div>
            </div>
        );
    }
}

export default Caption;
