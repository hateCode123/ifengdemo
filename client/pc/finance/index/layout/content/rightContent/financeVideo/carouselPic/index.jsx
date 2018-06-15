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

        if (picData.thumbnails && JSON.parse(picData.thumbnails).image[0]) {
            picData.thumbnail = JSON.parse(picData.thumbnails).image[0].url;
        }

        const carouselPic = [
            <div key={picData.title} className={styles.bigPic}>
                <a href={picData.url} className={styles.pic_img} target="_blank" rel={rel}>
                    <img src={picData.thumbnail} width="300" height="170" className={styles.trans} />
                </a>
                <div className={styles.text} />
                <p className={styles.title}>
                    <a href={picData.url} target="_blank" rel={rel}>
                        {picData.title}
                    </a>
                </p>
            </div>,
        ];

        const dotList = content.map((item, index) => (
            <li key={index} className={index === currentPage ? styles.current : ''} />
        ));

        const dot = (
            <ul key="dot" className={styles.dotList}>
                {dotList}
            </ul>
        );

        return [carouselPic, dot];
    }
}

export default CarouselPic;
