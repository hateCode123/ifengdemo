import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

/**
 * 定义 NavMore 组件
 */
class NavMore extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const createList = () => (
            <ul className={ styles.more }>
                {content.map( ( item, index ) => (
                    <li key={ index }>
                        <a href={ item.url } target="_blank" rel="nofollow me noopener noreferrer">
                            {item.title}
                        </a>
                    </li>
                ) )}
            </ul>
        );
        
        return (
            <div className={ styles.morehNew }>
                <ul>
                    <li>
                        <a href="//www.ifeng.com/daohang/" target="_blank" rel="nofollow me noopener noreferrer">
                            更多
                        </a>
                        {createList()}
                    </li>
                </ul>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
NavMore.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
NavMore.defaultProps = {};

export { NavMore };
export default NavMore;
