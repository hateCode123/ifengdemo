import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class ComicBook extends React.PureComponent {
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
                            <img src={content.src} alt="连环话" className={styles.trans} />
                            <span>连环话</span>
                        </a>
                    </div>
                    <h3>
                        <a href={content.url} target="_blank" rel={rel} title={content.title}>
                            {content.title}
                        </a>
                    </h3>
                    <div className={styles.txt}>
                        {content.rank}
                        <span>{content.date}</span>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
ComicBook.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
ComicBook.defaultProps = {};

export { ComicBook };
export default ComicBook;
