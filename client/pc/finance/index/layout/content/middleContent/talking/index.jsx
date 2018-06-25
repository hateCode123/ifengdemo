import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import TitleList from '../../../../components/titleList';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';

class Talking extends React.Component {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const { content } = this.props;
        let talkingData = [];

        if (content) {
            talkingData = content.list.slice(0, 7).map(item => ({
                id: item.id,
                url: item.url,
                title: item.title,
                name: item.wemediaEAccountName,
                tags: item.tags,
                img:
                    item.thumbnails && JSON.parse(item.thumbnails).image[0]
                        ? JSON.parse(item.thumbnails).image[0].url
                        : '',
            }));
        }

        return (
            <React.Fragment>
                <div className={styles.talking}>
                    <div className={styles.caption}>
                        <h5>
                            <a
                                href="//finance.ifeng.com/listpage/606/1/list.shtml"
                                target="_blank"
                                rel={rel}
                                title="大咖说">
                                大咖说
                            </a>
                        </h5>
                    </div>
                    <div className={styles.picTxt}>
                        <div className={styles.box_pic}>
                            <a href={talkingData[0].url} target="_blank" rel={rel} title={talkingData[0].title}>
                                <img src={talkingData[0].img} width="50" height="50" />
                            </a>
                            <h5>
                                <a href={talkingData[0].url} target="_blank" rel={rel} title={talkingData[0].name}>
                                    {talkingData[0].name}
                                </a>
                            </h5>
                        </div>
                        <h3 className={styles.title}>
                            <a href={talkingData[0].url} target="_blank" rel={rel} title={talkingData[0].title}>
                                {talkingData[0].title}
                            </a>
                        </h3>
                    </div>
                </div>
                <TitleList content={talkingData.slice(1, 7)} />
            </React.Fragment>
        );
    }
}

export default errorBoundary(dataProcessing(Talking));
