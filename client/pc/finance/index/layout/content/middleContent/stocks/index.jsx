import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import TitleList from '../../../../components/titleList';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';

class Stocks extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        let stockData = [];

        if (content) {
            stockData = content.list.slice(0, 6).map(item => ({
                id: item.id,
                url: item.url,
                title: item.title,
            }));
        }

        return (
            <React.Fragment>
                <div className={styles.stocks}>
                    <div className={styles.caption}>
                        <h5>
                            <a href="//ds.ifeng.com/" target="_blank" rel={rel} title="炒股大赛">
                                炒股大赛
                            </a>
                        </h5>
                    </div>
                    <div className={styles.picTxt}>
                        <div className={styles.box_pic}>
                            <a href="//ds.ifeng.com/" target="_blank" rel={rel} title="炒股大赛">
                                <span />
                            </a>
                            <h5>
                                <a href="//ds.ifeng.com/" target="_blank" rel={rel} title="炒股大赛">
                                    凤凰网炒股大赛
                                </a>
                            </h5>
                        </div>
                        <h3 className={styles.title}>
                            <a href={stockData[0].url} target="_blank" rel={rel} title={stockData[0].title}>
                                {stockData[0].title}
                            </a>
                        </h3>
                    </div>
                </div>
                <TitleList content={stockData.slice(1, 6)} />
            </React.Fragment>
        );
    }
}

export default errorBoundary(dataProcessing(Stocks));
