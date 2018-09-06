import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Caption from '../../../../components/caption';
import TitleList from '../../../../components/titleList';
import errorBoundary from '@ifeng/errorBoundary';

class Finance extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array,
        content: PropTypes.array,
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, content } = this.props;

        return (
            <React.Fragment>
                <div className={styles.finance}>
                    <Chip id="20010" type="struct" title="财商教育标题栏" groupName="正文" content={data}>
                        <Caption title={content[0]} />
                    </Chip>
                </div>
                <Chip
                    id="20006"
                    type="recommend"
                    title="财商教育新闻列表"
                    groupName="正文"
                    content={content.slice(1, 5)}
                    translate="handleFinanceListPicData">
                    <TitleList />
                </Chip>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Finance);
