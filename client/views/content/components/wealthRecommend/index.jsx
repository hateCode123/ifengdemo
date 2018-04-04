import React from 'react';
import List from '../../commons/picList/index.jsx';
import AsidePannel from '../../commons/asidePannel/index.jsx';

class WealthRecommend extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <AsidePannel title="财富派">
                <List content={content} prefix="点击数" isVideo={false} />
            </AsidePannel>
        );
    }
}

export default WealthRecommend;
