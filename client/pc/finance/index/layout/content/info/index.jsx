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
                    <TabPane tab={infoTitle[0]}>
                        <ContentList index={0} infoAd={infoAd} />
                    </TabPane>
                    <TabPane tab={infoTitle[1]}>
                        <ContentList index={1} infoAd={infoAd} />
                    </TabPane>
                    <TabPane tab={infoTitle[2]}>
                        <ContentList index={2} infoAd={infoAd} />
                    </TabPane>
                    <TabPane tab={infoTitle[3]}>
                        <ContentList index={3} infoAd={infoAd} />
                    </TabPane>
                    <TabPane tab={infoTitle[4]}>
                        <ContentList index={4} infoAd={infoAd} />
                    </TabPane>
                    <TabPane tab={infoTitle[5]}>
                        <ContentList index={5} infoAd={infoAd} />
                    </TabPane>
                </Tabs>
                <Ad content={hardAd} styleName={styles.hardAd} />
            </div>
        );
    }
}

export default errorBoundary(Info);
