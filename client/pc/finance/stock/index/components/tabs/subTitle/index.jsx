import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';

class SubTitle extends React.PureComponent {
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
            <div className={styles.sub_title}>
                {content.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" rel={rel}>
                        {item.title}
                    </a>
                ))}
            </div>
        );
    }
}

export default SubTitle;
