import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '@ifeng/errorBoundary';
import BoxTitle from '../boxTitle';

class Courier extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
        ad: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content, ad } = this.props;

        return (
            <div className={styles.courier}>
                <BoxTitle url="//finance.ifeng.com/zhuanti/" title="理财速递">
                    <Ad content={ad} styleName={styles.ad} />
                </BoxTitle>
                <div style={{ margin: '15px 0 0' }} dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }
}

export default errorBoundary(Courier);
