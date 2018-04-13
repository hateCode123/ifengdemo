import React from 'react';
import PropTypes from 'prop-types';
import List from '../../commons/picList/';
import AsidePannel from '../../commons/asidePannel/';

/**
 * 定义 WealthRecommend 组件
 */
class WealthRecommend extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <AsidePannel title="财富派">
                <List content={content} prefix="点击数" isVideo={false} />
            </AsidePannel>
        );
    }
}

/**
 * 定义组件属性类型
 * */
WealthRecommend.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
WealthRecommend.defaultProps = {};

export { WealthRecommend };
export default WealthRecommend;
