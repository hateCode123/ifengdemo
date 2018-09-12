import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import errorBoundary from '@ifeng/errorBoundary';
import List from './list';

class Headline extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        rights: PropTypes.string,
    };

    state = {
        data: this.props.content,
    };

    /**
     * 渲染组件
     */
    render() {
        const { data } = this.state;
        const { rights } = this.props;

        return (
            <div className={styles.box}>
                <div>
                    <Chip
                        id="20003"
                        type="recommend"
                        title="头条新闻"
                        groupName="正文"
                        content={data}
                        position="relative"
                        translate="handleHeadlinePicData">
                        <List />
                    </Chip>
                </div>
                <Chip
                    id="10018"
                    type="static"
                    title="财经客户权益"
                    groupName="正文"
                    position="relative"
                    content={rights}>
                    <div style={{ position: 'relative' }}>
                        <div dangerouslySetInnerHTML={{ __html: rights }} />
                    </div>
                </Chip>
            </div>
        );
    }
}

export default errorBoundary(Headline);
