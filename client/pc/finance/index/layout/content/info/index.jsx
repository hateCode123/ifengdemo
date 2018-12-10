import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Ad from '@ifeng/ui_pc_ad';
import errorBoundary from '@ifeng/errorBoundary';
import Tabs from './tabs';
import TabPane from './tabPane';
import ContentList from './contentList';

class Info extends React.Component {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const {
            content: { infoTitle, infoAd, hardAd },
        } = this.props;

        return (
            <div className={styles.info}>
                <Tabs>
                    {infoTitle.map((item, index) => (
                        <TabPane key={index} tab={item.title}>
                            <ContentList index={index} dataKey={item.key} infoAd={infoAd} />
                        </TabPane>
                    ))}
                </Tabs>
                <Ad content={hardAd} styleName={styles.hardAd} />
            </div>
        );
    }
}

export default errorBoundary(Info);
