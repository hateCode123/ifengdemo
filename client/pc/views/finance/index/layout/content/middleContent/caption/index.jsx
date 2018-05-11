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
        const { caption, picTxt } = content;

        return (
            <div>
                <div className={styles.caption}>
                    <h5>
                        <a href={caption.url} target="_blank" rel={rel} title={caption.title}>
                            {caption.title}
                        </a>
                    </h5>
                </div>
                <div className={styles.picTxt}>
                    <div className={styles.box_pic}>
                        <a href={picTxt.url} target="_blank" rel={rel} title={picTxt.name}>
                            <img src={picTxt.src} alt={picTxt.name} />
                        </a>
                        <h5>
                            <a href={picTxt.url} target="_blank" rel={rel} title={picTxt.name}>
                                {picTxt.name}
                            </a>
                            <span>{picTxt.tag}</span>
                        </h5>
                    </div>
                    <h3 className={styles.title}>
                        <a href={picTxt.titleUrl} target="_blank" rel={rel} title={picTxt.title}>
                            {picTxt.title}
                        </a>
                    </h3>
                    <p className={styles.abstract}>{picTxt.abstract}</p>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Caption.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
Caption.defaultProps = {};

export { Caption };
export default Caption;
