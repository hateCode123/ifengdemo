import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';

/**
 * 定义 AdAside 组件
 */
class AdAside extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        //return <div className={ styles.box } data-adhook={ content }>{ content }</div>;
        return (
            <div>
            <Chip
                id="10004" type="static" title="wemoney右侧广告"
                groupName="文章" content={ content}
            >
            <ul>
                {content.map((item,index) => (
                    <li key={index}>
                        <a className={styles.evaluateCon} href={item.url}>
                            <img src={item.imgUrl} alt={item.title} />
                        </a>
                        <span>span是一个行内标签</span>
                    </li>
                ))}
            </ul>
            </Chip>
            </div>
        )
    }
}

/**
 * 定义组件属性类型
 * */
AdAside.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
AdAside.defaultProps = {};

export { AdAside };
export default AdAside;
