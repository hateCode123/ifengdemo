import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '../../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../../components/dataProcessing';
import Title from './title/';

class Headline extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.box} onMouseEnter={this.handleOver} onMouseLeave={this.handleOver}>
                <Title title={content[0]} text={content[1]} extra={content[2]} />
                <Title title={content[3]} text={content[4]} />
                <Title title={content[5]} text={content[6]} />
                <Title title={content[7]} text={content[8]} />
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(Headline));
