import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import TitleList from '../../../../components/titleList';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';
import { getwemediaEAccountImg } from '../../../../../../services/api';

class Talking extends React.Component {
    static propTypes = {
        content: PropTypes.array,
    };

    state = {
        data: {},
    };

    async componentDidMount() {
        try {
            const { content } = this.props;
            const wemediaEAccountId = content[0].wemediaEAccountId;

            const result = await getwemediaEAccountImg(wemediaEAccountId);

            this.setState({
                data: result,
            });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const { data } = this.state;
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
                                <img src={data.img} width="50" height="50" />
                            </a>
                            <h5>
                                <a href={content[0].url} target="_blank" rel={rel} title={data.weMediaName}>
                                    {data.weMediaName}
                                </a>
                                <span>{data.description}</span>
                            </h5>
                        </div>
                    </div>
                </div>
                <TitleList content={content} />
            </React.Fragment>
        );
    }
}

export default errorBoundary(Talking);
