import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class TitleR extends React.PureComponent {
    render() {
        const { content } = this.props;
        const Img = this.props.liveImg ? <img src={this.props.liveImg} /> : '';

        return (
            <div className={styles.titleR}>
                <span>{content.titleR}</span>
                {Img}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
TitleR.propTypes = { content: PropTypes.object, liveImg: PropTypes.string };

/**
 * 定义组件默认属性
 * */
TitleR.defaultProps = {};

export default TitleR;
