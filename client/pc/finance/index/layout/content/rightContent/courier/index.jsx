import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import BoxTitle from '../boxTitle';
import { rel } from '../../../../../../utils/rel';
import { Ad } from '../../../../../../components/ad';

class Courier extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        ad: PropTypes.object,
    };

    state = {
        types: {
            指数型: 'risk',
            股票型: 'risk',
            混合型: 'warning',
        },
        current: 0,
        currentCol: '',
    };

    /**
     * 处理鼠标浮动
     */
    handleTabsOver = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ current: index });
    };

    handleListEnter = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ currentCol: index });
    };

    handleListLeave = e => {
        const index = Number(e.currentTarget.attributes['data-index'].value);

        this.setState({ currentCol: index });
    };

    /**
     * 渲染组件
     */
    render() {
        const { types, current, currentCol } = this.state;
        const { content, ad } = this.props;
        const tabs = [content[0].tab, content[4].tab];
        const content0 = content.slice(0, 4);
        const content1 = content.slice(4);

        const list0 = content0.map((item, index) => (
            <dd
                key={index}
                data-index={index}
                onMouseEnter={this.handleListEnter}
                onMouseLeave={this.handleListLeave}
                className={index === currentCol ? styles.over : styles.out}>
                <div className={styles.col}>
                    <span className={styles.income0}>{item.income}</span>
                    <span className={`${styles.type} ${styles[types[item.type]]}`}>{item.type}</span>
                    <a href={item.url} target="_blank" rel={rel}>
                        {item.name}
                    </a>
                </div>
                <p>
                    <span>推荐理由：</span>
                    {item.recommend}
                </p>
                <div className={styles.shop} hidden={index !== currentCol}>
                    <a href={item.url} target="_blank" rel={rel}>
                        <div className={styles.btn} />
                    </a>
                </div>
            </dd>
        ));

        const list1 = content1.map((item, index) => (
            <dd
                key={index}
                data-index={index}
                onMouseEnter={this.handleListEnter}
                onMouseLeave={this.handleListLeave}
                className={`${index === currentCol ? styles.over : styles.out} clearfix`}>
                <div className={styles.bar_L}>
                    <h6>
                        <a href={item.url} target="_blank" rel={rel}>
                            {item.name}
                        </a>
                    </h6>
                    <p>
                        <span>推荐理由：</span>
                        {item.recommend}
                    </p>
                </div>
                <div className={styles.bar_R}>
                    <span className={styles.tip}>累计收益超</span>
                    <span className={styles.income1}>{item.income}</span>
                    <a href={item.url} target="_blank" rel={rel}>
                        预约
                    </a>
                </div>
            </dd>
        ));

        return (
            <div className={styles.courier}>
                <BoxTitle url="//finance.ifeng.com/zhuanti/" title="理财速递">
                    <Ad content={ad} styleName={styles.ad} />
                </BoxTitle>
                <div className={styles.title}>
                    <ul className={`${styles.title_tabs} clearfix`}>
                        {tabs.map((item, index) => (
                            <li
                                key={index}
                                data-index={index}
                                className={index === current ? styles.current : ''}
                                onMouseEnter={this.handleTabsOver}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.content}>
                    <dl>
                        {current === 0 ? (
                            <dt className="clearfix">
                                <span className={styles.content_title}>类型　&nbsp;&nbsp;近一年收益</span>产品名称
                            </dt>
                        ) : (
                            <dt className="clearfix">产品名称</dt>
                        )}
                        {current === 0 ? list0 : list1}
                    </dl>
                </div>
            </div>
        );
    }
}

export default Courier;
