import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class PlayItem extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.playitem}>
                <ul>
                    <li>
                        <a href={content.url} target="_blank" rel={rel}>
                            {content.title}
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
PlayItem.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
PlayItem.defaultProps = {};

export { PlayItem };
export default PlayItem;
