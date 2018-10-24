import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import TitleList from '../../../../components/titleList';
import { rel } from '../../../../../../utils/rel';
import errorBoundary from '@ifeng/errorBoundary';

class Stocks extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

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
                    </div>
                </div>
                <TitleList content={content} />
            </React.Fragment>
        );
    }
}

export default errorBoundary(Stocks);
