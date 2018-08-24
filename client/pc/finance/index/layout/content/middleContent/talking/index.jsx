import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import TitleList from '../../../../components/titleList';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class Talking extends React.Component {
    static propTypes = {
        content: PropTypes.array,
    };

    render() {
        const { content } = this.props;

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
                            <a href={content[0].url} target="_blank" rel={rel} title={content[0].title}>
                                <img src={content[0].img} width="50" height="50" />
                            </a>
                            <h5>
                                <a href={content[0].url} target="_blank" rel={rel} title={content[0].name}>
                                    {content[0].name}
                                </a>
                            </h5>
                        </div>
                        <h3 className={styles.title}>
                            <a href={content[0].url} target="_blank" rel={rel} title={content[0].title}>
                                {content[0].title}
                            </a>
                        </h3>
                    </div>
                </div>
                <TitleList content={content.slice(1, 7)} />
            </React.Fragment>
        );
    }
}

export default errorBoundary(Talking);
