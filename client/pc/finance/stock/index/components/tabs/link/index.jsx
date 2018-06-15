import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class Link extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    static defaultProps = {
        content: [],
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.link}>
                <a href={content[0].url} target="_blank" rel={rel}>
                    <span>{content[0].title}</span>
                </a>
            </div>
        );
    }
}

export default Link;
