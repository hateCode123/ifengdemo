import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class RightSideTitle extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.title}>
                <h4>
                    <a href={content.url} target="_blank" rel={rel} title={content.title}>
                        {content.title}
                    </a>
                </h4>
                {content.more ? (
                    <div className={styles.more}>
                        <a href={content.more} target="_blank" rel={rel}>
                            更多
                        </a>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
RightSideTitle.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
RightSideTitle.defaultProps = {};

export { RightSideTitle };
export default RightSideTitle;
