import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '../../../../../../components/errorBoundary';

class ComicBook extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const data = {};

        if (content && content.list && content.list.length > 0) {
            const datas = content.list[0];

            data.url = datas.url;
            data.thumbnails =
                datas.thumbnails && JSON.parse(datas.thumbnails).image[0]
                    ? JSON.parse(datas.thumbnails).image[0].url
                    : '';
            data.title = datas.title;
            data.rank = '';
            data.date = datas.newsTime.split(' ')[0];
        } else {
            data.url = '';
            data.thumbnails = '';
            data.title = '';
            data.rank = '';
            data.date = '';
        }

        return (
            <div className={styles.box}>
                <div className={styles.picTxt}>
                    <div className={styles.pic}>
                        <a href={data.url} target="_blank" rel={rel} title="连环话">
                            <img src={data.thumbnails} alt="连环话" className={styles.trans} />
                            <span>连环话</span>
                        </a>
                    </div>
                    <h3>
                        <a href={data.url} target="_blank" rel={rel} title={data.title}>
                            {data.title}
                        </a>
                    </h3>
                    <div className={styles.txt}>
                        {data.rank}期
                        <span>{data.date}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(ComicBook);
