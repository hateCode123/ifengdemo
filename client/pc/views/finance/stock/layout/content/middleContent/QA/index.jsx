import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import { MidTitle } from '../../../../components/midTitle';

class Qa extends React.PureComponent {
    state = {
        current: 0,
    };

    handleMouseOver = index => {
        this.setState({ current: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current } = this.state;
        const { content, tabs } = this.props;
        const { title, url } = content;

        return (
            <div className={styles.qa}>
                <MidTitle title={title} url={url} />
                <div>
                    <ul className={`${styles.tabs} clearfix`}>
                        {tabs.map((item, index) => (
                            <li
                                key={index}
                                className={current === index ? styles.current : ''}
                                onMouseEnter={() => this.handleMouseOver(index)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <a href={tabs[current].url} target="_blank" rel={rel}>
                            <img className={styles.user} src={tabs[current].src} target="_blank" rel={rel} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Qa.propTypes = {
    content: PropTypes.object,
    tabs: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
Qa.defaultProps = {};

export { Qa };
export default Qa;
