import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';

class Production extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col_boxR}>
                {content.map((item, index) => (
                    <div key={index} className={styles.box}>
                        <h5>{item.title}</h5>
                        <div className={styles.line} />
                        <div className="clearfix">
                            <div className={styles[`box_L${index}`]}>
                                <a href={item.url0} target="_blank" rel={rel}>
                                    {item.name0}
                                </a>
                            </div>
                            <div className={styles[`box_R${index}`]}>
                                <a href={item.url1} target="_blank" rel={rel}>
                                    {item.name1}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Production.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
Production.defaultProps = {};

export { Production };
export default Production;
