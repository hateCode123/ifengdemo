import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class Caption extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

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
                        <a href={content[0].titleUrl} target="_blank" rel={rel} title={content[0].title}>
                            {content[0].title}
                        </a>
                    </h3>
                    <p className={styles.abstract}>{content[0].abstract}</p>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Caption.propTypes = {
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
Caption.defaultProps = {};

export { Caption };
export default Caption;
