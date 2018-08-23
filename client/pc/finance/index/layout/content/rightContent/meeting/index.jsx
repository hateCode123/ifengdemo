import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '../../../../../../components/errorBoundary';
import dataProcessing from '../../../../../../components/dataProcessing';
import { handleAd } from '../../../../../../utils/utils';

class Meeting extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        ad: PropTypes.object,
    };

    ref = React.createRef();

    async componentDidMount() {
        const { ad } = this.props;

        const callbackFn = await handleAd(ad);

        callbackFn(this.ref.current, ad.data);
    }

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const pic = content[0];
        const list = content.slice(1, 7);

        return (
            <div>
                <div className={styles.pic_box}>
                    <a href={pic.url} target="_blank" rel={rel} title={pic.title} className={styles.pic}>
                        <img src={pic.banner} width="300" height="169" alt={pic.title} className={styles.trans} />
                    </a>
                </div>
                <ul className={styles.list} ref={this.ref}>
                    {list.map((item, index) => (
                        <li key={index}>
                            <a href={pic.url} target="_blank" rel={rel} title={item.title}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(Meeting));
