import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';
import { rel } from '../../../../../../../utils/rel';
import { MidTitle } from '../../../../components/midTitle';

class Qa extends React.PureComponent {
    state = {
        qaers: {
            url: [],
            img: [],
        },
        alist: [],
        current: 0,
    };

    componentDidMount() {
        const { tabs } = this.props;
        const qaers = [];
        const alist = [];

        tabs.map((item, index) => {
            if (index < 3) {
                jsonp('http://app.finance.ifeng.com/gszb/user_ol.php', {
                    data: {
                        name: item.name,
                        type: item.type,
                    },
                }).then(data => {
                    qaers.push({
                        url: data[0].url,
                        img: data[0].image,
                    });

                    if (index === 2) {
                        this.setState({ qaers });
                    }
                });
            } else {
                qaers.push({
                    url: item.url,
                    img: item.src,
                });
            }

            jsonp('http://app.finance.ifeng.com/gszb/a_data.php', {
                data: {
                    name: item.name,
                    type: item.type ? item.type : '',
                    cb: 'getData(a_data)',
                },
                jsonpCallback: 'getData',
            }).then(data => {
                alist.push({ data });

                if (index === 3) {
                    this.setState({ alist });
                }
            });

            return alist;
        });
    }

    handleMouseOver = index => {
        this.setState({ current: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { current, qaers, alist } = this.state;
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
                        <a href={qaers.url.length > 0 ? qaers[current].url : ''} target="_blank" rel={rel}>
                            <img
                                className={styles.user}
                                src={qaers.img.length > 0 ? qaers[current].img : ''}
                                target="_blank"
                                rel={rel}
                            />
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
