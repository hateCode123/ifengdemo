import React from 'react';
import List from '../../commons/picList/index.jsx';
import AsidePannel from '../../commons/asidePannel/index.jsx';

class VideoRecommend extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <AsidePannel title="视频">
                <List content={content} prefix="播放数" isVideo={true} />
            </AsidePannel>
        );
    }
}

export default VideoRecommend;
