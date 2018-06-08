import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class CarouselPic extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        currentPage: PropTypes.number,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, currentPage } = this.props;
        const picData = content[currentPage];
        let dotList = '';

        const carouselPic = [
            <div key={picData.id} className={styles.bigPic}>
                <a href={picData.url} className={styles.pic_img} target="_blank" rel={rel}>
                    <img src={picData.thumbnail} width="400" height="230" className={styles.trans} />
                </a>
                <div className={styles.text} />
                <p className={styles.title}>
                    <a href={picData.url} target="_blank" rel={rel}>
                        {picData.title}
                    </a>
                </p>
            </div>,
        ];
        if (content.length > 1) {
            dotList = content.map((item, index) => (
                <li key={index} className={index === currentPage ? styles.current : ''} />
            ));
        }

        const dot = (
            <ul key="dot" className={styles.dotList}>
                {dotList}
            </ul>
        );

        return [carouselPic, dot];
    }
}

export default CarouselPic;
