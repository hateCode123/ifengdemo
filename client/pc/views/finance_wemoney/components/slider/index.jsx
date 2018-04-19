import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Slider  from 'react-slick';

class SimpleSlider extends React.PureComponent {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:3000,
      speed:3000,
      appendDots: dots => (
        <div
          style={{
            backgroundColor: "#fc5522",
            borderRadius: "10px",
            padding: "10px"
          }}
        >
          <ul style={{ margin: "0px" }} className={styles.slickDots}> {dots} </ul>
        </div>
      ),
    };

    const content = this.props.content ;

    return (
    <div className={styles.unslider}>               
        <div className={styles.wrapCon + " "+ styles.unsliderFade}>
        <Slider {...settings}>
            {content.map((item,index) => (
                //styles.unslider-active
                <div key={index} className={styles.unsliderWrap}>
                    <a href={item.url} target="_blank">
                        <img src={item.poster}  className={styles.trans}/>
                    </a>
                    <div className={styles.bannerTitleCon}>
                        <a href={item.url} target="_blank">
                            <p><strong><span>{item.title}</span></strong></p>
                        </a>
                    </div>
                    <a href={item.url} target="_blank"></a>
                </div>
            ))}
        </Slider>
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