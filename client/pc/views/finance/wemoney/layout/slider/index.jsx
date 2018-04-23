import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Slider from 'react-slick';

import slick from 'slick-carousel/slick/slick.css';
import slickTheme from 'slick-carousel/slick/slick-theme.css';
import { rel } from '../../../../../../utils/rel';

class SimpleSlider extends React.PureComponent {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            appendDots: dots => (
                <div
                    style={{
                        backgroundColor: '#fc5522',
                        borderRadius: '10px',
                        padding: '10px',
                    }}>
                    <ul style={{ margin: '0px' }} className={styles.slickDots}>
                        {' '}
                        {dots}{' '}
                    </ul>
                </div>
            ),
        };

        const content = this.props.content;

        return (
            <div>
                <div className={styles.wrapCon}>
                    <Chip id="10006" type="static" title="wemoney轮播" groupName="文章" content={content}>
                        <Slider {...settings}>
                            {content.map((item, index) => (
                                <div key={index}>
                                    <a href={item.url} target="_blank" rel={rel}>
                                        <img src={item.poster} />
                                    </a>
                                    <div className={styles.bannerTitleCon}>
                                        <a href={item.url} target="_blank" rel={rel}>
                                            <p>
                                                <strong>
                                                    <span>{item.title}</span>
                                                </strong>
                                            </p>
                                        </a>
                                    </div>
                                    <a href={item.url} target="_blank" rel={rel} />
                                </div>
                            ))}
                        </Slider>
                    </Chip>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
SimpleSlider.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
SimpleSlider.defaultProps = {};

export default SimpleSlider;
