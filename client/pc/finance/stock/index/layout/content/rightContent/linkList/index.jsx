import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../../utils/rel';

class LinkList extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.linkList}>
                <ul className="clearfix">
                    {content.map((item, index) => (
                        <li key={index}>
                            <a href={item.url} target="_blank" rel={rel}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
LinkList.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
LinkList.defaultProps = {};

export { LinkList };
export default LinkList;
