import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../../utils/rel';

class CarouselPic extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content, currentPage } = this.props;
        const picData = content[currentPage];

        const carouselPic = [
            <div key={picData.title} className={styles.bigPic}>
                <a href={picData.url} className={styles.pic_img} target="_blank" rel={rel}>
                    <img src={picData.src} width="300" height="170" className={styles.trans} />
                </a>
                <div className={styles.text} />
                <p className={styles.title}>
                    <a href={picData.url} target="_blank" rel={rel}>
                        {picData.title}
                    </a>
                </p>
            </div>,
        ];
        const dotList = [];

        content.map((item, index) => {
            dotList.push(<li key={index} className={index === currentPage ? styles.current : ''} />);

            return dotList;
        });

        const dot = (
            <ul key="dot" className={styles.dotList}>
                {dotList}
            </ul>
        );

        return [carouselPic, dot];
    }
}

/**
 * 定义组件属性类型
 * */
CarouselPic.propTypes = {
    content: PropTypes.array,
    currentPage: PropTypes.number,
};

/**
 * 定义组件默认属性
 * */
CarouselPic.defaultProps = {};

export { CarouselPic };
export default CarouselPic;
