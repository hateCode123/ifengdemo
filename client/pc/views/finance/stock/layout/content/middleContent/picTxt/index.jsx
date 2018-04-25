import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class PicTxt extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { picTxt } = content;

        return (
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
        );
    }
}

/**
 * 定义组件属性类型
 * */
PicTxt.propTypes = {
    content: PropTypes.object,
};

/**
 * 定义组件默认属性
 * */
PicTxt.defaultProps = {};

export { PicTxt };
export default PicTxt;
