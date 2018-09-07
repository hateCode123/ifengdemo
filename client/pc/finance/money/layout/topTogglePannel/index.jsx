import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import styles from './style.css';
import '../../reset.css';

class Collapse extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

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

export default errorBoundary(Collapse);
