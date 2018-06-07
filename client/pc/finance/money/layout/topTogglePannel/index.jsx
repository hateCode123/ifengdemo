import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';
import '../../reset.css';
import Collapse from '../collapse/';

class Collapse extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            // id="box_img"
            <div className={styles.box_fixed} style={`'height':'0','background-image': ${content.imgUrl}`}>
                <div className={styles.box_posr}>
                    <a href={content.url} target="_blank" />
                    {/* id="span_close" */}
                    <span className={styles.span_close} />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Collapse.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Collapse.defaultProps = {};

export { Collapse };
export default Collapse;
