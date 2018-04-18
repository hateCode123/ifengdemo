import React from 'react';
import PropTypes from 'prop-types';
import List from '../../commons/picList/';
import AsidePannel from '../../commons/asidePannel/';

/**
 * 定义 VideoRecommend 组件
 */
class VideoRecommend extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <AsidePannel title="视频">
                <List content={content} prefix="播放数" isVideo={true} />
            </AsidePannel>
        );
    }
}

/**
 * 定义组件属性类型
 * */
VideoRecommend.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
VideoRecommend.defaultProps = {};

export { VideoRecommend };
export default VideoRecommend;
